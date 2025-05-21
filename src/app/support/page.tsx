"use client";
import React from 'react';
import PublicPage from "@/app/components/PublicPage";
import {
    Accordion,
    ActionIcon,
    Alert,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
    Textarea,
    ThemeIcon,
    Title
} from '@mantine/core';
import {
    IconBrandTwitter,
    IconHelpCircle,
    IconHeadset,
    IconMail,
    IconMessage,
    IconMessageDots,
    IconPhone,
    IconQuestionMark,
    IconSend,
    IconInfoCircle,
    IconArrowRight
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import GradientMeshBackground from "@/app/components/GradientMeshBackground";
import CircuitBackground from "@/app/components/CircuitBackground";
import BackgroundDots from "@/app/components/BackgroundDots";

const SupportPage: React.FC = () => {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validate: {
            name: (value) => value.trim().length < 2 ? 'Name must be at least 2 characters' : null,
            email: (value) => /^\S+@\S+$/.test(value) ? null : 'Invalid email address',
            message: (value) => value.trim().length < 10 ? 'Message must be at least 10 characters' : null
        }
    });

    const handleSubmit = (values: typeof form.values) => {
        // Handle form submission logic here
        console.log('Form submitted:', values);
        // Reset form after submission
        form.reset();
        // Show success message or redirect
    };

    return (
        <PublicPage customBackground={<BackgroundDots />}>
            <Container size="xl" py={75}>
                <Stack gap="xl">
                    {/* Header Section */}
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, md: 7 }} order={{ base: 2, md: 1 }}>
                            <Stack gap="xs">
                                <Title order={1} size="h2" fw={700} c="var(--mantine-color-primary-5).9">
                                    Support Center
                                </Title>
                                <Text size="lg" c="gray.7" maw={600}>
                                    We're here to help you through every step of the process. Reach out with any questions or concerns.
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 5 }} order={{ base: 1, md: 2 }}>
                            <Box
                                h={180}
                                w="100%"
                                style={{
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                    background: 'linear-gradient(135deg, var(--mantine-color-primary-4), var(--mantine-color-primary-6))',
                                    opacity: 0.8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Stack align="center" gap={4}>
                                    <ThemeIcon size={64} radius={64} color="white" variant="light">
                                        <IconHeadset size={40} color="var(--mantine-color-primary-6)" />
                                    </ThemeIcon>
                                    <Text c="white" fw={600} mt="md" size="lg">24/7 Customer Support</Text>
                                </Stack>
                            </Box>
                        </Grid.Col>
                    </Grid>

                    {/* Contact Options Section */}
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Paper shadow="md" radius="lg" p="xl" withBorder h="100%">
                                <Stack align="center" gap="md">
                                    <ThemeIcon size={48} radius={48} color="var(--mantine-color-primary-5)" variant="light">
                                        <IconPhone size={28} />
                                    </ThemeIcon>
                                    <Title order={3} ta="center">Call Us</Title>
                                    <Text ta="center" c="gray.7">
                                        Speak directly with our support team
                                    </Text>
                                    <Text fw={600} size="lg" c="var(--mantine-color-primary-7)">
                                        (800) 555-0123
                                    </Text>
                                    <Text size="sm" c="gray.6">
                                        Available 24/7
                                    </Text>
                                    <Button
                                        variant="light"
                                        color="var(--mantine-color-primary-5)"
                                        radius="md"
                                        fullWidth
                                        leftSection={<IconPhone size={16} />}
                                    >
                                        Call Now
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Paper shadow="md" radius="lg" p="xl" withBorder h="100%">
                                <Stack align="center" gap="md">
                                    <ThemeIcon size={48} radius={48} color="var(--mantine-color-primary-5)" variant="light">
                                        <IconMail size={28} />
                                    </ThemeIcon>
                                    <Title order={3} ta="center">Email Us</Title>
                                    <Text ta="center" c="gray.7">
                                        Send us a detailed message
                                    </Text>
                                    <Text fw={600} size="lg" c="var(--mantine-color-primary-7)">
                                        support@example.com
                                    </Text>
                                    <Text size="sm" c="gray.6">
                                        Response within 24 hours
                                    </Text>
                                    <Button
                                        variant="light"
                                        color="var(--mantine-color-primary-5)"
                                        radius="md"
                                        fullWidth
                                        leftSection={<IconMail size={16} />}
                                    >
                                        Email Now
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Paper shadow="md" radius="lg" p="xl" withBorder h="100%">
                                <Stack align="center" gap="md">
                                    <ThemeIcon size={48} radius={48} color="var(--mantine-color-primary-5)" variant="light">
                                        <IconMessageDots size={28} />
                                    </ThemeIcon>
                                    <Title order={3} ta="center">Live Chat</Title>
                                    <Text ta="center" c="gray.7">
                                        Chat with a support specialist
                                    </Text>
                                    <Text fw={600} size="lg" c="var(--mantine-color-primary-7)">
                                        Start a conversation
                                    </Text>
                                    <Text size="sm" c="gray.6">
                                        Available 9AM-9PM EST
                                    </Text>
                                    <Button
                                        variant="light"
                                        color="var(--mantine-color-primary-5)"
                                        radius="md"
                                        fullWidth
                                        leftSection={<IconMessage size={16} />}
                                    >
                                        Start Chat
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>

                    {/* FAQ Section */}
                    <Paper shadow="md" radius="lg" p="xl" withBorder mt="xl">
                        <Stack gap="lg">
                            <Group justify="space-between">
                                <Group gap="xs">
                                    <IconQuestionMark
                                        style={{ color: 'var(--mantine-color-primary-6)' }}
                                        size={20}
                                    />
                                    <Title order={2} size="h3">Frequently Asked Questions</Title>
                                </Group>
                            </Group>
                            
                            <Divider />
                            
                            <Accordion variant="separated" radius="md">
                                <Accordion.Item value="item-1">
                                    <Accordion.Control>
                                        <Text fw={500}>How do I get started with the service?</Text>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Text size="sm">
                                            To get started, create a profile by clicking on "Create Profile" button on the dashboard. 
                                            You'll need to provide some personal information and upload required documents like a death 
                                            certificate and government ID.
                                        </Text>
                                    </Accordion.Panel>
                                </Accordion.Item>

                                <Accordion.Item value="item-2">
                                    <Accordion.Control>
                                        <Text fw={500}>What documents do I need to provide?</Text>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Text size="sm">
                                            You will need to provide a death certificate and a government-issued ID (such as a driver's license, 
                                            passport, or state ID card). These documents help us verify your identity and relationship to the deceased.
                                        </Text>
                                    </Accordion.Panel>
                                </Accordion.Item>

                                <Accordion.Item value="item-3">
                                    <Accordion.Control>
                                        <Text fw={500}>How long does the process typically take?</Text>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Text size="sm">
                                            The timeline varies depending on the specific services selected. Generally, most services are processed 
                                            within 7-14 business days after all required documentation has been received and verified.
                                        </Text>
                                    </Accordion.Panel>
                                </Accordion.Item>

                                <Accordion.Item value="item-4">
                                    <Accordion.Control>
                                        <Text fw={500}>What payment methods do you accept?</Text>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Text size="sm">
                                            We accept all major credit cards, debit cards, and electronic bank transfers. Payment is processed 
                                            securely through our platform, and you'll receive an itemized receipt for all transactions.
                                        </Text>
                                    </Accordion.Panel>
                                </Accordion.Item>

                                <Accordion.Item value="item-5">
                                    <Accordion.Control>
                                        <Text fw={500}>Can I make changes to my service selections?</Text>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Text size="sm">
                                            Yes, you can modify your service selections at any time before final checkout. Navigate to your dashboard 
                                            and select "Edit Services" to make changes. If you've already completed checkout, please contact our 
                                            support team for assistance.
                                        </Text>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>
                            
                            <Alert color="blue" radius="md">
                                <Group>
                                    <ThemeIcon color="blue" size="lg" radius="xl" variant="light">
                                        <IconInfoCircle size={18} />
                                    </ThemeIcon>
                                    <Text size="sm">Can't find the answer you're looking for? Contact us directly or browse our knowledge base.</Text>
                                </Group>
                            </Alert>
                            
                            <Button
                                variant="subtle"
                                color="var(--mantine-color-primary-5)"
                                rightSection={<IconArrowRight size={16} />}
                            >
                                View Full Knowledge Base
                            </Button>
                        </Stack>
                    </Paper>

                    {/* Contact Form Section */}
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <Paper shadow="md" radius="lg" p="xl" withBorder>
                                <form onSubmit={form.onSubmit(handleSubmit)}>
                                    <Stack gap="md">
                                        <Title order={2} size="h3">Send Us a Message</Title>
                                        <Text c="gray.7">
                                            Fill out the form below and we'll get back to you as soon as possible.
                                        </Text>
                                        
                                        <Grid gutter="md">
                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                <TextInput
                                                    label="Your Name"
                                                    placeholder="Enter your full name"
                                                    {...form.getInputProps('name')}
                                                    size="md"
                                                    required
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                <TextInput
                                                    label="Email Address"
                                                    placeholder="your.email@example.com"
                                                    {...form.getInputProps('email')}
                                                    size="md"
                                                    required
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        
                                        <TextInput
                                            label="Subject"
                                            placeholder="What is your message about?"
                                            {...form.getInputProps('subject')}
                                            size="md"
                                        />
                                        
                                        <Textarea
                                            label="Message"
                                            placeholder="Please describe your question or concern in detail"
                                            minRows={5}
                                            {...form.getInputProps('message')}
                                            size="md"
                                            required
                                        />
                                        
                                        <Button
                                            type="submit"
                                            size="lg"
                                            mt="md"
                                            variant="gradient"
                                            gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
                                            leftSection={<IconSend size={20} />}
                                        >
                                            Send Message
                                        </Button>
                                    </Stack>
                                </form>
                            </Paper>
                        </Grid.Col>
                        
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Stack gap="md" h="100%">
                                <Paper shadow="md" radius="lg" p="xl" withBorder>
                                    <Stack gap="md">
                                        <Title order={3} size="h4">Connect With Us</Title>
                                        <Text size="sm" c="gray.7">
                                            Follow us on social media for updates and helpful resources.
                                        </Text>
                                        
                                        <Group mt="xs">
                                            <ActionIcon variant="light" size="lg" radius="xl" color="blue">
                                                <IconBrandTwitter size={18} />
                                            </ActionIcon>
                                            <ActionIcon variant="light" size="lg" radius="xl" color="indigo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                    <rect x="2" y="9" width="4" height="12"></rect>
                                                    <circle cx="4" cy="4" r="2"></circle>
                                                </svg>
                                            </ActionIcon>
                                            <ActionIcon variant="light" size="lg" radius="xl" color="cyan">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                                </svg>
                                            </ActionIcon>
                                        </Group>
                                    </Stack>
                                </Paper>
                                
                                <Paper shadow="md" radius="lg" p="xl" withBorder style={{flex: '1'}}>
                                    <Stack gap="md">
                                        <ThemeIcon size={48} radius={48} color="var(--mantine-color-primary-5)" variant="light">
                                            <IconHelpCircle size={28} />
                                        </ThemeIcon>
                                        <Title order={3} size="h4">Need Immediate Help?</Title>
                                        <Text size="sm" c="gray.7">
                                            Our support specialists are available 24/7 to assist you with urgent matters.
                                        </Text>
                                        <Button
                                            variant="gradient"
                                            gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
                                            radius="md"
                                            fullWidth
                                            leftSection={<IconPhone size={16} />}
                                        >
                                            Priority Support
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>
        </PublicPage>
    );
}

export default SupportPage;