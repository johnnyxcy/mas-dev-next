/*
 * File: @mas/desktop/src/workbench/index.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:29 pm
 *
 * Last Modified: 11/28/2023 05:31 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import ReactDOM from "react-dom/client";

import { getAllCodicons } from "@mas/base/common/codicons";

const App: React.FC = () => {
    console.log(getAllCodicons());
    return (
        <div>
            Hello World<button onClick={async (e) => {}}>Click Me Now!</button>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("maspectra-desktop-root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
