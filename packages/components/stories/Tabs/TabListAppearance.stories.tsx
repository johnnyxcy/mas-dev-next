import * as React from "react";

import { makeStyles, shorthands } from "@fluentui/react-components";

import { Tab, TabList } from "@mas/components/Tabs";

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

export const Appearance = (): JSX.Element => {
    const styles = useStyles();

    const renderTabs = (): JSX.Element => {
        return (
            <>
                <Tab value="tab1">First Tab</Tab>
                <Tab value="tab2">Second Tab</Tab>
                <Tab value="tab3">Third Tab</Tab>
                <Tab value="tab4">Fourth Tab</Tab>
            </>
        );
    };

    return (
        <div className={styles.root}>
            <TabList defaultSelectedValue="tab2" appearance="transparent">
                {renderTabs()}
            </TabList>
            <TabList defaultSelectedValue="tab2" appearance="subtle">
                {renderTabs()}
            </TabList>
            <TabList defaultSelectedValue="tab3" appearance="card">
                {renderTabs()}
            </TabList>
        </div>
    );
};

Appearance.parameters = {
    docs: {
        description: {
            story: "A tab list can have a `transparent` or `subtle` appearance. The default is `transparent`.",
        },
    },
};
