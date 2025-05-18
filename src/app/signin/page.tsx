"use client";
import PublicPage from "../components/PublicPage";
import SignInCard from "./SignInCard";
import {Box, Container, Grid, Text, Paper, Stack, ThemeIcon, Title} from "@mantine/core";
import {IconShieldLock} from "@tabler/icons-react";

const SignInPage = () => {
    return (
        <PublicPage showSignIn={false}>
            <Container size="lg" h="100%">
                <Grid gutter={0} align="center">
                    <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
                        <Stack
                            maw={480}
                            mx="auto"
                            gap="xl"
                            p={{ base: 'md', md: 'xl' }}
                        >
                            <Stack gap={0}>
                                <Title
                                    order={1}
                                    size="h1"
                                    fw={800}
                                >
                                    Welcome back
                                </Title>
                                <Text size="lg" c="dimmed" mt="md">
                                    Sign in to continue managing your digital legacy
                                </Text>
                            </Stack>
                            <SignInCard autoFocus />
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 0, md: 6 }} order={{ base: 1, md: 2 }} visibleFrom="md">
                        <Stack h="100%" justify="center" align="center" pl="xl">
                            <Box
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '70%',
                                    borderRadius: 'var(--mantine-radius-lg)',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(45deg, var(--mantine-color-primary-5))',
                                        opacity: 0.9,
                                    }}
                                />
                                <Stack
                                    h="100%"
                                    justify="center"
                                    gap="xl"
                                    p="xl"
                                    style={{ position: 'relative' }}
                                >
                                    <Stack gap="md" maw={400}>
                                        <ThemeIcon
                                            size={56}
                                            radius="md"
                                            variant="light"
                                            color="white"
                                        >
                                            <IconShieldLock size={30} />
                                        </ThemeIcon>
                                        <Text size="xl" fw={700} c="white">
                                            Secure Digital Legacy Management
                                        </Text>
                                        <Text size="md" c="gray.0">
                                            Access and manage your digital presence securely.
                                            Your data is protected with industry-leading encryption.
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>
        </PublicPage>
    );
}

export default SignInPage;