/*
 * File: @mas/base/src/browser/dom.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 01:54 pm
 *
 * Last Modified: 10/12/2023 03:44 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import * as event from "@mas/base/common/event";
import { IDisposable, combinedDisposable } from "@mas/base/common/lifecycle";

export enum Namespace {
    HTML = "http://www.w3.org/1999/xhtml",
    SVG = "http://www.w3.org/2000/svg",
}

const SELECTOR_REGEX = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;

function _$<T extends Element>(
    namespace: Namespace,
    description: string,
    attrs?: { [key: string]: any },
    ...children: Array<Node | string>
): T {
    const match = SELECTOR_REGEX.exec(description);

    if (!match) {
        throw new Error("Bad use of emmet");
    }

    const tagName = match[1] || "div";
    let result: T;

    if (namespace !== Namespace.HTML) {
        result = document.createElementNS(namespace as string, tagName) as T;
    } else {
        result = document.createElement(tagName) as unknown as T;
    }

    if (match[3]) {
        result.id = match[3];
    }
    if (match[4]) {
        result.className = match[4].replace(/\./g, " ").trim();
    }

    if (attrs) {
        Object.entries(attrs).forEach(([name, value]) => {
            if (typeof value === "undefined") {
                return;
            }

            if (/^on\w+$/.test(name)) {
                (<any>result)[name] = value;
            } else if (name === "selected") {
                if (value) {
                    result.setAttribute(name, "true");
                }
            } else {
                result.setAttribute(name, value);
            }
        });
    }

    result.append(...children);

    return result as T;
}

export function $<T extends HTMLElement>(
    description: string,
    attrs?: { [key: string]: any },
    ...children: Array<Node | string>
): T {
    return _$(Namespace.HTML, description, attrs, ...children);
}

$.SVG = function <T extends SVGElement>(
    description: string,
    attrs?: { [key: string]: any },
    ...children: Array<Node | string>
): T {
    return _$(Namespace.SVG, description, attrs, ...children);
};

/**
 * Convert a Unicode string to a string in which each 16-bit unit occupies only one byte
 *
 * From https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa
 */
function toBinary(str: string): string {
    const codeUnits = new Uint16Array(str.length);
    for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = str.charCodeAt(i);
    }
    let binary = "";
    const uint8array = new Uint8Array(codeUnits.buffer);
    for (let i = 0; i < uint8array.length; i++) {
        binary += String.fromCharCode(uint8array[i]);
    }
    return binary;
}

/**
 * Version of the global `btoa` function that handles multi-byte characters instead
 * of throwing an exception.
 */
export function multibyteAwareBtoa(str: string): string {
    return btoa(toBinary(str));
}

function camelCaseToHyphenCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

type HTMLElementAttributeKeys<T> = Partial<{
    [K in keyof T]: T[K] extends Function ? never : T[K] extends object ? HTMLElementAttributeKeys<T[K]> : T[K];
}>;
type ElementAttributes<T> = HTMLElementAttributeKeys<T> & Record<string, any>;
type RemoveHTMLElement<T> = T extends HTMLElement ? never : T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type ArrayToObj<T extends readonly any[]> = UnionToIntersection<RemoveHTMLElement<T[number]>>;
type HHTMLElementTagNameMap = HTMLElementTagNameMap & { "": HTMLDivElement };

type TagToElement<T> = T extends `${infer TStart}#${string}`
    ? TStart extends keyof HHTMLElementTagNameMap
        ? HHTMLElementTagNameMap[TStart]
        : HTMLElement
    : T extends `${infer TStart}.${string}`
    ? TStart extends keyof HHTMLElementTagNameMap
        ? HHTMLElementTagNameMap[TStart]
        : HTMLElement
    : T extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[T]
    : HTMLElement;

type TagToElementAndId<TTag> = TTag extends `${infer TTag}@${infer TId}`
    ? { element: TagToElement<TTag>; id: TId }
    : { element: TagToElement<TTag>; id: "root" };

type TagToRecord<TTag> = TagToElementAndId<TTag> extends { element: infer TElement; id: infer TId }
    ? Record<(TId extends string ? TId : never) | "root", TElement>
    : never;

type Child = HTMLElement | string | Record<string, HTMLElement>;

