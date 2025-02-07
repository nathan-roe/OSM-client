import {ActionIcon, AppShell, Stack} from "@mantine/core";
import Footer from "@/app/Footer";
import React from "react";
import PublicHeader from "./PublicHeader";
import {useClickOutside, useDisclosure} from "@mantine/hooks";
import {IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand} from "@tabler/icons-react";
import PublicNavBar from "./PublicNavBar";

interface PublicPageProps {
    showSignIn?: boolean;
    customActions?: React.ReactNode | React.ReactNode[];
    children?: React.ReactNode | React.ReactNode[];
}

const PublicPage: React.FC<PublicPageProps> = ({showSignIn = true, customActions, children}) => {
    const [opened, {toggle, close}] = useDisclosure();
    const ref = useClickOutside(close);

    return (
        <AppShell
            header={{ height: '50px' }}
            navbar={{
                breakpoint: "sm",
                width: 300,
                collapsed: {
                    mobile: !opened,
                    desktop: !opened
                }
            }}
            styles={{
                main: {
                    paddingInlineStart: 0,
                    flex: 1
                }
            }}
        >
            <AppShell.Header>
                <PublicHeader showSignIn={showSignIn} customActions={customActions} />
            </AppShell.Header>
            <AppShell.Navbar ref={ref}>
                <PublicNavBar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Stack mih="fit-content" h="calc(100vh - 51px)" align="center" justify="space-between" gap={0}>
                    {showSignIn && (
                        <ActionIcon onClick={toggle} h="fit-content" style={{
                            cursor: "pointer",
                            position: 'fixed',
                            zIndex: 1000,
                            top: 65,
                            left: 5
                        }}>
                            {opened
                                ? <IconLayoutSidebarLeftCollapse />
                                : <IconLayoutSidebarLeftExpand />
                            }
                        </ActionIcon>
                    )}
                    {children}
                    <Footer />
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}

export default PublicPage;