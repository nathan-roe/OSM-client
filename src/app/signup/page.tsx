"use client";
import React from 'react';
import PublicPage from "@/app/components/PublicPage";
import {Box, Button, Container, Grid, Group, PasswordInput, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconLock} from "@tabler/icons-react";
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
            <Grid w="100%" h="90vh" style={{
                '--grid-col-padding': 0,
                '--grid-margin': 0
            }}>
                <Grid.Col mih="fit-content" h="calc(100vh - 80px)" span={{base: 12, md: 3}}>
                    <Group h="100%" gap={0} pt={50} align="flex-start" justify="center" px={30} bg="white">
                        <Stack justify="flex-start">
                            <Stack visibleFrom="lg">
                                <Text size="xl" style={{
                                    textAlign: 'center'
                                }}>Let's sign you in</Text>
                                <Text visibleFrom="xl" style={{
                                    textAlign: 'center'
                                }}>Create an account and start managing your loved one's online services in just a few minutes</Text>
                            </Stack>
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSubmit();
                            }}>
                                <Text component="label" size="sm" htmlFor="first-name-input">
                                    First Name
                                </Text>
                                <TextInput
                                    mb={15}
                                    id="first-name-input"
                                    error={formValidationErrors.firstName}
                                    onChange={e => {
                                        handleFormChange({firstName: e.target.value});
                                    }}
                                    onBlur={() => handleUserSignUpValidation({
                                        firstName: userSignUpData.firstName
                                    })}
                                />
                                <Text component="label" size="sm" htmlFor="last-name-input">
                                    Last Name
                                </Text>
                                <TextInput
                                    mb={15}
                                    id="last-name-input"
                                    error={formValidationErrors.lastName}
                                    onChange={e => {
                                        handleFormChange({lastName: e.target.value});
                                    }}
                                    onBlur={() => handleUserSignUpValidation({
                                        lastName: userSignUpData.lastName
                                    })}
                                />
                                <Text component="label" size="sm" htmlFor="email-input">
                                    Email Address
                                </Text>
                                <TextInput
                                    mb={15}
                                    id="email-input"
                                    error={formValidationErrors.emailAddress}
                                    onChange={e =>
                                        handleFormChange({emailAddress: e.target.value})
                                    }
                                    onBlur={() => handleUserSignUpValidation({
                                        emailAddress: userSignUpData.emailAddress
                                    })}
                                />
                                <Text component="label" size="sm" htmlFor="password-input">
                                    Password
                                </Text>
                                <PasswordInput
                                    mb={15}
                                    id="password-input"
                                    error={formValidationErrors.password}
                                    onChange={e =>
                                        handleFormChange({password: e.target.value})
                                    }
                                    onBlur={() => handleUserSignUpValidation({
                                        password: userSignUpData.password
                                    })}
                                />
                                <Text component="label" size="sm" htmlFor="phone-input">
                                    Phone Number
                                </Text>
                                <TextInput
                                    id="phone-input"
                                    error={formValidationErrors.phoneNumber}
                                    onChange={e =>
                                        handleFormChange({phoneNumber: e.target.value})
                                    }
                                    onBlur={() => handleUserSignUpValidation({
                                        phoneNumber: userSignUpData.phoneNumber
                                    })}
                                />
                                <Text size="xs" mb={15} c="dimmed">
                                    To protect your account, we'll send a code to verify it's you.
                                    Standard call or SMS rates may apply.
                                </Text>
                                <Button type="submit" w="100%" mb={15}>
                                    <IconLock />
                                    <Text fw={600} mt={5} ml={5}>
                                        Create account
                                    </Text>
                                </Button>
                                <Text size="xs" c="dimmed" style={{
                                    textAlign: 'center'
                                }}>By selecting Create account, you agree to our&nbsp;
                                    <Box c="blue" variant="link" component={Link} href="/">
                                        Terms
                                    </Box>&nbsp;and acknowledge our&nbsp;
                                    <Box c="blue" variant="link" component={Link} href="/">
                                        Privacy Statement
                                    </Box>
                                    .</Text>
                            </form>
                        </Stack>
                    </Group>
                </Grid.Col>
                <Grid.Col mih="fit-content" h="calc(100vh - 80px)" visibleFrom="md" span={{base: 0, md: 9}}>
                    <Container size="sm" mt={50}>
                        <Title c="text.9" fw={500} size={40} style={{textAlign: 'center'}}>
                            Account management<br/>in one place
                        </Title>
                        <Title c="text.9" mt={10} fw={500} size={25} style={{textAlign: 'center'}}>
                            Get started removing, archiving, and tracking online services
                            for your loved ones.
                        </Title>
                    </Container>
                    <Group justify="center">

                    </Group>
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
                    <Box c="blue" variant="link" component={Link} href="/">
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