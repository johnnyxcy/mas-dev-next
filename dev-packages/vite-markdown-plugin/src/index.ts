/*
 * File: @mas/vite-markdown-plugin/src/index.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 05:48 pm
 *
 * Last Modified: 12/01/2023 06:57 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { Plugin } from "vite";

import { Element, Node as DomHandlerNode } from "domhandler";
import Frontmatter from "front-matter";
import { parseDOM, DomUtils } from "htmlparser2";
import MarkdownIt from "markdown-it";
import { TransformResult } from "rollup";

export enum Mode {
    TOC = "toc",
    HTML = "html",
    REACT = "react",
    VUE = "vue",
    MARKDOWN = "markdown",
}

export interface PluginOptions {
    mode?: Mode;
    markdown?: (body: string) => string;
    markdownIt?: MarkdownIt | MarkdownIt.Options;
}

const markdownCompiler = (options: PluginOptions): MarkdownIt | { render: (body: string) => string } => {
    if (options.markdownIt) {
        if (options.markdownIt instanceof MarkdownIt || options.markdownIt?.constructor?.name === "MarkdownIt") {
            return options.markdownIt as MarkdownIt;
        } else if (typeof options.markdownIt === "object") {
            return MarkdownIt(options.markdownIt);
        }
    } else if (options.markdown) {
        return { render: options.markdown };
    }
    return MarkdownIt({ html: true, xhtmlOut: options.mode?.includes(Mode.REACT) }); // TODO: xhtmlOut should be got rid of in next major update
};

class ExportedContent {
    #exports: string = "";
    #contextCode = "";

    setContextCode(contextCode: string): void {
        this.#contextCode += `${contextCode}\n`;
    }

    setExportVariable(exported: string): void {
        this.#exports = exported;
    }

    export(): string {
        return [this.#contextCode, `export default ${this.#exports}`].join("\n");
    }
}

const tf = (code: string, id: string, options: PluginOptions): TransformResult => {
    if (!id.endsWith(".md")) return null;

    const content = new ExportedContent();
    const fm = Frontmatter<unknown>(code);
    content.setContextCode(`const attributes = ${JSON.stringify(fm.attributes)}`);
    content.setExportVariable("attributes");

    const mode = options?.mode ?? Mode.MARKDOWN;

    const html = markdownCompiler(options).render(fm.body);

    switch (mode) {
        case Mode.HTML:
            content.setContextCode(`const html = ${JSON.stringify(html)}`);
            content.setExportVariable("html");
            break;
        case Mode.MARKDOWN:
            content.setContextCode(`const markdown = ${JSON.stringify(fm.body)}`);
            content.setExportVariable("markdown");
            break;
        case Mode.TOC: {
            const root = parseDOM(html);
            const indicies = root.filter(
                (rootSibling) =>
                    rootSibling instanceof Element &&
                    ["h1", "h2", "h3", "h4", "h5", "h6"].includes(rootSibling.tagName),
            ) as Element[];

            const toc: { level: string; content: string }[] = indicies.map((index) => ({
                level: index.tagName.replace("h", ""),
                content: DomUtils.getInnerHTML(index),
            }));

            content.setContextCode(`const toc = ${JSON.stringify(toc)}`);
            content.setExportVariable("toc");
            break;
        }
        case Mode.REACT: {
            const root = parseDOM(html, { lowerCaseTags: false });
            const subComponentNamespace = "SubReactComponent";

            const markCodeAsPre = (node: DomHandlerNode): void => {
                if (node instanceof Element) {
                    if (/^[A-Z].+/.test(node.tagName)) {
                        node.tagName = `${subComponentNamespace}.${node.tagName}`;
                    }
                    if (["pre", "code"].includes(node.tagName) && node.attribs?.class) {
                        node.attribs.className = node.attribs.class;
                        delete node.attribs.class;
                    }

                    if (node.tagName === "code") {
                        const codeContent = DomUtils.getInnerHTML(node, { decodeEntities: true });
                        node.attribs.dangerouslySetInnerHTML = `vfm{{ __html: \`${codeContent.replace(
                            /([\\`])/g,
                            "\\$1",
                        )}\`}}vfm`;
                        node.childNodes = [];
                    }

                    if (node.childNodes.length > 0) {
                        node.childNodes.forEach(markCodeAsPre);
                    }
                }
            };
            root.forEach(markCodeAsPre);

            const h = DomUtils.getOuterHTML(root, { selfClosingTags: true })
                .replace(/"vfm{{/g, "{{")
                .replace(/}}vfm"/g, "}}");

            const reactCode = `
      const markdown =
        <div>
          ${h}
        </div>
    `;
            const compiledReactCode = `
      function (props) {
        Object.keys(props).forEach(function (key) {
          SubReactComponent[key] = props[key]
        })
        ${require("@babel/core").transformSync(reactCode, { ast: false, presets: ["@babel/preset-react"] }).code}
        return markdown
      }
    `;
            content.setContextCode(
                `import React from "react"\nconst ${subComponentNamespace} = {}\nconst ReactComponent = ${compiledReactCode}`,
            );
            content.setExportVariable("ReactComponent");
            break;
        }
        case Mode.VUE: {
            const root = parseDOM(html);

            // Top-level <pre> tags become <pre v-pre>
            root.forEach((node: DomHandlerNode) => {
                if (node instanceof Element) {
                    if (["pre", "code"].includes(node.tagName)) {
                        node.attribs["v-pre"] = "true";
                    }
                }
            });

            // Any <code> tag becomes <code v-pre> excepting under `<pre>`
            const markCodeAsPre = (node: DomHandlerNode): void => {
                if (node instanceof Element) {
                    if (node.tagName === "code") node.attribs["v-pre"] = "true";
                    if (node.childNodes.length > 0) node.childNodes.forEach(markCodeAsPre);
                }
            };
            root.forEach(markCodeAsPre);

            const { code: compiledVueCode } = require("@vue/compiler-sfc").compileTemplate({
                source: DomUtils.getOuterHTML(root, { decodeEntities: true }),
                filename: id,
                id,
            });
            content.setContextCode(
                compiledVueCode.replace("\nexport function render(", "\nfunction vueRender(") +
                    `\nconst VueComponent = { render: vueRender }\nVueComponent.__hmrId = ${JSON.stringify(
                        id,
                    )}\nconst VueComponentWith = (components) => ({ components, render: vueRender })\n`,
            );
            content.setExportVariable("VueComponent");
            content.setExportVariable("VueComponentWith");
            break;
        }
        default:
            break;
    }

    return {
        code: content.export(),
    };
};

const plugin = (options: PluginOptions = {}): Plugin => {
    return {
        name: "vite-plugin-markdown",
        enforce: "pre",
        transform(code, id) {
            return tf(code, id, options);
        },
    };
};

export default plugin;
