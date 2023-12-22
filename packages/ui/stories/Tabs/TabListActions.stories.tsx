import * as React from "react";

import { Add16Regular, Add16Filled, Dismiss16Filled, Dismiss16Regular, bundleIcon } from "@fluentui/react-icons";

import { Button, makeStyles, shorthands, Tab, TabList } from "@mas/ui";

const AddIcon = bundleIcon(Add16Filled, Add16Regular);
const DismissIcon = bundleIcon(Dismiss16Filled, Dismiss16Regular);

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

    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "20px",
    },
});

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

    const renderTabs = React.useCallback(() => {
        return tabValues.map(({ value, label }) => (
            <Tab key={value} value={value}>
                <div className={styles.tab}>
                    {label}
                    <Button
                        icon={<DismissIcon />}
                        className={styles.button}
                        appearance="transparent"
                        shape="circular"
                        onClick={(ev) => {
                            ev.stopPropagation();
                            setTabValues((v) => v.filter((tab) => tab.value !== value));
                        }}
                    />
                </div>
            </Tab>
        ));
    }, [styles.button, styles.tab, tabValues]);

    return (
        <div className={styles.root}>
            <TabList defaultSelectedValue="tab3" appearance="card">
                {renderTabs()}

                <div className={styles.action}>
                    <Button
                        icon={<AddIcon />}
                        className={styles.button}
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
