"use client";
import React from 'react';
import {Box, Button, Group, Menu, Stack, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import {IconChevronDown, IconLanguage, IconLeaf2} from "@tabler/icons-react";
import SupportedLanguages from '@/translation/supportedLanguages.json';
import {useRouter} from "next/navigation";

interface PublicHeaderProps {
    showSignIn?: boolean;
    customActions?: React.ReactNode | React.ReactNode[];
}

const PublicHeader: React.FC<PublicHeaderProps> = ({showSignIn, customActions}) => {
    const router = useRouter();

    return (
        <Box
            py="sm"
            style={{
                background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid var(--mantine-color-gray-2)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            }}
        >
            <Group justify="space-between" px={20} h={50}>
                {/* Logo Section */}
                <UnstyledButton
                    onClick={() => router.push("/")}
                    style={{
                        transition: 'transform 150ms ease',
                        '&:hover': {
                            transform: 'translateY(-1px)'
                        }
                    }}
                >
                    <Group gap={8}>
                        <ThemeIcon
                            size={38}
                            radius="md"
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'lime', deg: 90 }}
                        >
                            <IconLeaf2 size={24} style={{ transform: 'rotate(-15deg)' }} />
                        </ThemeIcon>
                        <Stack gap={0}>
                            <Text size="lg" fw={700} style={{ letterSpacing: '-0.5px' }}>
                                Digital Remains
                            </Text>
                            <Text size="xs" c="dimmed" style={{ letterSpacing: '0.5px' }}>
                                DIGITAL LEGACY MANAGEMENT
                            </Text>
                        </Stack>
                    </Group>
                </UnstyledButton>

                {/* Navigation and Actions */}
                <Group gap="md">
                    <UnstyledButton
                        onClick={() => router.push("/about")}
                        styles={{
                            root: {
                                padding: '8px 12px',
                                borderRadius: 'var(--mantine-radius-md)',
                                color: 'var(--mantine-color-gray-7)',
                                '&:hover': {
                                    backgroundColor: 'var(--mantine-color-gray-1)',
                                    color: 'var(--mantine-color-primary-7)',
                                },
                            },
                        }}
                    >
                        <Text size="sm" fw={500}>About</Text>
                    </UnstyledButton>
                    <UnstyledButton
                        onClick={() => router.push("/support")}
                        styles={{
                            root: {
                                padding: '8px 12px',
                                borderRadius: 'var(--mantine-radius-md)',
                                color: 'var(--mantine-color-gray-7)',
                                '&:hover': {
                                    backgroundColor: 'var(--mantine-color-gray-1)',
                                    color: 'var(--mantine-color-primary-7)',
                                },
                            },
                        }}
                    >
                        <Text size="sm" fw={500}>Support</Text>
                    </UnstyledButton>
                    <UnstyledButton
                        onClick={() => router.push("/pricing")}
                        styles={{
                            root: {
                                padding: '8px 12px',
                                borderRadius: 'var(--mantine-radius-md)',
                                color: 'var(--mantine-color-gray-7)',
                                '&:hover': {
                                    backgroundColor: 'var(--mantine-color-gray-1)',
                                    color: 'var(--mantine-color-primary-7)',
                                },
                            },
                        }}
                    >
                        <Text size="sm" fw={500}>Pricing</Text>
                    </UnstyledButton>
                    {customActions ?? (
                        <>
                            {/* Language Selector */}
                            <Menu
                                position="bottom-end"
                                shadow="md"
                                width={125}
                                radius="md"
                            >
                                <Menu.Target>
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        leftSection={<IconLanguage size={20} />}
                                        rightSection={<IconChevronDown size={16} />}
                                        px="xs"
                                    >
                                        <Text size="sm">Language</Text>
                                    </Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {SupportedLanguages.map(language => (
                                        <Menu.Item
                                            key={language}
                                        >
                                            {language}
                                        </Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>

                            {/* Authentication Buttons */}
                            {showSignIn && (
                                <Group gap="xs">
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        radius="xl"
                                        onClick={() => router.push("/signup")}
                                        styles={{
                                            root: {
                                                '&:hover': {
                                                    backgroundColor: 'var(--mantine-color-gray-1)',
                                                },
                                            },
                                        }}
                                    >
                                        Sign up
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-primary-6)' }}
                                        radius="xl"
                                        onClick={() => router.push("/signin")}
                                        visibleFrom="md"
                                        styles={{
                                            root: {
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                                                    transition: 'all 0.2s ease',
                                                },
                                            },
                                        }}
                                    >
                                        Sign in
                                    </Button>
                                </Group>
                            )}
                        </>
                    )}
                </Group>
            </Group>
        </Box>
    );
}

export default PublicHeader;