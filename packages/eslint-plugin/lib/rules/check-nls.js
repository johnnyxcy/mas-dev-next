/*
 * File: eslint-plugin-mas/lib/rules/check-nls.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/27/2023 04:20 pm
 *
 * Last Modified: 12/08/2023 02:05 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

// @ts-check

const levenshtein = require("js-levenshtein");

const metadata = require("../../../i18n/src/common/nls.metadata.json");

const messages = new Set(
    Object.values(metadata.messages)
        .reduceRight((prev, curr) => prev.concat(curr), [])
        .map((e) => e.replace(/&&/g, "")),
);

function evaluateLocalize(/** @type {import('estree').CallExpression} */ node) {
    const callee = node.callee;
    if (
        "object" in callee &&
        "name" in callee.object &&
        "property" in callee &&
        "name" in callee.property &&
        callee.object.name === "nls"
    ) {
        if (callee.property.name === "localize") {
            const defaultTextNode = node.arguments[1]; // The default text node is the second argument for `nls.localize`
            if (defaultTextNode && defaultTextNode.type === "Literal" && typeof defaultTextNode.value === "string") {
                return {
                    value: defaultTextNode.value,
                    byDefault: false,
                };
            }
        } else if (callee.property.name === "localizeByDefault") {
            const defaultTextNode = node.arguments[0]; // The default text node is the first argument for ``nls.localizeByDefault`
            if (defaultTextNode && defaultTextNode.type === "Literal" && typeof defaultTextNode.value === "string") {
                return {
                    node: defaultTextNode,
                    value: defaultTextNode.value,
                    byDefault: true,
                };
            }
        }
    }
    return {};
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: "problem",
        fixable: "code",
        docs: {
            description: "Prevent incorrect use of 'nls.localize'.",
            recommended: true,
            url: "",
        },
        messages: "incorrect use of 'nls.localize'.",
        schema: {
            type: "array",
            items: [
                {
                    type: "object",
                    properties: {
                        importType: {
                            enum: ["default", "named"],
                        },
                    },
                    additionalProperties: false,
                },
            ],
            additionalItems: false,
        },
    },
    create: (context) => {
        return {
            ImportDeclaration: (node) => {
                const { source } = node;
                // Check if is `import xxx from "@mas/i18n"`;
                if (source.type === "Literal" && source.value === "@mas/i18n") {
                    // if not using default import, report error
                    /**
                     * @type {import('estree').ImportDeclaration["specifiers"]}
                     */
                    const specifiers = node.specifiers;

                    const importType = context.options.length > 0 ? context.options[0].importType : "default";

                    /**
                     *
                     * @param {import('eslint').Rule.RuleFixer} fixer
                     * @returns {import('eslint').Rule.Fix}
                     */
                    const fix = (fixer) => {
                        if (importType === "default") {
                            return fixer.replaceText(node, `import nls from "@mas/i18n";`);
                        } else {
                            return fixer.replaceText(node, `import { nls } from "@mas/i18n";`);
                        }
                    };

                    let isOk = true;
                    if (specifiers.length !== 1) {
                        isOk = false;
                    } else {
                        if (importType === "default") {
                            isOk =
                                specifiers[0].type === "ImportDefaultSpecifier" && specifiers[0].local.name === "nls";
                        } else {
                            isOk = specifiers[0].type === "ImportSpecifier" && specifiers[0].local.name === "nls";
                        }
                    }

                    if (!isOk) {
                        context.report({
                            node,
                            message: 'Incorrect import of "@mas/i18n". Always use `import nls from "@mas/i18n"`',
                            // fix
                            fix,
                        });
                    }
                }
            },
            CallExpression: (node) => {
                const callee = node.callee;
                if (callee.type === "Super") {
                    return;
                }
                const { value, byDefault, node: localizeNode } = evaluateLocalize(node);
                if (value !== undefined) {
                    if (byDefault && !messages.has(value) && localizeNode !== undefined) {
                        let lowestDistance = Number.MAX_VALUE;
                        let lowestMessage = "";
                        for (const message of messages) {
                            const distance = levenshtein(value, message);
                            if (distance < lowestDistance) {
                                lowestDistance = distance;
                                lowestMessage = message;
                            }
                        }
                        if (lowestMessage) {
                            context.report({
                                node: localizeNode,
                                message: `"${value}" is not a valid default value. Did you mean "${lowestMessage}"?`,
                                fix(fixer) {
                                    const updatedCall = `"${lowestMessage.replace(/'/g, "\\'")}"`;
                                    return fixer.replaceText(localizeNode, updatedCall);
                                },
                            });
                        } else {
                            context.report({
                                node: localizeNode,
                                message: `"${value}" is not a valid default value.`,
                            });
                        }
                    } else if (!byDefault && messages.has(value)) {
                        context.report({
                            node,
                            message: `"${value}" can be translated using the "nls.localizeByDefault" function.`,
                            fix(fixer) {
                                const code = context.getSourceCode();
                                const args = node.arguments.slice(1);
                                const argsCode = args.map((e) => code.getText(e)).join(", ");
                                const updatedCall = `nls.localizeByDefault(${argsCode})`;
                                return fixer.replaceText(node, updatedCall);
                            },
                        });
                    }
                }
            },
        };
    },
};
