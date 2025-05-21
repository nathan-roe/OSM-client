"use client";
import React from 'react';
import {
    Box,
    Container,
    Grid,
    Group,
    List,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title
} from '@mantine/core';
import {
    IconCheck, IconDeviceDesktop,
    IconHeartHandshake,
    IconLock,
    IconScale,
    IconUsers
} from '@tabler/icons-react';
import PublicPage from "@/app/components/PublicPage";
import WaveBackground from "@/app/components/WaveBackground";
import GeometricBackground from "@/app/components/GeometricBackground";

const AboutPage: React.FC = () => {
    const achievements = [
        {
            figure: '1000+',
            description: 'Families Helped'
        },
        {
            figure: '100+',
            description: 'Digital Services Managed'
        },
        {
            figure: '10+',
            description: 'Countries Served'
        },
        {
            figure: '24/7',
            description: 'Customer Support'
        }
    ];

    const values = [
        {
            title: 'Compassion',
            description: 'We approach every interaction with empathy and understanding during difficult times.',
            icon: <IconHeartHandshake size={24}/>
        },
        {
            title: 'Security',
            description: 'Your information and digital assets are protected with the highest security standards.',
            icon: <IconLock size={24}/>
        },
        {
            title: 'Accessibility',
            description: 'Our services are designed to be straightforward and accessible to everyone.',
            icon: <IconUsers size={24}/>
        },
        {
            title: 'Innovation',
            description: 'We continuously improve our technology to better serve evolving digital needs.',
            icon: <IconDeviceDesktop size={24}/>
        },
        {
            title: 'Integrity',
            description: 'We maintain the highest ethical standards in all our operations and interactions.',
            icon: <IconScale size={24}/>
        }
    ];
    
    return (
        <PublicPage customBackground={<GeometricBackground />}>
            <Container size="xl" py="xl">
                <Stack gap="xl">
                    {/* Hero Section */}
                    <Grid gutter="xl" align="center">
                        <Grid.Col span={{base: 12, md: 6}} order={{base: 2, md: 1}}>
                            <Stack gap="md">
                                <Title order={1} size="h1" fw={800} c="var(--mantine-color-primary-5).9">
                                    About Digital Remains
                                </Title>
                                <Text size="xl" c="gray.7" maw={600}>
                                    Simplifying the management of digital legacies for families during difficult times.
                                </Text>
                                <Text c="gray.6">
                                    Founded in 2020, Digital Remains provides a comprehensive solution for managing the
                                    digital footprint
                                    of loved ones who have passed away. Our innovative platform automates the process of
                                    contacting service
                                    providers, closing accounts, and preserving digital memories, allowing families to
                                    focus on what matters most.
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{base: 12, md: 6}} order={{base: 1, md: 2}}>
                            <Box
                                p={0}
                                style={{
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                    height: 350,
                                    background: 'linear-gradient(135deg, var(--mantine-color-primary-4), var(--mantine-color-primary-6))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text fw={700} size="6rem" style={{opacity: 0.2, color: 'white'}}>
                                    DR
                                </Text>
                            </Box>
                        </Grid.Col>
                    </Grid>

                    {/* Mission & Vision Section */}
                    <Paper shadow="md" radius="lg" p="xl" withBorder style={{
                        background: 'linear-gradient(to right, var(--mantine-color-gray-0), var(--mantine-color-primary-0))'
                    }}>
                        <Grid gutter="xl">
                            <Grid.Col span={{base: 12, md: 6}}>
                                <Stack gap="md">
                                    <Title order={2} c="var(--mantine-color-primary-7)">Our Mission</Title>
                                    <Text>
                                        To ease the burden on families by providing an efficient, secure, and
                                        compassionate service
                                        for managing digital legacies. We aim to simplify what can be an overwhelming
                                        process during
                                        an already difficult time.
                                    </Text>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={{base: 12, md: 6}}>
                                <Stack gap="md">
                                    <Title order={2} c="var(--mantine-color-primary-7)">Our Vision</Title>
                                    <Text>
                                        A world where handling digital assets after loss is streamlined and dignified,
                                        where memories
                                        are preserved, and where families have peace of mind knowing their loved one's
                                        digital legacy
                                        is handled with care.
                                    </Text>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Paper>

                    {/* Achievements Section */}
                    <Box py="xl">
                        <Title order={2} ta="center" mb="xl" c="var(--mantine-color-primary-5).9">
                            Our Impact
                        </Title>
                        <SimpleGrid cols={{base: 2, md: 4}} spacing="xl">
                            {achievements.map((achievement, index) => (
                                <Paper
                                    key={index}
                                    shadow="sm"
                                    p="xl"
                                    radius="md"
                                    withBorder
                                    style={{
                                        textAlign: 'center',
                                        background: index % 2 === 0 ?
                                            'linear-gradient(135deg, var(--mantine-color-primary-0), var(--mantine-color-primary-1))' :
                                            'linear-gradient(135deg, var(--mantine-color-gray-0), var(--mantine-color-gray-1))'
                                    }}
                                >
                                    <Text
                                        size="3rem"
                                        fw={800}
                                        c="var(--mantine-color-primary-6)"
                                    >
                                        {achievement.figure}
                                    </Text>
                                    <Text size="lg" mt="xs" fw={500}>
                                        {achievement.description}
                                    </Text>
                                </Paper>
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* Core Values Section */}
                    <Box py="xl">
                        <Title order={2} mb="xl" c="var(--mantine-color-primary-5).9">
                            Our Core Values
                        </Title>
                        <Grid gutter="xl">
                            {values.map((value, index) => (
                                <Grid.Col key={index} span={{base: 12, sm: 6, lg: 4}}>
                                    <Paper
                                        shadow="sm"
                                        p="xl"
                                        radius="md"
                                        withBorder
                                        h="100%"
                                    >
                                        <Stack>
                                            <ThemeIcon
                                                size={50}
                                                radius="md"
                                                variant="light"
                                                color="var(--mantine-color-primary-5)"
                                            >
                                                {value.icon}
                                            </ThemeIcon>
                                            <Title order={3} size="h4">
                                                {value.title}
                                            </Title>
                                            <Text size="sm" c="gray.7">
                                                {value.description}
                                            </Text>
                                        </Stack>
                                    </Paper>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Box>

                    {/* What Makes Us Different */}
                    <Paper shadow="md" radius="lg" p="xl" withBorder mt="xl">
                        <Grid gutter="xl" align="center">
                            <Grid.Col span={{base: 12, md: 6}}>
                                <Title order={2} mb="md" c="var(--mantine-color-primary-5).9">
                                    What Makes Us Different
                                </Title>
                                <Text mb="md">
                                    At Digital Remains, we understand that managing digital accounts after loss requires
                                    both technical expertise and compassionate service. Our approach combines innovative
                                    technology with human understanding.
                                </Text>
                                <List
                                    spacing="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="var(--mantine-color-primary-5)" size={24} radius="xl">
                                            <IconCheck size={16}/>
                                        </ThemeIcon>
                                    }
                                >
                                    <List.Item>Automated yet personalized service process</List.Item>
                                    <List.Item>Comprehensive dashboard for tracking all services</List.Item>
                                    <List.Item>Secure document handling and verification</List.Item>
                                    <List.Item>Transparent pricing with no hidden fees</List.Item>
                                    <List.Item>24/7 support from compassionate specialists</List.Item>
                                </List>
                            </Grid.Col>
                            <Grid.Col span={{base: 12, md: 6}}>
                                <Box
                                    style={{
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        height: 300,
                                        background: 'linear-gradient(135deg, var(--mantine-color-primary-1), var(--mantine-color-primary-3))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Group gap="xs" style={{transform: 'rotate(-5deg)'}}>
                                        <Box
                                            style={{
                                                width: 120,
                                                height: 180,
                                                background: 'white',
                                                borderRadius: 8,
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 10,
                                                transform: 'rotate(5deg)'
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'var(--mantine-color-primary-2)',
                                                    borderRadius: 4,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    padding: '10px 5px'
                                                }}
                                            >
                                                <Box mb={5} style={{background: 'white', height: 10, borderRadius: 2}}/>
                                                <Box mb={5} style={{
                                                    background: 'white',
                                                    height: 10,
                                                    borderRadius: 2,
                                                    width: '60%'
                                                }}/>
                                                <Box style={{background: 'white', flex: 1, borderRadius: 2}}/>
                                            </Box>
                                        </Box>
                                        <Box
                                            style={{
                                                width: 150,
                                                height: 220,
                                                background: 'white',
                                                borderRadius: 8,
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 15,
                                                transform: 'rotate(-3deg)'
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'var(--mantine-color-primary-5)',
                                                    borderRadius: 4,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    padding: '15px 10px'
                                                }}
                                            >
                                                <Box mb={8} style={{background: 'white', height: 15, borderRadius: 2}}/>
                                                <Box mb={8} style={{
                                                    background: 'white',
                                                    height: 15,
                                                    borderRadius: 2,
                                                    width: '75%'
                                                }}/>
                                                <Box mb={8} style={{
                                                    background: 'white',
                                                    height: 15,
                                                    borderRadius: 2,
                                                    width: '50%'
                                                }}/>
                                                <Box style={{background: 'white', flex: 1, borderRadius: 2}}/>
                                            </Box>
                                        </Box>
                                        <Box
                                            style={{
                                                width: 130,
                                                height: 200,
                                                background: 'white',
                                                borderRadius: 8,
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 12,
                                                transform: 'rotate(8deg)'
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'var(--mantine-color-primary-3)',
                                                    borderRadius: 4,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    padding: '12px 8px'
                                                }}
                                            >
                                                <Box mb={6} style={{background: 'white', height: 12, borderRadius: 2}}/>
                                                <Box mb={6} style={{
                                                    background: 'white',
                                                    height: 12,
                                                    borderRadius: 2,
                                                    width: '80%'
                                                }}/>
                                                <Box style={{background: 'white', flex: 1, borderRadius: 2}}/>
                                            </Box>
                                        </Box>
                                    </Group>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Paper>

                    {/* Story Section */}
                    <Paper
                        radius="lg"
                        p="xl"
                        withBorder
                        style={{
                            background: 'linear-gradient(to bottom right, var(--mantine-color-primary-0), var(--mantine-color-primary-1))'
                        }}
                    >
                        <Stack align="center" gap="lg">
                            <Title order={2} ta="center" c="var(--mantine-color-primary-7)">
                                Our Story
                            </Title>
                            <Grid gutter="xl">
                                <Grid.Col span={{base: 12, md: 6}}>
                                    <Text c="gray.8">
                                        Digital Remains was founded in 2020 after our founder experienced the challenges
                                        of managing a
                                        loved one's digital accounts firsthand. Recognizing the growing importance of
                                        digital assets and
                                        the complexity of handling them after death, we set out to create a solution
                                        that would make this
                                        process easier for grieving families.
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={{base: 12, md: 6}}>
                                    <Text c="gray.8">
                                        What began as a modest service has grown into a comprehensive platform serving
                                        families across
                                        multiple countries. In 2021, we launched our first automated system, and by
                                        2022, we had expanded
                                        our coverage to over 100 digital service providers. Today, we continue to
                                        innovate and improve our
                                        services, guided by the needs of the families we serve.
                                    </Text>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </PublicPage>
    );
};

export default AboutPage;