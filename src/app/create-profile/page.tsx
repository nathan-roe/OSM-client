"use client";
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {Grid, Container, Paper, Text, TextInput, Title, Stack, Button, Box, useMatches} from '@mantine/core';
import {useRouter} from "next/navigation";
import {validateEmailAddress} from "@/common/validationUtils";
import {useCreateDeceasedUser} from "@/query/deceasedUserManagement/useCreateDeceasedUser";
import {useCreationProgress} from "@/context/UserCreationProgressContext";
import {UserCreationProgress} from "@/query/deceasedUserManagement/useUserCreationProgress";
import {usePageLoadIndicator} from "@/context/LoadingContext";
import {IconAt, IconMapPin, IconPhone, IconUser} from "@tabler/icons-react";


interface UserInfo {
    firstName: string;
    middleName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    zipCode: string;
}

interface FormValidation {
    firstName: boolean;
    middleName: boolean;
    lastName: boolean;
    emailAddress: boolean;
    phoneNumber: boolean;
    zipCode: boolean;
}

const _initialUserInfo: UserInfo = {
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    zipCode: "",
}

const validateUserInfo = (
    userData: Partial<UserInfo>
): Partial<FormValidation> => ({
    ...('firstName' in userData ? {
        firstName: !userData.firstName?.length
    } : {}),
    ...('middleName' in userData ? {
        middleName: !userData.middleName?.length
    } : {}),
    ...('lastName' in userData ? {
        lastName: !userData.lastName?.length
    } : {}),
    ...('emailAddress' in userData ? {
        emailAddress: !validateEmailAddress(userData.emailAddress ?? "")
    } : {}),
    ...('phoneNumber' in userData ? {
        phoneNumber: (userData.phoneNumber?.length ?? 0) < 6
    } : {}),
    ...('zipCode' in userData ? {
        zipCode: (userData.zipCode?.length ?? 0) < 6
    } : {})
});

interface CreateProfileProps {

}

