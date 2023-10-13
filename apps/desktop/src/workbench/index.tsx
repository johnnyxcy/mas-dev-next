/*
 * File: @mas/desktop/src/workbench/index.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:29 pm
 *
 * Last Modified: 10/13/2023 08:42 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import ReactDOM from "react-dom/client";

import * as strings from "@mas/base/common/strings";

const App: React.FC = () => {
    return (
        <div>
            Hello World A
            <button
                onClick={async () => {
                    console.log(strings.charCount("Hello World A"));
                    console.info("Hello World B");
                }}
            >
                Click Me
            </button>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
