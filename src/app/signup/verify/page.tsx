// EmailConfirmationPage.tsx
"use client";
import PublicPage from '@/app/components/PublicPage';
import { Container, Title, Text, Stack, PinInput, Button } from '@mantine/core';
import { IconMailCheck } from '@tabler/icons-react';

const EmailConfirmationPage = () => {
    const handleVerification = (code: string) => {
        // Handle verification logic here
        console.log('Verification code:', code);
    };

    return (
        <PublicPage>
            <Container size="sm" h="100%" style={{ position: 'relative', zIndex: 1 }}>
                <Stack
                    justify="center"
                    align="center"
                    h="100%"
                    gap="xl"
                    style={{ textAlign: 'center' }}
                >
                    <IconMailCheck size={64} color="var(--mantine-color-primary-6)" />
                    <Title order={1} c="var(--mantine-color-primary-5).9">
                        Check Your Email
                    </Title>
                    <Text size="lg" c="gray.7">
                        We've sent a verification code to your email. Please enter it below to confirm your account.
                    </Text>

                    <Stack align="center" gap="md">
                        <PinInput
                            length={6}
                            size="lg"
                            type="number"
                            placeholder="○"
                            onChange={handleVerification}
                            aria-label="Verification code input"
                        />
                        <Text size="sm" c="dimmed">
                            Didn't receive the code? <Button variant="subtle" size="sm">Resend</Button>
                        </Text>
                    </Stack>

                    <Button
                        size="lg"
                        radius="md"
                        style={{ marginTop: '1rem' }}
                    >
                        Verify Email
                    </Button>
                </Stack>
            </Container>
        </PublicPage>
    );
}

export default EmailConfirmationPage;