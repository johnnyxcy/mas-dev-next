/*
 * File: @mas/spreadsheet/src/Spreadsheet.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/15/2023 09:26 am
 *
 * Last Modified: 12/20/2023 10:19 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import { Input } from "@fluentui/react-components";

import { useId, useIsomorphicLayoutEffect } from "@fluentui/react-utilities";
import Hot from "handsontable";
import { createRoot } from "react-dom/client";

import "handsontable/dist/handsontable.min.css";

const Spreadsheet: React.FC = () => {
    const id = useId("spreadsheet");

    useIsomorphicLayoutEffect(() => {
        const el = document.querySelector(`#${id}`);
        if (!el) {
            return;
        }

        const hot = new Hot(el, {
            data: Hot.helper.createSpreadsheetData(1000, 100),
            rowHeaders: true,
            colHeaders: true,
            filters: true,
            dropdownMenu: true,
            licenseKey: "non-commercial-and-evaluation",
            afterGetColHeader: (col, TH) => {
                if (TH.querySelector("input")) {
                    return;
                }

                const inputRoot = document.createElement("div");
                inputRoot.role = "presentation";
                createRoot(inputRoot).render(
                    <Input
                        placeholder="123"
                        defaultValue={`Column#${col}`}
                        size="small"
                        onChange={(e) => {
                            // console.log(e);
                        }}
                    />,
                );

                if (TH.firstChild) {
                    TH.replaceChildren(inputRoot);
                }
            },
        });
        return () => {
            hot.destroy();
        };
    }, [id]);

    return (
        <div>
            <Input placeholder="123" />

            <div id={id} />
        </div>
    );
};

export default Spreadsheet;
