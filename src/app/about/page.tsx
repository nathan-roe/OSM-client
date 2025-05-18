// AboutPage.tsx
"use client";
import React from 'react';
import {
    Container,
    Title,
    Text,
    Stack,
    Group,
    ThemeIcon,
    SimpleGrid,
    Paper,
    Badge,
    Timeline,
    Avatar,
    Box,
    rem
} from '@mantine/core';
import {
    IconHeart,
    IconShield,
    IconUsers,
    IconBulb,
    IconTargetArrow,
    IconFlag,
    IconMedal,
    IconChartBar,
    IconUserCircle
} from '@tabler/icons-react';
import PublicPage from "@/app/components/PublicPage";

const AboutPage = () => {
    const values = [
        {
            icon: IconHeart,
            title: 'Compassion',
            description: 'We approach every case with understanding and empathy, recognizing the sensitive nature of our work.'
        },
        {
            icon: IconShield,
            title: 'Security',
            description: 'Protecting personal data and ensuring privacy is at the core of everything we do.'
        },
        {
            icon: IconUsers,
            title: 'Support',
            description: 'Our dedicated team is always here to help you through every step of the process.'
        },
        {
            icon: IconBulb,
            title: 'Innovation',
            description: 'We continuously improve our services to provide the best possible solutions.'
        }
    ];

    const milestones = [
        {
            title: 'Company Founded',
            description: 'Started with a mission to simplify digital legacy management',
            date: '2020'
        },
        {
            title: 'Platform Launch',
            description: 'Released our first automated service management platform',
            date: '2021'
        },
        {
            title: 'Service Expansion',
            description: 'Expanded our coverage to over 100 digital service providers',
            date: '2022'
        },
        {
            title: 'Global Reach',
            description: 'Now helping families across multiple countries',
            date: '2023'
        }
    ];

    const teamMembers = [
        {
            name: 'Sarah Johnson',
            role: 'Chief Executive Officer',
            avatar: 'path-to-avatar-1.jpg'
        },
        {
            name: 'Michael Chen',
            role: 'Chief Technology Officer',
            avatar: 'path-to-avatar-2.jpg'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Head of Customer Success',
            avatar: 'path-to-avatar-3.jpg'
        }
    ];

    return (
        <PublicPage>
            {/* Hero Section */}
            <Box
                style={{
                    background: 'linear-gradient(135deg, var(--mantine-color-primary-5) 100%)',
                    padding: `${rem(60)} 0`,
                    marginBottom: rem(80)
                }}
            >
                <Container size="xl">
                    <Stack align="center" gap="xl">
                        <Badge
                            variant="gradient"
                            gradient={{ from: 'var(--mantine-color-secondary-5)', to: 'var(--mantine-color-primary-5)' }}
                            size="lg"
                            radius="xl"
                            px="xl"
                        >
                            About Us
                        </Badge>

                        <Title
                            order={1}
                            size={rem(48)}
                            fw={800}
                            style={{ color: 'white' }}
                            ta="center"
                        >
                            Simplifying Digital Legacy Management
                        </Title>

                        <Text
                            size="xl"
                            c="gray.0"
                            maw={800}
                            ta="center"
                            style={{ lineHeight: 1.6 }}
                        >
                            We're dedicated to helping families navigate the complexities of digital account
                            management during difficult times, providing compassionate and secure solutions.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* Mission & Vision */}
            <Container size="xl" mb={80}>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
                    <Paper shadow="md" radius="lg" p="xl" withBorder>
                        <Group mb="md">
                            <ThemeIcon size={56} radius="md" variant="gradient" gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}>
                                <IconTargetArrow size={28} />
                            </ThemeIcon>
                            <Title order={2}>Our Mission</Title>
                        </Group>
                        <Text size="lg" c="dimmed">
                            To provide families with a compassionate, secure, and efficient way to manage
                            digital legacies, ensuring peace of mind during difficult transitions.
                        </Text>
                    </Paper>

                    <Paper shadow="md" radius="lg" p="xl" withBorder>
                        <Group mb="md">
                            <ThemeIcon size={56} radius="md" variant="gradient" gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}>
                                <IconFlag size={28} />
                            </ThemeIcon>
                            <Title order={2}>Our Vision</Title>
                        </Group>
                        <Text size="lg" c="dimmed">
                            To become the trusted global leader in digital legacy management, setting
                            the standard for security, efficiency, and compassionate service.
                        </Text>
                    </Paper>
                </SimpleGrid>
            </Container>

            {/* Company Values */}
            <Container size="xl" mb={80}>
                <Stack align="center" mb={40}>
                    <Title order={2} size="h1" fw={800} c="var(--mantine-color-primary-5).9">Our Values</Title>
                    <Text size="lg" c="dimmed" maw={600} ta="center">
                        These core values guide every decision we make and every service we provide
                    </Text>
                </Stack>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={30}>
                    {values.map((value, index) => (
                        <Paper
                            key={index}
                            shadow="md"
                            radius="lg"
                            p="xl"
                            withBorder
                            style={{
                                transform: 'translateY(0)',
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)'
                                }
                            }}
                        >
                            <ThemeIcon
                                size={50}
                                radius="md"
                                variant="gradient"
                                gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
                                mb="md"
                            >
                                <value.icon size={26} />
                            </ThemeIcon>
                            <Text size="lg" fw={600} mb="xs">{value.title}</Text>
                            <Text size="sm" c="dimmed">{value.description}</Text>
                        </Paper>
                    ))}
                </SimpleGrid>
            </Container>

            {/* Company Timeline */}
            <Box bg="gray.0" py={80}>
                <Container size="xl">
                    <Stack align="center" mb={40}>
                        <Title order={2} size="h1" fw={800} c="var(--mantine-color-primary-5).9">Our Journey</Title>
                        <Text size="lg" c="dimmed" maw={600} ta="center">
                            Key milestones in our mission to simplify digital legacy management
                        </Text>
                    </Stack>

                    <Timeline active={3} bulletSize={32} lineWidth={2}>
                        {milestones.map((milestone, index) => (
                            <Timeline.Item
                                key={index}
                                bullet={<IconMedal size={20} />}
                                title={milestone.title}
                            >
                                <Text size="lg" mt={4}>{milestone.description}</Text>
                                <Text size="sm" mt={4} c="dimmed">{milestone.date}</Text>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Container>
            </Box>

            {/* Stats Section */}
            <Container size="xl" py={80}>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={30}>
                    {[
                        { icon: IconUsers, value: '10,000+', label: 'Families Helped' },
                        { icon: IconChartBar, value: '100+', label: 'Services Supported' },
                        { icon: IconUserCircle, value: '24/7', label: 'Customer Support' },
                    ].map((stat, index) => (
                        <Paper
                            key={index}
                            shadow="md"
                            radius="lg"
                            p="xl"
                            withBorder
                            ta="center"
                        >
                            <ThemeIcon
                                size={60}
                                radius="md"
                                variant="light"
                                color="var(--mantine-color-primary-5)"
                                mb="md"
                            >
                                <stat.icon size={30} />
                            </ThemeIcon>
                            <Text size="xl" fw={700}>{stat.value}</Text>
                            <Text size="sm" c="dimmed">{stat.label}</Text>
                        </Paper>
                    ))}
                </SimpleGrid>
            </Container>

            {/* Team Section */}
            <Box bg="gray.0" py={80}>
                <Container size="xl">
                    <Stack align="center" mb={40}>
                        <Title order={2} size="h1" fw={800} c="var(--mantine-color-primary-5).9">Our Leadership</Title>
                        <Text size="lg" c="dimmed" maw={600} ta="center">
                            Meet the team dedicated to simplifying digital legacy management
                        </Text>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={30}>
                        {teamMembers.map((member, index) => (
                            <Paper
                                key={index}
                                shadow="md"
                                radius="lg"
                                p="xl"
                                withBorder
                                ta="center"
                            >
                                <Avatar
                                    size={120}
                                    radius={120}
                                    mx="auto"
                                    src={member.avatar}
                                    mb="md"
                                />
                                <Text size="lg" fw={600}>{member.name}</Text>
                                <Text size="sm" c="dimmed">{member.role}</Text>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
        </PublicPage>
    );
};

export default AboutPage;