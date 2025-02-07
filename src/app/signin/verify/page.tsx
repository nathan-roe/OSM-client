"use client";
import React from 'react';
import {Box, Button, Card, Divider, Group, PasswordInput, Stack, Text, Title} from "@mantine/core";
import {validatePassword} from "@/common/validationUtils";
import PublicPage from "@/app/components/PublicPage";
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface SignInAuthenticationCardProps {
}

const SignInAuthentication: React.FC<SignInAuthenticationCardProps> = ({}) => {
    const router = useRouter();
    const {login} = useAuth();
    const [validPassword, setValidPassword] = React.useState(true);
    const [password, setPassword] = React.useState("");

    const emailAddress = React.useMemo(() => {
        return sessionStorage.getItem("emailAddress") || "";
    }, []);

    const handleSubmit = React.useCallback(async () => {
        if(validatePassword(password)) {
            login({
                username: emailAddress,
                password
            }).then(() => {
                router.push("/dashboard")
            }).catch(console.error);
        } else {
            setValidPassword(false);
        }
    }, [password, emailAddress]);

    return (
        <PublicPage showSignIn={false}>
            <Stack h="100%" w="100vw" align="center" justify="center">
                <Title visibleFrom="md">Welcome back</Title>
                <Group maw="90vw" w={400} mt={25}>
                    <Card w="100%" radius="md" withBorder px={50}>
                        <Card.Section py={20} withBorder>
                            <Stack align="center">
                                <Text size="md">Choose how to sign in to</Text>
                                <Text size="sm" fw="bold">{emailAddress}</Text>
                                <Text size="sm">
                                    <Box c="blue" variant="link" component={Link} href="/signin">
                                        Use a different account
                                    </Box>
                                </Text>
                            </Stack>
                        </Card.Section>
                        <Card.Section pt={20} pb={40} withBorder>
                            <Stack align="center">
                                <form style={{
                                    width: '100%'
                                }} onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit().catch(console.error);
                                }}>
                                    <Text component="label" size="sm" htmlFor="password-input"></Text>
                                    <PasswordInput
                                        autoFocus
                                        id="password-input"
                                        w="100%"
                                        onChange={e => {
                                            const updatedPassword = e.target.value;
                                            setPassword(updatedPassword);
                                            if(validatePassword(updatedPassword) && !validPassword) {
                                                setValidPassword(true);
                                            }
                                        }}
                                        onBlur={() => {
                                            setValidPassword(validatePassword(password));
                                        }}
                                        error={!validPassword && "Password should include at least 6 characters"}

                                    />
                                    <Button mt={50} w="100%" type="submit">Continue</Button>
                                </form>
                                <Divider w="100%" label="OR" labelPosition="center" my="md"/>
                                <Button w="100%" variant="outline">Text a code to (***) ***-**00</Button>
                                <Text size="sm">
                                    <Box c="blue" variant="link" component={Link} href="/reset-password">
                                        Forgot password?
                                    </Box>
                                </Text>
                            </Stack>
                        </Card.Section>
                    </Card>
                </Group>
            </Stack>
        </PublicPage>
    );
}

export default SignInAuthentication;