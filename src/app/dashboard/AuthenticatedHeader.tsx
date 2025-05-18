"use client";
import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Group,
    Menu,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    UnstyledButton
} from "@mantine/core";
import {IconChevronDown, IconHelp, IconLeaf2,
    IconLogout, IconMessageCircle, IconSettings,
    IconUserCircle, IconUserFilled} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";


interface AuthenticatedHeaderProps {

}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = () => {
    const router = useRouter();
    const {logout} = useAuth();

    return (
        <Paper
            px="md"
            withBorder
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: 60,
                zIndex: 1000,
                background: 'linear-gradient(to right, var(--mantine-color-body), var(--mantine-color-gray-0))',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
            }}

        >
            <Container size="xl" h="100%">
                <Group h="100%" justify="space-between">
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

                    <Group>
                        <Button
                            variant="subtle"
                            leftSection={<IconHelp size={16} />}
                            size="sm"
                        >
                            Help Center
                        </Button>

                        <Menu
                            position="bottom-end"
                            offset={4}
                            shadow="md"
                            width={200}
                        >
                            <Menu.Target>
                                <UnstyledButton>
                                    <Group gap="xs">
                                        <Avatar
                                            radius="xl"
                                            size="md"
                                            variant="filled"
                                            color="blue"
                                        >
                                            <IconUserFilled size={20} />
                                        </Avatar>
                                        <Box style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>
                                                Admin User
                                            </Text>
                                            <Text c="dimmed" size="xs">
                                                admin@example.com
                                            </Text>
                                        </Box>
                                        <IconChevronDown size={16} color="gray" />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Account</Menu.Label>
                                <Menu.Item
                                    leftSection={<IconUserCircle size={16} />}
                                >
                                    Profile
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconSettings size={16} />}
                                >
                                    Settings
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Label>Support</Menu.Label>
                                <Menu.Item
                                    leftSection={<IconMessageCircle size={16} />}
                                >
                                    Contact Support
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconLogout size={16} />}
                                    onClick={() => logout().catch(console.error)}
                                >
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </Container>
        </Paper>
    );
}

export default AuthenticatedHeader;