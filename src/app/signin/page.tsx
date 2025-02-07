"use client";
import PublicPage from "../components/PublicPage";
import SignInCard from "./SignInCard";
import {Group, Stack, Title} from "@mantine/core";

const SignInPage = () => {
    return (
        <PublicPage showSignIn={false}>
            <Stack w="100vw" h="100%" align="center" justify="center">
                <Group visibleFrom="md" pb={50}>
                    <Title>Welcome back</Title>
                </Group>
                <Group maw='90vw' w={400}>
                    <SignInCard autoFocus />
                </Group>
            </Stack>
        </PublicPage>
    );
}

export default SignInPage;