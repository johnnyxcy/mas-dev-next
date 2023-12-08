/*
 * File: @mas/components/stories/Tabs/TabListHorizontal.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 11:51 pm
 *
 * Last Modified: 12/08/2023 05:24 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import * as React from "react";

import { makeStyles, shorthands, Tab, TabList } from "@fluentui/react-components";

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

export const Horizontal = (): JSX.Element => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <TabList defaultSelectedValue="tab2">
                <Tab value="tab1">First Tab</Tab>
                <Tab value="tab2">Second Tab</Tab>
                <Tab value="tab3">Third Tab</Tab>
                <Tab value="tab4">Fourth Tab</Tab>
            </TabList>
        </div>
    );
};

Horizontal.parameters = {
    docs: {
        description: {
            story: "The tabs within a tab list are arranged horzontally by default.",
        },
    },
};
