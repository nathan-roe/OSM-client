"use client";
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {ActionIcon, TextInput, Container, Paper, Stack, Title, Text, Affix, Button, Card, Group, Box, Grid, ScrollArea, SimpleGrid} from "@mantine/core";
import {
    IconCertificate,
    IconChecklist,
    IconEdit,
    IconIdBadge,
    IconPackage,
    IconShoppingCart, IconUser
} from "@tabler/icons-react";

interface OrderConfirmationProps {

}

const OrderConfirmation: React.FC<OrderConfirmationProps> = () => {

    return (
        <AuthenticatedPage>
            <Container size="xl" py="xl">
                <Stack gap="xl">
                    <Stack gap="xs">
                        <Title order={1} size="h2" fw={700} c="var(--mantine-color-primary-5).9">
                            Review & Confirm
                        </Title>
                        <Text size="lg" c="gray.7" maw={600}>
                            Please review your information and selections before proceeding to checkout
                        </Text>
                    </Stack>

                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="lg">
                                {/* User Information Card */}
                                <Paper shadow="sm" radius="lg" p="xl" withBorder>
                                    <Stack gap="md">
                                        <Group justify="space-between">
                                            <Group gap="xs">
                                                <IconUser
                                                    style={{ color: 'var(--mantine-color-primary-6)' }}
                                                    size={20}
                                                />
                                                <Text fw={600} size="lg">Personal Information</Text>
                                            </Group>
                                            <ActionIcon
                                                variant="light"
                                                color="var(--mantine-color-primary-5)"
                                                radius="xl"
                                            >
                                                <IconEdit size={18} />
                                            </ActionIcon>
                                        </Group>

                                        <Grid gutter="md">
                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                <TextInput
                                                    label="First Name"
                                                    disabled
                                                    value="first"
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'var(--mantine-color-gray-0)',
                                                            '&:disabled': {
                                                                opacity: 0.8
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                <TextInput
                                                    label="Middle Name"
                                                    disabled
                                                    value="middle"
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'var(--mantine-color-gray-0)',
                                                            '&:disabled': {
                                                                opacity: 0.8
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                <TextInput
                                                    label="Last Name"
                                                    disabled
                                                    value="last"
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'var(--mantine-color-gray-0)',
                                                            '&:disabled': {
                                                                opacity: 0.8
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Grid.Col>
                                        </Grid>

                                        <Grid gutter="md">
                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                <TextInput
                                                    label="Email"
                                                    disabled
                                                    value="email"
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'var(--mantine-color-gray-0)',
                                                            '&:disabled': {
                                                                opacity: 0.8
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                <TextInput
                                                    label="Phone"
                                                    disabled
                                                    value="phone"
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'var(--mantine-color-gray-0)',
                                                            '&:disabled': {
                                                                opacity: 0.8
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                <TextInput
                                                    label="ZIP Code"
                                                    disabled
                                                    value="zip"
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'var(--mantine-color-gray-0)',
                                                            '&:disabled': {
                                                                opacity: 0.8
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>
                                </Paper>

                                {/* Documents Section */}
                                <Paper shadow="sm" radius="lg" p="xl" withBorder>
                                    <Stack gap="md">
                                        <Group justify="space-between">
                                            <Group gap="xs">
                                                <IconCertificate
                                                    style={{ color: 'var(--mantine-color-primary-6)' }}
                                                    size={20}
                                                />
                                                <Text fw={600} size="lg">Death Certificate</Text>
                                            </Group>
                                            <ActionIcon
                                                variant="light"
                                                color="var(--mantine-color-primary-5)"
                                                radius="xl"
                                            >
                                                <IconEdit size={18} />
                                            </ActionIcon>
                                        </Group>
                                        <Box
                                            p="xl"
                                            style={{
                                                backgroundColor: 'var(--mantine-color-gray-0)',
                                                borderRadius: 'var(--mantine-radius-md)',
                                                aspectRatio: '16/9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <IconCertificate
                                                size={48}
                                                style={{ color: 'var(--mantine-color-gray-5)' }}
                                            />
                                        </Box>
                                    </Stack>
                                </Paper>

                                <Paper shadow="sm" radius="lg" p="xl" withBorder>
                                    <Stack gap="md">
                                        <Group justify="space-between">
                                            <Group gap="xs">
                                                <IconIdBadge
                                                    style={{ color: 'var(--mantine-color-primary-6)' }}
                                                    size={20}
                                                />
                                                <Text fw={600} size="lg">Government ID</Text>
                                            </Group>
                                            <ActionIcon
                                                variant="light"
                                                color="var(--mantine-color-primary-5)"
                                                radius="xl"
                                            >
                                                <IconEdit size={18} />
                                            </ActionIcon>
                                        </Group>
                                        <Box
                                            p="xl"
                                            style={{
                                                backgroundColor: 'var(--mantine-color-gray-0)',
                                                borderRadius: 'var(--mantine-radius-md)',
                                                aspectRatio: '16/9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <IconIdBadge
                                                size={48}
                                                style={{ color: 'var(--mantine-color-gray-5)' }}
                                            />
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Paper shadow="sm" radius="lg" withBorder style={{ height: '100%' }}>
                                <Stack gap={0} style={{ height: '100%' }}>
                                    <Group justify="space-between" p="xl">
                                        <Group gap="xs">
                                            <IconChecklist
                                                style={{ color: 'var(--mantine-color-primary-6)' }}
                                                size={20}
                                            />
                                            <Text fw={600} size="lg">Selected Services</Text>
                                        </Group>
                                        <ActionIcon
                                            variant="light"
                                            color="var(--mantine-color-primary-5)"
                                            radius="xl"
                                        >
                                            <IconEdit size={18} />
                                        </ActionIcon>
                                    </Group>

                                    <ScrollArea p="md" style={{ height: 'calc(100% - 60px)' }}>
                                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                                            {Array.from(new Array(10)).map((_, idx) => (
                                                <Paper
                                                    key={idx}
                                                    shadow="sm"
                                                    p="md"
                                                    radius="md"
                                                    withBorder
                                                    style={{
                                                        background: 'linear-gradient(135deg, var(--mantine-color-primary-0))'
                                                    }}
                                                >
                                                    <Stack gap="xs" align="center">
                                                        <IconPackage
                                                            size={32}
                                                            style={{ color: 'var(--mantine-color-primary-6)' }}
                                                        />
                                                        <Text size="sm" fw={500}>Service {idx + 1}</Text>
                                                    </Stack>
                                                </Paper>
                                            ))}
                                        </SimpleGrid>
                                    </ScrollArea>
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>

            <Affix position={{ bottom: 20, right: 20 }}>
                <Button
                    size="lg"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
                    leftSection={<IconShoppingCart size={20} />}
                    styles={{
                        root: {
                            padding: '0 30px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }
                    }}
                >
                    Proceed to Checkout
                </Button>
            </Affix>
        </AuthenticatedPage>
    );
}

export default OrderConfirmation;