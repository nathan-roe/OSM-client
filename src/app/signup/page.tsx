"use client";
import React from 'react';
import PublicPage from "@/app/components/PublicPage";
import {
    Anchor,
    Box,
    Button,
    Container, Divider,
    Grid,
    Group,
    Paper,
    PasswordInput, SimpleGrid,
    Stack,
    Text,
    TextInput, ThemeIcon,
    Title
} from "@mantine/core";
import {IconClockHour4, IconFiles, IconLock, IconShieldLock} from "@tabler/icons-react";
import {validateEmailAddress, validatePassword} from "@/common/validationUtils";
import {useRegisterUser, UserSignUp} from "@/query/userManagement/useRegisterUser";
import Link from "next/link";
import {useRouter} from "next/navigation";



interface UserSignUpValidation {
    firstName: boolean;
    lastName: boolean;
    emailAddress: boolean;
    phoneNumber: boolean;
    password: boolean;
}

const _initialUserSignUpData: UserSignUp = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    password: ""
}

const validateUserSignUpData = (
    userSignUpData: Partial<UserSignUp>
): Partial<UserSignUpValidation> => ({
    ...('firstName' in userSignUpData ? {
        firstName: !userSignUpData.firstName?.length
    } : {}),
    ...('lastName' in userSignUpData ? {
        lastName: !userSignUpData.lastName?.length
    } : {}),
    ...('emailAddress' in userSignUpData ? {
        emailAddress: !validateEmailAddress(userSignUpData.emailAddress ?? "")
    } : {}),
    ...('phoneNumber' in userSignUpData ? {
        phoneNumber: (userSignUpData.phoneNumber?.length ?? 0) < 6
    } : {}),
    ...('password' in userSignUpData ? {
        password: !validatePassword(userSignUpData?.password ?? "")
    } : {})
});