const CreateProfile: React.FC<CreateProfileProps> = () => {
    const router = useRouter();
    const formAlignment = useMatches({
        base: 'center',
        md: 'flex-start',
        lg: 'flex-start',
        xl: 'flex-start'
    })

    const {setProgress} = useCreationProgress();
    const {setLoading} = usePageLoadIndicator();

    const {mutateAsync: createServiceOwner} = useCreateDeceasedUser();

    const [formValidationErrors, setFormValidationErrors] = React.useState<Partial<FormValidation>>({});
    const [userInfo, setUserInfo] = React.useState<UserInfo>(_initialUserInfo);

    const handleFormValidation = React.useCallback((info: Partial<UserInfo>) => {
        setFormValidationErrors(fve => ({
            ...fve,
            ...validateUserInfo(info)
        }));
    }, []);

    const handleFormChange = React.useCallback((partialUserInfo: Partial<UserInfo>) => {
        setUserInfo(ui => ({
            ...ui,
            ...partialUserInfo
        }));
        const validatedInputFields: Partial<FormValidation> = {};
        Object.entries(partialUserInfo).map(([key, value]) => {
            if (!validateUserInfo({[key]: value})[key as keyof FormValidation]) {
                validatedInputFields[key as keyof FormValidation] = false;
            }
        });
        setFormValidationErrors(fve => ({
            ...fve,
            ...validatedInputFields
        }));
    }, []);

    const handleSubmit = React.useCallback(() => {
        const userSignUpValidation = validateUserInfo(userInfo);
        setFormValidationErrors(userSignUpValidation);
        if (Object.values(userSignUpValidation).some(Boolean)) {
            return;
        }
        createServiceOwner(userInfo).then(res => {
            sessionStorage.setItem("serviceOwnerId", res.id);
            setProgress(UserCreationProgress.USER_INFO);
            setLoading(false);
            router.push("/create-profile/certificate");
        }).catch(console.error)
        console.log("formData: ", userInfo)
    }, [userInfo]);

    return (
        <AuthenticatedPage>
            <Container size="xl" py="xl">
                <form onSubmit={e => {
                    e.preventDefault();
                    setLoading(true);
                    handleSubmit();
                }}>
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
                            <Paper shadow="md" radius="lg" p="xl" withBorder>
                                <Stack>
                                    <Title order={2} c="blue.9">Create Profile</Title>

                                    <Stack>
                                        <TextInput
                                            label="First Name"
                                            placeholder="Enter your first name"
                                            leftSection={<IconUser size={16} />}
                                            error={formValidationErrors.firstName && "First name is required"}
                                            onChange={e => handleFormChange({ firstName: e.target.value })}
                                            onBlur={() => handleFormValidation({ firstName: userInfo.firstName })}
                                            size="md"
                                        />

                                        <TextInput
                                            label="Middle Name"
                                            placeholder="Enter your middle name"
                                            leftSection={<IconUser size={16} />}
                                            error={formValidationErrors.middleName && "Middle name is required"}
                                            onChange={e => handleFormChange({ middleName: e.target.value })}
                                            onBlur={() => handleFormValidation({ middleName: userInfo.middleName })}
                                            size="md"
                                        />

                                        <TextInput
                                            label="Last Name"
                                            placeholder="Enter your last name"
                                            leftSection={<IconUser size={16} />}
                                            error={formValidationErrors.lastName && "Last name is required"}
                                            onChange={e => handleFormChange({ lastName: e.target.value })}
                                            onBlur={() => handleFormValidation({ lastName: userInfo.lastName })}
                                            size="md"
                                        />

                                        <TextInput
                                            label="Email Address"
                                            placeholder="your.email@example.com"
                                            leftSection={<IconAt size={16} />}
                                            error={formValidationErrors.emailAddress && "Please enter a valid email address"}
                                            onChange={e => handleFormChange({ emailAddress: e.target.value })}
                                            onBlur={() => handleFormValidation({ emailAddress: userInfo.emailAddress })}
                                            size="md"
                                        />

                                        <TextInput
                                            label="Phone Number"
                                            placeholder="Enter your phone number"
                                            leftSection={<IconPhone size={16} />}
                                            error={formValidationErrors.phoneNumber && "Phone number must be at least 6 digits"}
                                            onChange={e => handleFormChange({ phoneNumber: e.target.value })}
                                            onBlur={() => handleFormValidation({ phoneNumber: userInfo.phoneNumber })}
                                            size="md"
                                        />

                                        <TextInput
                                            label="Zip Code"
                                            placeholder="Enter your zip code"
                                            leftSection={<IconMapPin size={16} />}
                                            error={formValidationErrors.zipCode && "Zip code must be at least 6 characters"}
                                            onChange={e => handleFormChange({ zipCode: e.target.value })}
                                            onBlur={() => handleFormValidation({ zipCode: userInfo.zipCode })}
                                            size="md"
                                        />
                                    </Stack>

                                    <Button
                                        size="lg"
                                        type="submit"
                                        fullWidth
                                        mt="md"
                                        variant="gradient"
                                        gradient={{ from: 'blue', to: 'cyan' }}
                                    >
                                        Continue
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }} visibleFrom="md">
                            <Stack h="100%" justify="center" align="flex-start" pl="xl">
                                <Title order={1} size="h2" fw={700} c="blue.9">
                                    Welcome to Profile Creation
                                </Title>
                                <Text size="lg" c="gray.7" maw={450}>
                                    Please fill in your personal information to get started. All fields are required to ensure
                                    we can provide you with the best service.
                                </Text>
                                <Box
                                    h={300}
                                    w="100%"
                                    style={{
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-5))',
                                        opacity: 0.8
                                    }}
                                />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </form>
            </Container>
        </AuthenticatedPage>

    );
}

export default CreateProfile;