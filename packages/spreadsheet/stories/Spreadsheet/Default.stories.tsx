/*
 * File: @mas/spreadsheet/stories/Spreadsheet/Default.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/15/2023 09:26 am
 *
 * Last Modified: 12/15/2023 10:11 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import * as React from "react";

import { makeStyles, shorthands } from "@fluentui/react-components";

import Spreadsheet from "@mas/spreadsheet/Spreadsheet";

const useStyles = makeStyles({
    root: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        ...shorthands.padding("50px", "20px"),
        rowGap: "20px",
    },
});

export const Default = (): JSX.Element => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Spreadsheet />
        </div>
    );
};

Default.parameters = {
    docs: {
        description: {
            story: "Simple spreadsheet demo.",
        },
    },
};
