/*
 * File: eslint-plugin-mas/lib/rules/check-nls.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/27/2023 04:20 pm
 *
 * Last Modified: 10/27/2023 05:11 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

const levenshtein = require("js-levenshtein");

// eslint-disable-next-line node/no-unpublished-require
const metadata = require("../../../i18n/src/common/nls.metadata.json");

const messages = new Set(
    Object.values(metadata.messages)
        .reduceRight((prev, curr) => prev.concat(curr), [])
        .map((e) => e.replace(/&&/g, "")),
);

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: "problem",
        fixable: "code",
        docs: {
            description: "prevent incorrect use of 'nls.localize'.",
            recommended: true,
        },
        messages: "incorrect use of 'nls.localize'.",
        schema: [],
    },
    create(context) {
        return {
            CallExpression(node) {
                const callee = node.callee;
                if (callee.type === "Super") {
                    return;
                }
                const { value, byDefault, node: localizeNode } = evaluateLocalize(node);
                if (value !== undefined) {
                    if (byDefault && !messages.has(value)) {
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
                                message: `'${value}' is not a valid default value. Did you mean '${lowestMessage}'?`,
                                fix(fixer) {
                                    const updatedCall = `'${lowestMessage.replace(/'/g, "\\'")}'`;
                                    return fixer.replaceText(localizeNode, updatedCall);
                                },
                            });
                        } else {
                            context.report({
                                node: localizeNode,
                                message: `'${value}' is not a valid default value.`,
                            });
                        }
                    } else if (!byDefault && messages.has(value)) {
                        context.report({
                            node,
                            message: `'${value}' can be translated using the 'nls.localizeByDefault' function.`,
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
                    if (
                        defaultTextNode &&
                        defaultTextNode.type === "Literal" &&
                        typeof defaultTextNode.value === "string"
                    ) {
                        return {
                            value: defaultTextNode.value,
                            byDefault: false,
                        };
                    }
                } else if (callee.property.name === "localizeByDefault") {
                    const defaultTextNode = node.arguments[0]; // The default text node is the first argument for ``nls.localizeByDefault`
                    if (
                        defaultTextNode &&
                        defaultTextNode.type === "Literal" &&
                        typeof defaultTextNode.value === "string"
                    ) {
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
    },
};
