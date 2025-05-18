// PricingPage.tsx
"use client";
import React from 'react';
import {
    Container,
    Title,
    Text,
    Stack,
    Paper,
    Group,
    List,
    ThemeIcon,
    Badge,
    rem,
    Button
} from '@mantine/core';
import {
    IconCheck,
    IconX,
    IconCrown,
    IconUserPlus,
    IconRefresh,
    IconExternalLink
} from '@tabler/icons-react';
import PublicPage from "@/app/components/PublicPage";

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingTier {
    title: string;
    description: string;
    price: string;
    period: string;
    features: PricingFeature[];
    icon: React.ReactNode;
    highlighted?: boolean;
    ctaLink: string;
}

export default function PublicPricingPage() {
    const pricingTiers: PricingTier[] = [
        {
            title: "Basic",
            description: "Essential features for individuals",
            price: "Free",
            period: "forever",
            icon: <IconUserPlus size={24} />,
            ctaLink: "/signup/basic",
            features: [
                { text: "Basic account management", included: true },
                { text: "Single user access", included: true },
                { text: "Standard support", included: true },
                { text: "Limited document storage", included: true },
                { text: "Premium features", included: false },
                { text: "Priority support", included: false }
            ]
        },
        {
            title: "Premium",
            description: "Complete feature set for professionals",
            price: "$199",
            period: "one-time",
            icon: <IconCrown size={24} />,
            highlighted: true,
            ctaLink: "/signup/premium",
            features: [
                { text: "Basic account management", included: true },
                { text: "Multiple user access", included: true },
                { text: "Priority support", included: true },
                { text: "Unlimited document storage", included: true },
                { text: "Advanced features", included: true },
                { text: "Lifetime updates", included: true }
            ]
        },
        {
            title: "Enterprise",
            description: "Advanced solutions for organizations",
            price: "$49",
            period: "per month",
            icon: <IconRefresh size={24} />,
            ctaLink: "/contact-sales",
            features: [
                { text: "Basic account management", included: true },
                { text: "Unlimited user access", included: true },
                { text: "24/7 Priority support", included: true },
                { text: "Unlimited storage", included: true },
                { text: "Custom features", included: true },
                { text: "API access", included: true }
            ]
        }
    ];

    return (
        <PublicPage>
            <Container size="xl" py="xl">
                <Stack gap="xl">
                    <Stack gap="xs" ta="center">
                        <Title order={1} size="h2" fw={700} c="var(--mantine-color-primary-5).9">
                            Transparent Pricing
                        </Title>
                        <Text size="lg" c="gray.7" maw={600} mx="auto">
                            Choose the perfect plan for your needs. No hidden fees.
                        </Text>
                    </Stack>

                    <Group justify="center" gap="xl" grow wrap="wrap">
                        {pricingTiers.map((tier) => (
                            <Paper
                                key={tier.title}
                                shadow="sm"
                                radius="lg"
                                p="xl"
                                withBorder
                                style={{
                                    borderColor: tier.highlighted
                                        ? 'var(--mantine-color-primary-5)'
                                        : undefined,
                                    borderWidth: tier.highlighted ? 2 : 1,
                                    maxWidth: rem(400),
                                    position: 'relative',
                                    transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
                                }}
                            >
                                {tier.highlighted && (
                                    <Badge
                                        variant="gradient"
                                        gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
                                        size="lg"
                                        style={{
                                            position: 'absolute',
                                            top: -15,
                                            right: -15,
                                        }}
                                    >
                                        Most Popular
                                    </Badge>
                                )}

                                <Stack gap="md">
                                    <Group gap="xs">
                                        <ThemeIcon
                                            size={44}
                                            radius="md"
                                            variant={tier.highlighted ? "gradient" : "light"}
                                            gradient={tier.highlighted ? { from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' } : undefined}
                                        >
                                            {tier.icon}
                                        </ThemeIcon>
                                        <Stack gap={0}>
                                            <Text fw={700} size="xl">{tier.title}</Text>
                                            <Text size="sm" c="dimmed">{tier.description}</Text>
                                        </Stack>
                                    </Group>

                                    <Group gap="xs" align="flex-end">
                                        <Text size="xl" fw={700} style={{ lineHeight: 1 }}>
                                            {tier.price}
                                        </Text>
                                        <Text size="sm" c="dimmed" mb={5}>
                                            {tier.period}
                                        </Text>
                                    </Group>

                                    <List spacing="sm" size="sm" center>
                                        {tier.features.map((feature, index) => (
                                            <List.Item
                                                key={index}
                                                icon={
                                                    feature.included ? (
                                                        <ThemeIcon
                                                            color="var(--mantine-color-primary-5)"
                                                            size={22}
                                                            radius="xl"
                                                            variant="light"
                                                        >
                                                            <IconCheck size={14} />
                                                        </ThemeIcon>
                                                    ) : (
                                                        <ThemeIcon
                                                            color="gray"
                                                            size={22}
                                                            radius="xl"
                                                            variant="light"
                                                        >
                                                            <IconX size={14} />
                                                        </ThemeIcon>
                                                    )
                                                }
                                                style={{
                                                    color: feature.included
                                                        ? undefined
                                                        : 'var(--mantine-color-gray-6)'
                                                }}
                                            >
                                                {feature.text}
                                            </List.Item>
                                        ))}
                                    </List>

                                    <Button
                                        component="a"
                                        href={tier.ctaLink}
                                        variant={tier.highlighted ? "gradient" : "light"}
                                        gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
                                        size="md"
                                        radius="md"
                                        fullWidth
                                        rightSection={<IconExternalLink size={16} />}
                                    >
                                        {tier.title === "Enterprise" ? "Contact Sales" : "Get Started"}
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Group>

                    <Text c="dimmed" size="sm" ta="center" mt="xl">
                        All prices are in USD. Need help choosing? Contact our sales team.
                    </Text>
                </Stack>
            </Container>
        </PublicPage>
    );
}