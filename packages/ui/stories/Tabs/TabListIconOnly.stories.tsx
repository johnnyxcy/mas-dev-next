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

export const IconOnly = (): JSX.Element => {
    const styles = useStyles();

    const renderTabs = (): JSX.Element => {
        return (
            <>
                <Tab icon={<CalendarMonth />} value="tab1" aria-label="First Tab" />
                <Tab icon={<CalendarMonth />} value="tab2" aria-label="Second Tab" />
                <Tab icon={<CalendarMonth />} value="tab3" aria-label="Third Tab" />
                <Tab icon={<CalendarMonth />} value="tab4" aria-label="Fourth Tab" />
            </>
        );
    };

    return (
        <div className={styles.root}>
            <TabList defaultSelectedValue="tab2">{renderTabs()}</TabList>
            <TabList defaultSelectedValue="tab2" vertical>
                {renderTabs()}
            </TabList>
        </div>
    );
};

IconOnly.parameters = {
    docs: {
        description: {
            story: "Tabs can have an `icon` slot filled and no content..",
        },
    },
};
