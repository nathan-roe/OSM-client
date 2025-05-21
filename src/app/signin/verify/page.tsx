"use client";
import React from 'react';
import {Box, Button, Card, Divider, Group, Paper, PasswordInput, Stack, Text, Title} from "@mantine/core";
import {validatePassword} from "@/common/validationUtils";
import PublicPage from "@/app/components/PublicPage";
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";
import {useRouter} from "next/navigation";
import CircuitBackground from '@/app/components/CircuitBackground';

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
        <PublicPage showSignIn={false} customBackground={<CircuitBackground />}>
            <Stack h="100vh" justify="center" align="center" pt={{ base: 20, md: 0 }} pb={{ base: 40, md: 0 }}>
                <Box 
                    w={{ base: "90%", sm: 480 }}
                    style={(theme) => ({
                        position: 'relative',
                        zIndex: 1
                    })}
                >
                    <Title 
                        order={1} 
                        ta="center" 
                        mb={30} 
                        size="h2" 
                        fw={700} 
                        c="var(--mantine-color-primary-6)"
                        style={{ 
                            textShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                    >
                        Welcome Back
                    </Title>
                    
                    <Paper 
                        shadow="md" 
                        radius="lg"
                        p={0} 
                        withBorder 
                        style={(theme) => ({
                            overflow: 'hidden',
                            backdropFilter: 'blur(10px)',
                            background: 'rgba(255,255,255,0.8)',
                            borderColor: 'var(--mantine-color-gray-3)'
                        })}
                    >
                        <Box 
                            py={25} 
                            px={30} 
                            style={{ 
                                borderBottom: '1px solid var(--mantine-color-gray-3)',
                                background: 'linear-gradient(135deg, rgba(250,250,250,0.5), rgba(255,255,255,0.8))'
                            }}
                        >
                            <Stack align="center" gap="xs">
                                <Text size="md" fw={500} c="gray.8">Choose how to sign in to</Text>
                                <Text size="lg" fw={700} c="var(--mantine-color-primary-7)">{emailAddress}</Text>
                                <Text size="sm" mt={5}>
                                    <Box 
                                        c="var(--mantine-color-primary-5)" 
                                        variant="link" 
                                        component={Link} 
                                        href="/signin"
                                        style={{
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                            transition: 'color 0.2s ease',
                                            '&:hover': {
                                                color: 'var(--mantine-color-primary-7)'
                                            }
                                        }}
                                    >
                                        Use a different account
                                    </Box>
                                </Text>
                            </Stack>
                        </Box>
                        
                        <Box px={30} py={35}>
                            <Stack align="center" gap="lg">
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
                                    <Box c="var(--mantine-color-primary-5)" variant="link" component={Link} href="/reset-password">
                                        Forgot password?
                                    </Box>
                                </Text>
                            </Stack>
                        </Box>
                    </Paper>
                </Box>
            </Stack>
        </PublicPage>
    );
}

export default SignInAuthentication;