"use client";
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {
    Container,
    Title,
    Text,
    Stack,
    Paper,
    Button,
    Group,
    List,
    ThemeIcon,
    Badge,
    rem
} from '@mantine/core';
import { useRouter } from "next/navigation";
import {
    IconCheck,
    IconX,
    IconCrown,
    IconUserPlus,
    IconRefresh
} from '@tabler/icons-react';

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
}

const PricingPage: React.FC = () => {
    const router = useRouter();
    const [selectedTier, setSelectedTier] = React.useState<string | null>(null);

    const pricingTiers: PricingTier[] = [
        {
            title: "Basic",
            description: "Essential features for individuals",
            price: "Free",
            period: "forever",
            icon: <IconUserPlus size={24} />,
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

    const handlePlanSelection = (tierTitle: string) => {
        setSelectedTier(tierTitle);
    };

    const handleContinue = () => {
        // Mock navigation to the next page
        console.log(`Selected plan: ${selectedTier}`);
        router.push('/user-information');
    };

    return (
        <AuthenticatedPage>
            <Container size="xl" py="xl">
                <Stack gap="xl">
                    <Stack gap="xs" ta="center">
                        <Title order={1} size="h2" fw={700} c="blue.9">
                            Choose Your Plan
                        </Title>
                        <Text size="lg" c="gray.7" maw={600} mx="auto">
                            Select the plan that best fits your needs. All plans include our core features.
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
                                        ? 'var(--mantine-color-blue-5)'
                                        : undefined,
                                    borderWidth: tier.highlighted ? 2 : 1,
                                    maxWidth: rem(400),
                                    position: 'relative',
                                    transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                {tier.highlighted && (
                                    <Badge
                                        variant="gradient"
                                        gradient={{ from: 'blue', to: 'cyan' }}
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
                                            gradient={tier.highlighted ? { from: 'blue', to: 'cyan' } : undefined}
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

                                    <List
                                        spacing="sm"
                                        size="sm"
                                        center
                                        icon={
                                            <ThemeIcon
                                                color="blue"
                                                size={22}
                                                radius="xl"
                                                variant="light"
                                            >
                                                <IconCheck size={14} />
                                            </ThemeIcon>
                                        }
                                    >
                                        {tier.features.map((feature, index) => (
                                            <List.Item
                                                key={index}
                                                icon={
                                                    feature.included ? (
                                                        <ThemeIcon
                                                            color="blue"
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
                                        variant={selectedTier === tier.title ? "gradient" : "light"}
                                        gradient={{ from: 'blue', to: 'cyan' }}
                                        size="md"
                                        radius="md"
                                        fullWidth
                                        onClick={() => handlePlanSelection(tier.title)}
                                    >
                                        {selectedTier === tier.title ? 'Selected' : 'Select Plan'}
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Group>

                    {selectedTier && (
                        <Group justify="center" pt="xl">
                            <Button
                                size="lg"
                                radius="xl"
                                variant="gradient"
                                gradient={{ from: 'blue', to: 'cyan' }}
                                onClick={handleContinue}
                                styles={{
                                    root: {
                                        padding: '0 45px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                    }
                                }}
                            >
                                Continue with {selectedTier} Plan
                            </Button>
                        </Group>
                    )}
                </Stack>
            </Container>
        </AuthenticatedPage>
    );
};

export default PricingPage;