import * as React from "react";

import { makeStyles, shorthands, Tab, TabList, TabListProps } from "@mas/ui";

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

export const Default = (props: Partial<TabListProps>): JSX.Element => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <TabList {...props}>
                <Tab value="tab1">First Tab</Tab>
                <Tab value="tab2">Second Tab</Tab>
                <Tab value="tab3">Third Tab</Tab>
                <Tab value="tab4">Fourth Tab</Tab>
            </TabList>
        </div>
    );
};