const H_REGEX = /(?<tag>[\w\-]+)?(?:#(?<id>[\w\-]+))?(?<class>(?:\.(?:[\w\-]+))*)(?:@(?<name>(?:[\w\_])+))?/;

/**
 * A helper function to create nested dom nodes.
 *
 *
 * ```ts
 * const elements = h('div.code-view', [
 * 	h('div.title@title'),
 * 	h('div.container', [
 * 		h('div.gutter@gutterDiv'),
 * 		h('div@editor'),
 * 	]),
 * ]);
 * const editor = createEditor(elements.editor);
 * ```
 */
export function h<TTag extends string>(
    tag: TTag,
): TagToRecord<TTag> extends infer Y ? { [TKey in keyof Y]: Y[TKey] } : never;
export function h<TTag extends string, T extends Child[]>(
    tag: TTag,
    children: [...T],
): ArrayToObj<T> & TagToRecord<TTag> extends infer Y ? { [TKey in keyof Y]: Y[TKey] } : never;
export function h<TTag extends string>(
    tag: TTag,
    attributes: Partial<ElementAttributes<TagToElement<TTag>>>,
): TagToRecord<TTag> extends infer Y ? { [TKey in keyof Y]: Y[TKey] } : never;
export function h<TTag extends string, T extends Child[]>(
    tag: TTag,
    attributes: Partial<ElementAttributes<TagToElement<TTag>>>,
    children: [...T],
): ArrayToObj<T> & TagToRecord<TTag> extends infer Y ? { [TKey in keyof Y]: Y[TKey] } : never;
export function h(
    tag: string,
    ...args:
        | []
        | [
              attributes: ({ $: string } & Partial<ElementAttributes<HTMLElement>>) | Record<string, any>,
              children?: any[],
          ]
        | [children: any[]]
): Record<string, HTMLElement> {
    let attributes: { $?: string } & Partial<ElementAttributes<HTMLElement>>;
    let children: (Record<string, HTMLElement> | HTMLElement)[] | undefined;

    if (Array.isArray(args[0])) {
        attributes = {};
        children = args[0];
    } else {
        attributes = (args[0] as any) || {};
        children = args[1];
    }

    const match = H_REGEX.exec(tag);

    if (!match || !match.groups) {
        throw new Error("Bad use of h");
    }

    const tagName = match.groups["tag"] || "div";
    const el = document.createElement(tagName);

    if (match.groups["id"]) {
        el.id = match.groups["id"];
    }

    const classNames = [];
    if (match.groups["class"]) {
        for (const className of match.groups["class"].split(".")) {
            if (className !== "") {
                classNames.push(className);
            }
        }
    }
    if (attributes.className !== undefined) {
        for (const className of attributes.className.split(".")) {
            if (className !== "") {
                classNames.push(className);
            }
        }
    }
    if (classNames.length > 0) {
        el.className = classNames.join(" ");
    }

    const result: Record<string, HTMLElement> = {};

    if (match.groups["name"]) {
        result[match.groups["name"]] = el;
    }

    if (children) {
        for (const c of children) {
            if (c instanceof HTMLElement) {
                el.appendChild(c);
            } else if (typeof c === "string") {
                el.append(c);
            } else if ("root" in c) {
                Object.assign(result, c);
                el.appendChild(c.root);
            }
        }
    }

    for (const [key, value] of Object.entries(attributes)) {
        if (key === "className") {
            continue;
        } else if (key === "style") {
            for (const [cssKey, cssValue] of Object.entries(value)) {
                el.style.setProperty(
                    camelCaseToHyphenCase(cssKey),
                    typeof cssValue === "number" ? cssValue + "px" : "" + cssValue,
                );
            }
        } else if (key === "tabIndex") {
            el.tabIndex = value;
        } else {
            el.setAttribute(camelCaseToHyphenCase(key), value.toString());
        }
    }

    result["root"] = el;

    return result;
}

interface IObserver extends IDisposable {
    readonly onDidChangeAttribute: event.Event<string>;
}

function observeAttributes(element: Element, filter?: string[]): IObserver {
    const onDidChangeAttribute = new event.Emitter<string>();

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "attributes" && mutation.attributeName) {
                onDidChangeAttribute.fire(mutation.attributeName);
            }
        }
    });

    observer.observe(element, {
        attributes: true,
        attributeFilter: filter,
    });

    return {
        onDidChangeAttribute: onDidChangeAttribute.event,
        dispose: () => {
            observer.disconnect();
            onDidChangeAttribute.dispose();
        },
    };
}

export function copyAttributes(from: Element, to: Element): void {
    for (const { name, value } of from.attributes) {
        to.setAttribute(name, value);
    }
}

function copyAttribute(from: Element, to: Element, name: string): void {
    const value = from.getAttribute(name);
    if (value) {
        to.setAttribute(name, value);
    } else {
        to.removeAttribute(name);
    }
}

export function trackAttributes(from: Element, to: Element, filter?: string[]): IDisposable {
    copyAttributes(from, to);

    const observer = observeAttributes(from, filter);

    return combinedDisposable(
        observer,
        observer.onDidChangeAttribute((name) => copyAttribute(from, to, name)),
    );
}
