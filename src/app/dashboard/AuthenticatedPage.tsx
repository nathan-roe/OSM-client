"use client";
import {AppShell, Stack} from "@mantine/core";
import React from "react";
import AuthenticatedHeader from "./AuthenticatedHeader";
import {useAuth, UserAuthenticationState} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import AuthenticatedNavBar from "@/app/dashboard/AuthenticatedNavBar";
import {UserCreationProgressProvider} from "@/context/UserCreationProgressContext";
import {PageLoadIndicatorProvider, PageOverlay, usePageLoadIndicator} from "@/context/LoadingContext";
import Footer from "@/app/components/Footer";
import {Background} from "@/app/components/Background";

interface AuthenticatedPageProps {
    children?: React.ReactNode | React.ReactNode[];
}

const AuthenticatedPage: React.FC<AuthenticatedPageProps> = (props) => {
    const router = useRouter();
    const {user} = useAuth();

    React.useEffect(() => {
        if(!user || user === UserAuthenticationState.FAILED) {
            router.push("/signin");
        }
    }, [user]);

    return (
        <UserCreationProgressProvider>
            <PageLoadIndicatorProvider>
                <AuthenticatedShell {...props} />
            </PageLoadIndicatorProvider>
        </UserCreationProgressProvider>
    );
}

const AuthenticatedShell: React.FC<AuthenticatedPageProps> = ({children}) => {
    const {user} = useAuth();
    const {overlay} = usePageLoadIndicator();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                breakpoint: "sm",
                width: {sm: 0, md: 250},
                collapsed: {
                    mobile: true,
                    desktop: false
                }
            }}
            footer={{
                height: 55
            }}
            styles={{
                main: {
                    paddingInlineStart: 0,
                    paddingBottom: 0
                }
            }}
        >
            <AppShell.Header>
                <AuthenticatedHeader />
            </AppShell.Header>
            <AppShell.Navbar>
                <AuthenticatedNavBar />
            </AppShell.Navbar>
            <AppShell.Main>
                {user === UserAuthenticationState.INITIALIZING
                    ? <PageOverlay /> : (
                    <Stack h="calc(100vh - 115px)" w="100vw" pos="relative" align="center" justify="space-between">
                        {overlay}
                        {children}
                    </Stack>
                )}
            </AppShell.Main>
            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
}

export default AuthenticatedPage;