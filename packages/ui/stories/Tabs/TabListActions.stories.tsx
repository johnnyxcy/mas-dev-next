import * as React from "react";

import {
    Add16Regular,
    Add16Filled,
    Dismiss12Regular,
    CalendarMonthFilled,
    CalendarMonthRegular,
    bundleIcon,
} from "@fluentui/react-icons";

import {
    Button,
    makeStyles,
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    shorthands,
    Tab,
    TabList,
    tokens,
} from "@mas/ui";

const AddIcon = bundleIcon(Add16Filled, Add16Regular);
const DismissIcon = Dismiss12Regular;
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

    tab: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },

    action: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    dismissButton: {
        "height": "20px",
        "width": "20px",
        "minWidth": "20px",
        "maxWidth": "20px",
        ...shorthands.padding(0),
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground2Hover,
        },
    },

    menuPopover: {
        zIndex: 3,
    },
});

type TabWithActionProps = {
    label: string;
    value: number;
    onClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onDismiss?: (
        ev: React.MouseEvent<HTMLElement, MouseEvent>,
        target: "current" | "all" | "others" | "left-all" | "right-all",
    ) => void;
};

const TabWithAction: React.FC<TabWithActionProps> = ({ label, value, onClick = undefined, onDismiss = undefined }) => {
    const styles = useStyles();
    return (
        <Menu openOnContext inline>
            <MenuTrigger>
                <Tab
                    value={value}
                    icon={<CalendarMonth />}
                    iconAfter={
                        <Button
                            as="a"
                            icon={<DismissIcon />}
                            className={styles.dismissButton}
                            appearance="subtle"
                            shape="circular"
                            onClick={(ev) => {
                                onDismiss?.(ev, "current");
                            }}
                        />
                    }
                    onClick={onClick}
                >
                    {label}
                </Tab>
            </MenuTrigger>
            <MenuPopover className={styles.menuPopover}>
                <MenuList>
                    <MenuItem
                        onClick={(ev) => {
                            onDismiss?.(ev, "current");
                        }}
                    >
                        Close
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            onDismiss?.(ev, "others");
                        }}
                    >
                        Close Others
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            onDismiss?.(ev, "all");
                        }}
                    >
                        Close All
                    </MenuItem>
                </MenuList>
            </MenuPopover>
        </Menu>
    );
};

export const Actions = (): JSX.Element => {
    const styles = useStyles();

    const [tabValues, setTabValues] = React.useState([
        {
            value: 1,
            label: "Tab1",
        },
        {
            value: 2,
            label: "Tab2",
        },
        {
            value: 3,
            label: "Tab3",
        },
    ]);

    const [selectedValue, setSelectedValue] = React.useState(2);

    const renderTabs = React.useCallback(() => {
        return tabValues.map(({ value, label }, index) => (
            <TabWithAction
                key={value}
                value={value}
                label={label}
                onDismiss={(ev, target) => {
                    ev.stopPropagation();
                    if (target === "current") {
                        setTabValues((v) => v.filter((t) => t.value !== value));
                    } else if (target === "all") {
                        setTabValues([]);
                    } else if (target === "others") {
                        setTabValues((v) => v.filter((t) => t.value === value));
                    }
                }}
            />
        ));
    }, [tabValues]);

    return (
        <div className={styles.root}>
            <TabList
                selectedValue={selectedValue}
                appearance="card"
                onTabSelect={(_, data) => setSelectedValue(data.value as number)}
            >
                {renderTabs()}

                <div className={styles.action}>
                    <Button
                        icon={<AddIcon />}
                        appearance="transparent"
                        shape="circular"
                        onClick={() => {
                            setTabValues((v) =>
                                v.length > 0
                                    ? [
                                          ...v,
                                          {
                                              label: `Tab${v[v.length - 1].value + 1}`,
                                              value: v[v.length - 1].value + 1,
                                          },
                                      ]
                                    : [
                                          {
                                              label: "Tab1",
                                              value: 1,
                                          },
                                      ],
                            );
                        }}
                    />
                </div>
            </TabList>
        </div>
    );
};

Actions.parameters = {
    docs: {
        description: {
            story: "Append 'add-tab' and 'remove-tab' actions to the tab list.",
        },
    },
};
