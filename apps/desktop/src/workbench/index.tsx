/*
 * File: @mas/desktop/src/workbench/index.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:29 pm
 *
 * Last Modified: 11/30/2023 02:24 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import ReactDOM from "react-dom/client";

import { $ } from "@mas/base/browser/dom";
import { Codicon, getCodiconFontCharacters } from "@mas/base/common/codicons";
import { ThemeIcon } from "@mas/base/common/themables";

import "@mas/icons/codicons";

const App: React.FC = () => {
    React.useEffect(() => {
        const iconStyles = Object.entries(getCodiconFontCharacters()).map(
            ([key, value]) => `.codicon-${key}:before { content: "\\${value.toString(16)}" }`,
        );
        $("#codiconStyles")!.innerHTML = iconStyles.join("\n");
    });
    return (
        <div>
            Hello World
            <span className={ThemeIcon.asClassName(Codicon.account)} />
            <button onClick={async (e) => {}}>Click Me Now!</button>
        </div>
    );
};

ReactDOM.createRoot($("#maspectra-desktop-root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
