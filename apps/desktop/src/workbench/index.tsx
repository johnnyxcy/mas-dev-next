/*
 * File: @mas/desktop/src/workbench/index.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:29 pm
 *
 * Last Modified: 12/21/2023 06:14 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import ReactDOM from "react-dom/client";

import nls from "@mas/i18n";

import { createStyleSheet } from "@mas/base/browser/dom";
import { mainWindow } from "@mas/base/browser/window";
import { Codicon, getCodiconFontCharacters } from "@mas/base/common/codicons";
import { DisposableStore } from "@mas/base/common/lifecycle";
import { ThemeIcon } from "@mas/base/common/themables";

import { Tab, TabList, FluentProvider } from "@mas/ui";

import "@mas/icons/codicons";

const App: React.FC = () => {
    React.useEffect(() => {
        const iconStyles = Object.entries(getCodiconFontCharacters()).map(
            ([key, value]) => `.codicon-${key}:before { content: "\\${value.toString(16)}" }`,
        );
        const disposable = new DisposableStore();
        createStyleSheet(
            mainWindow.document.head,
            (el) => {
                el.className = "codiconStyles";
                el.innerHTML = iconStyles.join("\n");
            },
            disposable,
        );
        return () => {
            disposable.dispose();
        };
    }, []);
    return (
        <div>
            {nls.localize("helloWord", "Hello World")}
            <span className={ThemeIcon.asClassName(Codicon.account)} />
            <button onClick={async (e) => {}}>{nls.localize("clicky", "Clicky")}</button>
            <TabList appearance="card">
                <Tab value="123">123</Tab>
            </TabList>
        </div>
    );
};

ReactDOM.createRoot(mainWindow.document.querySelector<HTMLDivElement>("#maspectra-desktop-root")!).render(
    <React.StrictMode>
        <FluentProvider>
            <App />
        </FluentProvider>
    </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