const SignUpPage = () => {
    const router = useRouter();
    const {mutateAsync: registerUser} = useRegisterUser();
    const [formValidationErrors, setFormValidationErrors] = React.useState<Partial<UserSignUpValidation>>({});
    const [userSignUpData, setUserSignUpData] = React.useState<UserSignUp>(_initialUserSignUpData);

    const handleFormChange = React.useCallback((partialSignUpData: Partial<UserSignUp>) => {
        setUserSignUpData(usd => ({
            ...usd,
            ...partialSignUpData
        }));
        const validatedInputFields: Partial<UserSignUpValidation> = {};
        Object.entries(partialSignUpData).map(([key, value]) => {
            if(!validateUserSignUpData({[key]: value})[key as keyof UserSignUpValidation]) {
                validatedInputFields[key as keyof UserSignUpValidation] = false;
            }
        });
        setFormValidationErrors(fve => ({
            ...fve,
            ...validatedInputFields
        }));
    }, []);

    const handleUserSignUpValidation = React.useCallback((partialSignUpData: Partial<UserSignUp>) => {
        setFormValidationErrors(fve => ({
            ...fve,
            ...validateUserSignUpData(partialSignUpData)
        }));
    }, [userSignUpData]);

    const handleSubmit = React.useCallback(() => {
        const userSignUpValidation = validateUserSignUpData(userSignUpData);
        setFormValidationErrors(userSignUpValidation);
        if(Object.values(userSignUpValidation).some(Boolean)) {
            return;
        }
        registerUser(userSignUpData)
            .then(() => router.push("/signin"))
            .catch(console.error);
    }, [userSignUpData]);

    return (
        <PublicPage customActions={<CustomSignUpActions />}>
            <Grid w="100%" h="90vh" style={{ '--grid-col-padding': 0, '--grid-margin': 0 }}>
                <Grid.Col mih="fit-content" h="calc(100vh - 80px)" span={{base: 12, md: 3}}>
                    <Box
                        h="100%"
                        pt={50}
                        px={40}
                        bg="white"
                        style={{
                            boxShadow: '0 0 40px -10px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Stack justify="flex-start" gap="xl">
                            <Stack visibleFrom="lg" gap="md">
                                <Title
                                    order={2}
                                    ta="center"
                                    fw={700}
                                >
                                    Let's sign you in
                                </Title>
                                <Text
                                    visibleFrom="xl"
                                    c="dimmed"
                                    ta="center"
                                    size="sm"
                                >
                                    Create an account and start managing your loved one's online services in just a few minutes
                                </Text>
                            </Stack>

                            <Paper shadow="xs" p="md" radius="md">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}>
                                    <Stack gap="md">
                                        <TextInput
                                            label="First Name"
                                            placeholder="Enter your first name"
                                            id="first-name-input"
                                            error={formValidationErrors.firstName}
                                            onChange={e => handleFormChange({firstName: e.target.value})}
                                            onBlur={() => handleUserSignUpValidation({firstName: userSignUpData.firstName})}
                                            size="md"
                                            styles={{
                                                input: {
                                                    '&:focus': {
                                                        borderColor: 'var(--mantine-color-primary-5)',
                                                        boxShadow: '0 0 0 3px var(--mantine-color-primary-1)',
                                                    },
                                                },
                                            }}
                                        />

                                        <TextInput
                                            label="Last Name"
                                            placeholder="Enter your last name"
                                            id="last-name-input"
                                            error={formValidationErrors.lastName}
                                            onChange={e => handleFormChange({lastName: e.target.value})}
                                            onBlur={() => handleUserSignUpValidation({lastName: userSignUpData.lastName})}
                                            size="md"
                                            styles={{
                                                input: {
                                                    '&:focus': {
                                                        borderColor: 'var(--mantine-color-primary-5)',
                                                        boxShadow: '0 0 0 3px var(--mantine-color-primary-1)',
                                                    },
                                                },
                                            }}
                                        />

                                        <TextInput
                                            label="Email Address"
                                            placeholder="your.email@example.com"
                                            id="email-input"
                                            error={formValidationErrors.emailAddress}
                                            onChange={e => handleFormChange({emailAddress: e.target.value})}
                                            onBlur={() => handleUserSignUpValidation({emailAddress: userSignUpData.emailAddress})}
                                            size="md"
                                            styles={{
                                                input: {
                                                    '&:focus': {
                                                        borderColor: 'var(--mantine-color-primary-5)',
                                                        boxShadow: '0 0 0 3px var(--mantine-color-primary-1)',
                                                    },
                                                },
                                            }}
                                        />

                                        <PasswordInput
                                            label="Password"
                                            placeholder="Create a secure password"
                                            id="password-input"
                                            error={formValidationErrors.password}
                                            onChange={e => handleFormChange({password: e.target.value})}
                                            onBlur={() => handleUserSignUpValidation({password: userSignUpData.password})}
                                            size="md"
                                            styles={{
                                                input: {
                                                    '&:focus': {
                                                        borderColor: 'var(--mantine-color-primary-5)',
                                                        boxShadow: '0 0 0 3px var(--mantine-color-primary-1)',
                                                    },
                                                },
                                            }}
                                        />

                                        <TextInput
                                            label="Phone Number"
                                            placeholder="Enter your phone number"
                                            id="phone-input"
                                            error={formValidationErrors.phoneNumber}
                                            onChange={e => handleFormChange({phoneNumber: e.target.value})}
                                            onBlur={() => handleUserSignUpValidation({phoneNumber: userSignUpData.phoneNumber})}
                                            size="md"
                                            styles={{
                                                input: {
                                                    '&:focus': {
                                                        borderColor: 'var(--mantine-color-primary-5)',
                                                        boxShadow: '0 0 0 3px var(--mantine-color-primary-1)',
                                                    },
                                                },
                                            }}
                                        />

                                        <Text size="xs" c="dimmed">
                                            To protect your account, we'll send a code to verify it's you.
                                            Standard call or SMS rates may apply.
                                        </Text>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            size="md"
                                            variant="gradient"
                                            gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-primary-6)' }}
                                            leftSection={<IconLock size={18} />}
                                            styles={{
                                                root: {
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                }
                                            }}
                                        >
                                            Create account
                                        </Button>

                                        <Text size="xs" c="dimmed" ta="center">
                                            By selecting Create account, you agree to our{' '}
                                            <Anchor component={Link} href="/" size="xs">
                                                Terms
                                            </Anchor>{' '}
                                            and acknowledge our{' '}
                                            <Anchor component={Link} href="/" size="xs">
                                                Privacy Statement
                                            </Anchor>.
                                        </Text>
                                    </Stack>
                                </form>
                            </Paper>
                        </Stack>
                    </Box>
                </Grid.Col>

                <Grid.Col mih="fit-content" h="calc(100vh - 80px)" visibleFrom="md" span={{base: 0, md: 9}}>
                    <Stack
                        h="100%"
                        justify="flex-start"
                        align="center"
                        pt={50}
                        gap="xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--mantine-color-primary-0) 0%, var(--mantine-color-primary-0) 100%)',
                        }}
                    >
                        <Title
                            order={1}
                            fw={800}
                            ta="center"
                            size={40}
                        >
                            Account management<br/>in one place
                        </Title>
                        <Text
                            c="dimmed"
                            size="xl"
                            maw={600}
                            ta="center"
                            fw={500}
                        >
                            Get started removing, archiving, and tracking online services
                            for your loved ones.
                        </Text>

                        <SimpleGrid cols={3} spacing="xl" mt={50} px={50}>
                            {[
                                {
                                    icon: IconShieldLock,
                                    title: "Secure & Private",
                                    description: "Bank-level encryption and security measures to protect sensitive information"
                                },
                                {
                                    icon: IconClockHour4,
                                    title: "Time-Saving",
                                    description: "Streamlined process that handles multiple accounts simultaneously"
                                },
                                {
                                    icon: IconFiles,
                                    title: "Document Management",
                                    description: "Centralized storage for all important documents and certificates"
                                }
                            ].map((feature, index) => (
                                <Paper
                                    key={index}
                                    p="xl"
                                    radius="md"
                                    shadow="sm"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(12px)',
                                    }}
                                >
                                    <Stack align="center" gap="sm">
                                        <ThemeIcon
                                            size={56}
                                            radius="md"
                                            variant="gradient"
                                            gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-primary-6)' }}
                                        >
                                            <feature.icon size={28} />
                                        </ThemeIcon>
                                        <Text size="lg" fw={600} ta="center">
                                            {feature.title}
                                        </Text>
                                        <Text size="sm" c="dimmed" ta="center">
                                            {feature.description}
                                        </Text>
                                    </Stack>
                                </Paper>
                            ))}
                        </SimpleGrid>

                        <Group mt={50} gap="xl">
                            <Stack align="center" gap={4}>
                                <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-primary-6)' }}>
                                    100+
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Supported Services
                                </Text>
                            </Stack>
                            <Divider orientation="vertical" />
                            <Stack align="center" gap={4}>
                                <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-primary-6)' }}>
                                    24/7
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Customer Support
                                </Text>
                            </Stack>
                            <Divider orientation="vertical" />
                            <Stack align="center" gap={4}>
                                <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-primary-6)' }}>
                                    5k+
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Satisfied Users
                                </Text>
                            </Stack>
                        </Group>
                    </Stack>
                </Grid.Col>
            </Grid>
        </PublicPage>
    );
}

const CustomSignUpActions = () => {
    const router = useRouter();

    return (
        <Group align="center" w="fit-content">
            <Stack visibleFrom="md">
                <Text size="xs">
                    Already have an account?<br/>
                    <Box c="var(--mantine-color-primary-5)" variant="link" component={Link} href="/">
                        I forgot my password
                    </Box>
                </Text>
            </Stack>
            <Button variant="contained" onClick={() => {
                router.push("/signin")
            }}>Sign in</Button>
        </Group>
    );
}

export default SignUpPage;