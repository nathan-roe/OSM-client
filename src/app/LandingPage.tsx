import PublicPage from "./components/PublicPage";
import {
    Grid,
    Button,
    Card,
    Stack,
    Text,
    Box,
    Space,
    Title,
    Divider,
    Group,
    Container,
    List,
    ThemeIcon,
    SimpleGrid,
    BackgroundImage,
    useMantineTheme,
    TextInput,
    Textarea,
    Image, Paper
} from "@mantine/core";
import {
    IconCheck,
    IconCookie,
    IconPointer,
    IconShieldCheck,
    IconBell,
    IconIkosaedr,
    IconUsers,
    IconSitemap,
    IconBrandInstagram,
    IconBrandGoogle,
    IconBrandX,
    IconBrandNetflix,
    IconBrandDisney,
    IconBrandFacebook,
    IconBrandHbo,
    IconBrandBing,
    IconBrandApple,
    IconBrandVisa,
    IconBrandSkype,
    IconBrandTeams
} from "@tabler/icons-react";
import SignInCard from "@/app/signin/SignInCard";
import {useMediaQuery} from "@mantine/hooks";
import Wave from "./components/Wave";
import React from "react";
import {useRouter} from "next/navigation";


const secondaryInfoCards = [
    {
        title: 'Find previously unknown accounts',
        description: 'By using our online service finding tool, you\'ll be able to find and remove accounts you wouldn\'t otherwise know existed',
        icon: IconUsers,
    },
    {
        title: 'Remove and archive online services',
        description: 'We automate the archive and delete processes for online services, so that you can set your preferences once, and manage services everywhere',
        icon: IconSitemap,
    },
    {
        title: 'Prevent data collection',
        description: 'We provide the ability to opt out of data collection from third parties, which may store and sell personal information about your loved ones',
        icon: IconCookie,
    },
];

const LandingPage = () => {
    const mobile = useMediaQuery('(max-width: 62em)')
    return (
        <PublicPage>
            {mobile ? <LandingMobile/> : <LandingDesktop/>}
        </PublicPage>
    );
}

