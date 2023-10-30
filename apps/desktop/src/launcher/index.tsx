/*
 * File: @mas/desktop/src/launcher/index.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:29 pm
 *
 * Last Modified: 10/30/2023 04:53 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import ReactDOM from "react-dom/client";

const App: React.FC = () => {
    return <div>Hello From Maspectra Launcher</div>;
};

ReactDOM.createRoot(document.getElementById("maspectra-launcher-root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
