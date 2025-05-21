"use client";
import {AppShell, Box, Stack} from "@mantine/core";
import Footer from "@/app/components/Footer";
import React from "react";
import PublicHeader from "./PublicHeader";
import SupportChat from "@/app/components/SupportChat";

interface PublicPageProps {
    showSignIn?: boolean;
    customActions?: React.ReactNode | React.ReactNode[];
    children?: React.ReactNode | React.ReactNode[];
    customBackground?: React.ReactNode;
}

const PublicPage: React.FC<PublicPageProps> = ({
    showSignIn = true, 
    customActions, 
    children, 
    customBackground
}) => {

    return (
        <AppShell
            header={{ height: '50px' }}
            navbar={{
                breakpoint: "sm",
                width: 300,
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
            <AppShell.Main>
                <Stack mih="fit-content" h="calc(100vh - 51px)" align="center" justify="space-between" gap={0}>
                    {customBackground || ""}
                    <Box style={{zIndex: 1}}>
                        {children}
                        <SupportChat />
                        <Footer />
                    </Box>
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}

export default PublicPage;