import * as React from "react";

import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from "@fluentui/react-icons";

import { makeStyles, shorthands, Tab, TabList } from "@mas/ui";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

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

export const SizeMedium = (): JSX.Element => {
    const styles = useStyles();

    const renderTabs = (): JSX.Element => {
        return (
            <>
                <Tab value="tab1">First Tab</Tab>
                <Tab icon={<CalendarMonth />} value="tab2">
                    Second Tab
                </Tab>
                <Tab value="tab3">Third Tab</Tab>
                <Tab value="tab4">Fourth Tab</Tab>
            </>
        );
    };

    return (
        <div className={styles.root}>
            <TabList defaultSelectedValue="tab2" size="medium">
                {renderTabs()}
            </TabList>
            <TabList defaultSelectedValue="tab2" size="medium" vertical>
                {renderTabs()}
            </TabList>
        </div>
    );
};

SizeMedium.parameters = {
    docs: {
        description: {
            story: "A tab list can have `medium` tabs (default).",
        },
    },
};
