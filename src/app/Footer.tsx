import {ActionIcon, Anchor, Container, Divider, Group, Paper, Text, ThemeIcon, Tooltip} from "@mantine/core";
import {IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconCopyright, IconLifebuoy, IconMail} from "@tabler/icons-react";

const Footer = () => {
    return (
        <Paper
            component="footer"
            withBorder
            shadow="md"
            p="md"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                borderTop: '1px solid var(--mantine-color-gray-2)',
                background: 'linear-gradient(to bottom, var(--mantine-color-gray-0), var(--mantine-color-body))'
            }}
        >
            <Container size="xl">
                <Group justify="space-between" align="center">
                    <Group gap="xs">
                        <ThemeIcon
                            size="sm"
                            variant="light"
                            color="blue"
                            radius="xl"
                        >
                            <IconCopyright size={12} />
                        </ThemeIcon>
                        <Text size="sm" c="dimmed">
                            2024 Your Company Name
                        </Text>
                    </Group>

                    <Group gap="lg">
                        <Anchor
                            component="button"
                            size="sm"
                            underline="never"
                            c="dimmed"
                            style={{
                                transition: 'color 150ms ease',
                                '&:hover': {
                                    color: 'var(--mantine-color-blue-6)'
                                }
                            }}
                        >
                            <Group gap={6}>
                                <IconLifebuoy size={16} />
                                <Text size="sm">Support</Text>
                            </Group>
                        </Anchor>

                        <Anchor
                            component="button"
                            size="sm"
                            underline="never"
                            c="dimmed"
                            style={{
                                transition: 'color 150ms ease',
                                '&:hover': {
                                    color: 'var(--mantine-color-blue-6)'
                                }
                            }}
                        >
                            <Group gap={6}>
                                <IconMail size={16} />
                                <Text size="sm">Contact</Text>
                            </Group>
                        </Anchor>

                        <Divider orientation="vertical" />

                        <Group gap="md">
                            <Tooltip label="Twitter">
                                <ActionIcon
                                    variant="subtle"
                                    color="gray"
                                    radius="xl"
                                    size="sm"
                                >
                                    <IconBrandTwitter size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="GitHub">
                                <ActionIcon
                                    variant="subtle"
                                    color="gray"
                                    radius="xl"
                                    size="sm"
                                >
                                    <IconBrandGithub size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="LinkedIn">
                                <ActionIcon
                                    variant="subtle"
                                    color="gray"
                                    radius="xl"
                                    size="sm"
                                >
                                    <IconBrandLinkedin size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Group>
                </Group>
            </Container>
        </Paper>
    );
}
export default Footer;