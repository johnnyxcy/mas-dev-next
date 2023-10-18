/*
 * File: @mas/desktop/src/workbench/index.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:29 pm
 *
 * Last Modified: 10/17/2023 05:54 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import ReactDOM from "react-dom/client";

const App: React.FC = () => {
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