const LandingDesktop = () => {
    const medium = useMediaQuery('(max-width: 75em)');
    const theme = useMantineTheme();
    const router = useRouter();

    return (
        <Stack w="100vw">
            <Stack mih={500} h="calc(100vh - 50px)" w="100%" style={{
                overflow: 'hidden',
                position: 'relative'
            }}>
                <img src="landing-hero-header.jpeg" alt="Hero Header" style={{
                    zIndex: 0,
                    width: '100%',
                    height: 'auto',
                    position: 'absolute',
                    left: 0,
                    filter: 'blur(5px) brightness(75%)'
                }}/>
                <Group h="100%" align="flex-start" style={{zIndex: 1}}>
                    <Grid h="100%" w="100%">
                        <Grid.Col span={1}/>
                        <Grid.Col h="calc(100vh - 65px)" span={5}>
                            <Group justify="center" h="100%">
                                <Stack justify="space-between" w="fit-content" maw="75%">
                                    <Title c="text.0" size={50}>
                                        Organize accounts,<br />all in one place
                                    </Title>
                                    <Text c="text.1" size="xl">
                                        Archiving, removing, and tracking online services for
                                        your loved ones is no small task. We're here to help.
                                    </Text>
                                    <List
                                        visibleFrom="lg"
                                        mt={30}
                                        spacing="sm"
                                        size="lg"
                                        icon={
                                            <ThemeIcon size={20} radius="xl">
                                                <IconCheck size={12} radius={1.5}/>
                                            </ThemeIcon>
                                        }
                                    >
                                        <List.Item c="white">
                                            <b>Discover</b> - Find the online services that are relevant to you
                                        </List.Item>
                                        <List.Item c="white">
                                            <b>Simplify</b> - Archive and remove services for your loved ones
                                            in just a few steps. We'll handle the rest.
                                        </List.Item>
                                        <List.Item c="white">
                                            <b>Track and Manage</b> - View detailed information about the accounts you modify, all at the click of a button
                                        </List.Item>
                                    </List>
                                </Stack>
                            </Group>
                        </Grid.Col>
                        <Grid.Col h="calc(100vh - 65px)" span={5}>
                            <Group justify="center" align="center" h="100%">
                                <Container size="xs">
                                    <SignInCard/>
                                </Container>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Group>
            </Stack>
            <Group h="80vh" mih={750} align="center" justify="center">
                <Stack w="fit-content" h="fit-content">
                    <Card h={525} w="70vw" miw={500} radius="lg">
                        <Card.Section h={500}>
                            <BackgroundImage src="" radius="lg">
                                <Stack justify="flex-start" align="center" h={500} p={100}>
                                    <Title size={35} ta="center">Manage the accounts of loved ones who have passed on</Title>
                                    <Container w="75%" h="fit-content">
                                        <Text ta="center" c="dimmed">
                                            A growing number of third parties buy and sell data
                                            to improve personalized content. For loved ones who
                                            have passed, this means their data can continue to be
                                            accessed, used, and traded, by third parties after
                                            they no longer have the ability to opt out.
                                            With just a few clicks, we'll ensure personal records
                                            are removed, while keeping you informed every step of the way.
                                        </Text>
                                    </Container>
                                </Stack>
                            </BackgroundImage>
                        </Card.Section>
                    </Card>
                    <Group w="70vw" miw={500} justify="space-evenly" mt={{base: -100, lg: -175}}
                           h={{base: 165, lg: 240}} style={{
                        overflow: 'hidden'
                    }}>
                        {[
                            {
                                icon: IconPointer,
                                description: "Simplicity for online data removal and management"
                            },
                            {
                                icon: IconIkosaedr,
                                description: "Dependability while managing critical user data"
                            },
                            {
                                icon: IconBell,
                                description: "Visibility at every step of the process"
                            },

                            {
                                icon: IconShieldCheck,
                                description: "Security and privacy for those it matters most to"
                            },
                        ].map((card) => (
                            <Card key={card.description} shadow="sm" radius="xl" withBorder h={{base: 150, lg: 225}}
                                  w={{base: 150, lg: 225}}>
                                <Stack p={{base: 0, lg: 20}} align="center" justify="flex-end">
                                    <card.icon size={medium ? 50 : 100} color={theme.colors.primary[4]}/>
                                    <Text ta="center" c="dimmed" size={medium ? "xs" : "sm"}>
                                        {card.description}
                                    </Text>
                                </Stack>
                            </Card>
                        ))}
                    </Group>
                </Stack>
            </Group>
            <Stack justify="center" gap={0} style={{zIndex: 1}}>
                <Wave fill={theme.colors.primary[1]} position="up" style={{
                    width: '100%',
                    marginTop: 50,
                }}/>
                <Group h="60vh" mih={550} bg="primary.1" gap="xs" style={{
                    boxShadow: theme.shadows.xl
                }}>
                    <Container size="md" py="xl">
                        <Title order={2} ta="center" mt="sm">
                            An all-in-one platform for finding, managing, and tracking online services
                        </Title>

                        <Text c="dimmed" ta="center" mt="md">
                            With our intuitive step-by-step process, you'll be able to organize and managed
                            accounts distributed across a vast number of services within only a few minutes
                        </Text>

                        <SimpleGrid cols={{base: 1, md: 3}} spacing="xl" mt={50}>
                            {
                                secondaryInfoCards.map((feature) => (
                                    <Card key={feature.title} shadow="md" radius="md" padding="xl">
                                        <feature.icon size={50} stroke={2} color={theme.colors.primary[4]}/>
                                        <Text fz="lg" fw={500} mt="md">
                                            {feature.title}
                                        </Text>
                                        <Divider size="md" w="45px" mt={5} color="primary.3"/>
                                        <Text fz="sm" c="dimmed" mt="sm">
                                            {feature.description}
                                        </Text>
                                    </Card>
                                ))
                            }
                        </SimpleGrid>
                    </Container>
                </Group>
                <Wave fill={theme.colors.primary[1]} reverse style={{
                    width: '100%',
                }}/>
            </Stack>
            <Box
                pos="relative"
                mih={750}
                mt={-50}
                style={{
                    zIndex: 0,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, var(--mantine-color-primary-6) 0%, var(--mantine-color-primary-9) 100%)',
                }}
            >
                <Container size="xl" h="100%">
                    <Stack
                        justify="center"
                        align="center"
                        h="100%"
                        py={100}
                        pos="relative"
                        style={{ backdropFilter: 'blur(10px)' }}
                    >
                        <Stack gap="xl" maw={800} style={{ textAlign: 'center' }}>
                            <Box>
                                <Title
                                    c="primary.0"
                                    size={65}
                                    fw={900}
                                    style={{
                                        lineHeight: 1.1,
                                        letterSpacing: '-1px',
                                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    Account management<br/>
                                    <Text
                                        component="span"
                                        inherit
                                        variant="gradient"
                                        gradient={{ from: 'secondary.6', to: 'secondary.9' }}
                                        style={{
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            textShadow: 'none',
                                        }}
                                    >
                                        all in one place.
                                    </Text>
                                </Title>

                                <Title
                                    order={2}
                                    size={30}
                                    c="gray.0"
                                    fw={500}
                                    mt="xl"
                                    style={{
                                        lineHeight: 1.4,
                                        textShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    Managing the online presence of loved ones has never been easier
                                </Title>
                            </Box>

                            <Button
                                variant="gradient"
                                gradient={{ from: 'white', to: 'gray.2' }}
                                size="xl"
                                radius="xl"
                                px={50}
                                mt={40}
                                onClick={() => router.push("/signup")}
                                styles={{
                                    root: {
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                                        },
                                    },
                                    inner: {
                                        fontSize: '2rem',
                                        fontWeight: 600,
                                        textTransform: "capitalize",
                                        background: 'linear-gradient(135deg, var(--mantine-color-primary-7), var(--mantine-color-primary-8))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    },
                                }}
                            >
                                Get Started
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Stack justify="center" gap={0} style={{zIndex: 1}} mt={-100}>
                <Wave fill={theme.colors.primary[1]} position="up" style={{
                    width: '100%',
                    marginTop: 50,
                }}/>
                <Group h="60vh" mih={550} bg="primary.1" gap="xs">
                    <SimpleGrid cols={{base: 2}} h="100%" w="100%">
                        <Group justify="center" w="100%" h="100%">
                            <Container size="sm" h="100%">
                                <Stack h="100%" justify="center">
                                    <Title size={35}>
                                        Our passion is simplifying digital asset management,
                                        so you can focus on everything else
                                    </Title>
                                    <Text size="lg" mt={20}>
                                        We're constantly expanding the services we support, to help manage your unique digital footprint.
                                        Get started in just a few clicks.
                                    </Text>
                                    <Button mt={50} size="lg" w="fit-content" onClick={() => {
                                        router.push("/about")
                                    }}>Learn More</Button>
                                </Stack>
                            </Container>
                        </Group>
                        <Stack w="100%" h="100%" justify="center" align="center" px={50}>
                            <SimpleGrid cols={{base: 4, lg: 6}}>
                                {[
                                    {
                                        icon: IconBrandGoogle
                                    },
                                    {
                                        icon: IconBrandFacebook
                                    },
                                    {
                                        icon: IconBrandInstagram
                                    },
                                    {
                                        icon: IconBrandX
                                    },
                                    {
                                        icon: IconBrandNetflix
                                    },
                                    {
                                        icon: IconBrandDisney
                                    },
                                    {
                                        icon: IconBrandHbo
                                    },
                                    {
                                        icon: IconBrandBing
                                    },
                                    ...(!medium ? [
                                        {
                                            icon: IconBrandApple
                                        },
                                        {
                                            icon: IconBrandVisa
                                        },
                                        {
                                            icon: IconBrandSkype
                                        },
                                        {
                                            icon: IconBrandTeams
                                        }
                                    ] : [])
                                ].map((service, idx) => (
                                    <ThemeIcon key={idx} size={100} radius="xl" mb={20} variant="gradient" gradient={{
                                        from: theme.colors.primary[9],
                                        to: theme.colors.primary[4],
                                    }}>
                                        <service.icon size={80} radius={1} strokeWidth={1.5} />
                                    </ThemeIcon>
                                ))}
                            </SimpleGrid>
                            <Group w="100%" justify="center">
                                {Array.from((new Array(3)).keys()).map(key => (
                                    <ThemeIcon key={key} radius="xl" />
                                ))}
                            </Group>
                        </Stack>
                    </SimpleGrid>
                </Group>
            </Stack>
            <Box
                py={80}
                px="md"
            >
                <Container size="xl">
                    <Stack gap="xl">
                        <Stack gap="xs" ta="center">
                            <Title
                                order={1}
                                size={45}
                                fw={800}
                                style={{ letterSpacing: '-1px' }}
                            >
                                Get in Touch
                            </Title>
                            <Text size="xl" c="dimmed" maw={600} mx="auto" style={{ lineHeight: 1.6 }}>
                                Our team is ready to answer your questions and help you get started
                            </Text>
                        </Stack>

                        <form style={{ width: '100%' }} onSubmit={(e) => {
                            e.preventDefault();
                            // Handle form submission
                        }}>
                            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                                <Paper
                                    shadow="md"
                                    radius="lg"
                                    p="xl"
                                    withBorder
                                    style={{
                                        background: 'white',
                                        borderColor: 'var(--mantine-color-primary-2)',
                                    }}
                                >
                                    <Stack gap="xl">
                                        <Stack gap="md">
                                            <TextInput
                                                label="Your name"
                                                placeholder="Jane Smith"
                                                size="md"
                                                radius="md"
                                                styles={{
                                                    label: {
                                                        fontSize: '1rem',
                                                        marginBottom: '0.5rem',
                                                    },
                                                    input: {
                                                        '&:focus': {
                                                            borderColor: 'var(--mantine-color-primary-5)',
                                                            boxShadow: '0 0 0 3px var(--mantine-color-primary-1)',
                                                        },
                                                    },
                                                }}
                                            />

                                            <TextInput
                                                label="Your email"
                                                placeholder="my.email@gmail.com"
                                                size="md"
                                                radius="md"
                                                styles={{
                                                    label: {
                                                        fontSize: '1rem',
                                                        marginBottom: '0.5rem',
                                                    },
                                                    input: {
                                                        '&:focus': {
                                                            borderColor: 'var(--mantine-color-primary-5)',
                                                            boxShadow: '0 0 0 3px var(--mantine-color-primary-1)',
                                                        },
                                                    },
                                                }}
                                            />

                                            <Textarea
                                                label="Your message"
                                                placeholder="Hi, I'd like to know more about..."
                                                size="md"
                                                radius="md"
                                                minRows={12}
                                                maxRows={12}
                                                autosize
                                                styles={{
                                                    label: {
                                                        fontSize: '1rem',
                                                        marginBottom: '0.5rem',
                                                    },
                                                    input: {
                                                        '&:focus': {
                                                            borderColor: 'var(--mantine-color-primary-5)',
                                                            boxShadow: '0 0 0 3px var(--mantine-color-primary-1)',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Stack>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            radius="xl"
                                            variant="gradient"
                                            gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-primary-6)' }}
                                            fullWidth
                                            styles={{
                                                root: {
                                                    height: 50,
                                                    transition: 'transform 0.2s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                    },
                                                    '&:active': {
                                                        transform: 'translateY(0)',
                                                    },
                                                },
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </Stack>
                                </Paper>

                                <Stack gap="xl">
                                    <Paper
                                        p="xl"
                                        radius="lg"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--mantine-color-primary-7) 0%, var(--mantine-color-primary-5) 100%)',
                                            color: 'white',
                                        }}
                                    >
                                        <Stack gap="md">
                                            <Text size="xl" fw={500} style={{ lineHeight: 1.6 }}>
                                                We're always looking for ways to expand and improve our services. If you have specific requests,
                                                we'd be happy to update our platform to support them.
                                            </Text>
                                            <Text size="lg" style={{ opacity: 0.9 }}>
                                                Your feedback helps us grow and serve you better.
                                            </Text>
                                        </Stack>
                                    </Paper>

                                    <Paper
                                        shadow="md"
                                        radius="lg"
                                        style={{
                                            flex: 1,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            aspectRatio: '16/9',
                                        }}
                                    >
                                        <Image
                                            src="./contact-us.jpeg"
                                            alt="Customer Support"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Box
                                            style={{
                                                position: 'absolute',
                                                backgroundColor: theme.colors.primary[3],
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: '15%'
                                            }}
                                        />
                                    </Paper>
                                </Stack>
                            </SimpleGrid>
                        </form>
                    </Stack>
                </Container>
            </Box>
        </Stack>
    );
}

const LandingMobile = () => {
    const theme = useMantineTheme();

    return (
        <Stack w="100vw" px={20} pt={10} align="center">
            <Card w="100%" radius="md" withBorder px={50}>
                <Card.Section pt={20} pb={40}>
                    <Stack align="center">
                        <Title size={25}>Organize accounts, all in one place</Title>
                        <Text size="md">
                            Archiving, removing, and tracking online services for
                            your loved ones is no small task. We're here to help.
                        </Text>
                        <Button w="100%" h={40}>
                            <Text size="lg" fw={600}>Get Started</Text>
                        </Button>

                        <div style={{
                            height: 400,
                            maxHeight: 'fit-content',
                            width: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            borderRadius: '8px'
                        }}>
                            <Image
                                src="./landing-hero-header.jpeg"
                                alt="Custom Support"
                                h="auto"
                                width="100%"
                            />
                        </div>
                    </Stack>
                </Card.Section>
            </Card>
            <Space/>
            <SignInCard/>
            <Card w="100%" radius="md" px={50}>
                <Stack align="center">
                    <Title ta="center" mt={20} size={25}>
                        An all-in-one platform for finding, managing, and tracking online services
                    </Title>
                    <Text ta="center" size="md">
                        With our intuitive step-by-step process, you'll be able to organize and managed
                        accounts distributed across a vast number of services within only a few minutes
                    </Text>
                    <Button w="100%" h={50}>
                        <Text size="lg" fw={600}>Learn more</Text>
                    </Button>
                </Stack>
            </Card>
            {
                secondaryInfoCards.map((feature) => (
                    <Card key={feature.title} shadow="md" radius="md" padding="xl">
                        <feature.icon size={50} stroke={2} color={theme.colors.primary[4]}/>
                        <Text fz="lg" fw={500} mt="md">
                            {feature.title}
                        </Text>
                        <Divider size="md" w="45px" mt={5} color="primary.3"/>
                        <Text fz="sm" c="dimmed" mt="sm">
                            {feature.description}
                        </Text>
                    </Card>
                ))
            }
        </Stack>
    );
}

export default LandingPage;