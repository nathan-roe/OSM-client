"use client";
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {
    Container,
    Title,
    Text,
    SimpleGrid,
    Paper,
    Stack,
    Group,
    ThemeIcon,
    Button,
    Box,
    Transition,
    rem,
} from '@mantine/core';
import { useRouter } from "next/navigation";
import {
    IconUserPlus,
    IconUser,
    IconArrowRight,
    IconShield,
    IconLock,
    IconCloudUpload,
    IconUserCheck,
    IconFiles,
} from '@tabler/icons-react';

const Dashboard = () => {
    const router = useRouter();

    return (
        <AuthenticatedPage>
            <Container size="xl" py={50}>
                <Stack gap="xl">
                    <Stack gap="xs" ta="center">
                        <Title
                            order={1}
                            size="h1"
                            fw={800}
                        >
                            Welcome to Digital Remains
                        </Title>
                        <Text c="dimmed" size="lg" maw={600} mx="auto">
                            Choose how you'd like to proceed with managing digital accounts
                        </Text>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" pt="xl">
                        {/* Self Management Option */}
                        <Paper
                            shadow="md"
                            radius="lg"
                            p="xl"
                            withBorder
                            style={{
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                                },
                            }}
                            onClick={() => router.push("/create-profile")}
                        >
                            <Stack gap="lg">
                                <Group>
                                    <ThemeIcon
                                        size={56}
                                        radius="md"
                                        variant="gradient"
                                        gradient={{ from: 'blue', to: 'cyan' }}
                                    >
                                        <IconUser size={30} />
                                    </ThemeIcon>
                                    <Stack gap={0}>
                                        <Text size="xl" fw={700}>Manage My Accounts</Text>
                                        <Text size="sm" c="dimmed">Plan ahead for your digital legacy</Text>
                                    </Stack>
                                </Group>

                                <SimpleGrid cols={2} spacing="md">
                                    {[
                                        { icon: IconShield, text: "Secure Storage" },
                                        { icon: IconLock, text: "Privacy Control" },
                                        { icon: IconFiles, text: "Document Management" },
                                        { icon: IconUserCheck, text: "Personal Control" },
                                    ].map((feature, index) => (
                                        <Group key={index} gap="xs">
                                            <ThemeIcon
                                                size="md"
                                                variant="light"
                                                color="blue"
                                                radius="xl"
                                            >
                                                <feature.icon size={rem(14)} />
                                            </ThemeIcon>
                                            <Text size="sm">{feature.text}</Text>
                                        </Group>
                                    ))}
                                </SimpleGrid>

                                <Button
                                    fullWidth
                                    variant="light"
                                    color="blue"
                                    size="lg"
                                    rightSection={<IconArrowRight size={18} />}
                                >
                                    Get Started
                                </Button>
                            </Stack>
                        </Paper>

                        {/* Manage Other's Account Option */}
                        <Paper
                            shadow="md"
                            radius="lg"
                            p="xl"
                            withBorder
                            style={{
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                                },
                            }}
                            onClick={() => router.push("/create-profile")}
                        >
                            <Stack gap="lg">
                                <Group>
                                    <ThemeIcon
                                        size={56}
                                        radius="md"
                                        variant="gradient"
                                        gradient={{ from: 'cyan', to: 'blue' }}
                                    >
                                        <IconUserPlus size={30} />
                                    </ThemeIcon>
                                    <Stack gap={0}>
                                        <Text size="xl" fw={700}>Manage Other's Accounts</Text>
                                        <Text size="sm" c="dimmed">Help manage a loved one's digital presence</Text>
                                    </Stack>
                                </Group>

                                <SimpleGrid cols={2} spacing="md">
                                    {[
                                        { icon: IconCloudUpload, text: "Easy Upload" },
                                        { icon: IconShield, text: "Secure Process" },
                                        { icon: IconFiles, text: "Document Support" },
                                        { icon: IconLock, text: "Privacy Protected" },
                                    ].map((feature, index) => (
                                        <Group key={index} gap="xs">
                                            <ThemeIcon
                                                size="md"
                                                variant="light"
                                                color="cyan"
                                                radius="xl"
                                            >
                                                <feature.icon size={rem(14)} />
                                            </ThemeIcon>
                                            <Text size="sm">{feature.text}</Text>
                                        </Group>
                                    ))}
                                </SimpleGrid>

                                <Button
                                    fullWidth
                                    variant="light"
                                    color="cyan"
                                    size="lg"
                                    rightSection={<IconArrowRight size={18} />}
                                >
                                    Start Process
                                </Button>
                            </Stack>
                        </Paper>
                    </SimpleGrid>

                    <Box
                        mt="xl"
                        p="xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--mantine-color-blue-0), var(--mantine-color-cyan-0))',
                            borderRadius: 'var(--mantine-radius-lg)',
                        }}
                    >
                        <Text c="dimmed" size="sm" ta="center">
                            Both options provide secure, step-by-step guidance through the process.
                            Your privacy and security are our top priorities.
                        </Text>
                    </Box>
                </Stack>
            </Container>
        </AuthenticatedPage>
    );
};

export default Dashboard;