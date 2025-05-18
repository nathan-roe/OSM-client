"use client";
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import { DateInput } from '@mantine/dates';
import {Grid, Container, Paper, Text, TextInput, Title, Stack, Button, Box, useMatches, Group, Badge, Tabs, Select, Checkbox, Divider, ThemeIcon, List, Alert} from '@mantine/core';
import {useRouter} from "next/navigation";
import {validateEmailAddress} from "@/common/validationUtils";
import {useCreateDeceasedUser} from "@/query/deceasedUserManagement/useCreateDeceasedUser";
import {useCreationProgress} from "@/context/UserCreationProgressContext";
import {UserCreationProgress} from "@/query/deceasedUserManagement/useUserCreationProgress";
import {usePageLoadIndicator} from "@/context/LoadingContext";
import {IconAt, IconBuilding,
    IconCheck, IconFlag, IconHome, IconInfoCircle, IconMapPin, IconPhone, IconUser, IconUserCheck,
    IconUserShield} from "@tabler/icons-react";


interface UserInfo {
    firstName: string;
    middleName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    zipCode: string;
    dateOfBirth: string;
    relationship: string;
    altPhoneNumber: string;
    contactPreference: string;
    receiveUpdates: boolean;
    streetAddress: string;
    apartmentNumber: string;
    city: string;
    country: string;
    gender: string;
    state: string;
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
    dateOfBirth: "",
    relationship: "",
    altPhoneNumber: "",
    contactPreference: "",
    receiveUpdates: true,
    streetAddress: "",
    apartmentNumber: "",
    city: "",
    country: "",
    gender: "",
    state: "",
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
                                            <Group justify="space-between" align="center">
                                                <Title order={2} c="var(--mantine-color-primary-5).9">Create Profile</Title>
                                                <Badge size="lg" radius="md" color="var(--mantine-color-primary-5)">
                                                    Personal Details
                                                </Badge>
                                            </Group>
                                            
                                            <Tabs defaultValue="personal" variant="outline" radius="md">
                                                <Tabs.List>
                                                    <Tabs.Tab 
                                                        value="personal" 
                                                        leftSection={<IconUser size={16} />}
                                                    >
                                                        Personal
                                                    </Tabs.Tab>
                                                    <Tabs.Tab 
                                                        value="contact" 
                                                        leftSection={<IconPhone size={16} />}
                                                    >
                                                        Contact
                                                    </Tabs.Tab>
                                                    <Tabs.Tab 
                                                        value="address" 
                                                        leftSection={<IconMapPin size={16} />}
                                                    >
                                                        Address
                                                    </Tabs.Tab>
                                                </Tabs.List>
        
                                                <Tabs.Panel value="personal" pt="md">
                                                    <Stack>
                                                        <Grid gutter="md">
                                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                <TextInput
                                                                    label="First Name"
                                                                    placeholder="Enter your first name"
                                                                    leftSection={<IconUser size={16} />}
                                                                    error={formValidationErrors.firstName && "First name is required"}
                                                                    onChange={e => handleFormChange({ firstName: e.target.value })}
                                                                    onBlur={() => handleFormValidation({ firstName: userInfo.firstName })}
                                                                    size="md"
                                                                    required
                                                                />
                                                            </Grid.Col>
                                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                <TextInput
                                                                    label="Middle Name"
                                                                    placeholder="Enter your middle name"
                                                                    leftSection={<IconUser size={16} />}
                                                                    error={formValidationErrors.middleName && "Middle name is required"}
                                                                    onChange={e => handleFormChange({ middleName: e.target.value })}
                                                                    onBlur={() => handleFormValidation({ middleName: userInfo.middleName })}
                                                                    size="md"
                                                                />
                                                            </Grid.Col>
                                                        </Grid>
        
                                                        <TextInput
                                                            label="Last Name"
                                                            placeholder="Enter your last name"
                                                            leftSection={<IconUser size={16} />}
                                                            error={formValidationErrors.lastName && "Last name is required"}
                                                            onChange={e => handleFormChange({ lastName: e.target.value })}
                                                            onBlur={() => handleFormValidation({ lastName: userInfo.lastName })}
                                                            size="md"
                                                            required
                                                        />
        
                                                        <Grid gutter="md">
                                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                <Select
                                                                    label="Gender"
                                                                    placeholder="Select gender"
                                                                    data={[
                                                                        { value: 'male', label: 'Male' },
                                                                        { value: 'female', label: 'Female' },
                                                                        { value: 'other', label: 'Other' },
                                                                        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                                                                    ]}
                                                                    onChange={(value) => handleFormChange({gender: value || undefined })}
                                                                    size="md"
                                                                />
                                                            </Grid.Col>
                                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                <DateInput
                                                                    label="Date of Birth"
                                                                    placeholder="MM/DD/YYYY"
                                                                    valueFormat="MM/DD/YYYY"
                                                                    onChange={(date) => handleFormChange({ dateOfBirth: date || undefined })}
                                                                    size="md"
                                                                />
                                                            </Grid.Col>
                                                        </Grid>
        
                                                        <Select
                                                            label="Relationship to the Deceased"
                                                            placeholder="Select relationship"
                                                            data={[
                                                                { value: 'spouse', label: 'Spouse' },
                                                                { value: 'child', label: 'Child' },
                                                                { value: 'parent', label: 'Parent' },
                                                                { value: 'sibling', label: 'Sibling' },
                                                                { value: 'grandchild', label: 'Grandchild' },
                                                                { value: 'grandparent', label: 'Grandparent' },
                                                                { value: 'friend', label: 'Friend' },
                                                                { value: 'other', label: 'Other' }
                                                            ]}
                                                            onChange={(value) => handleFormChange({ relationship: value || undefined })}
                                                            size="md"
                                                        />
                                                    </Stack>
                                                </Tabs.Panel>
        
                                                <Tabs.Panel value="contact" pt="md">
                                                    <Stack>
                                                        <TextInput
                                                            label="Email Address"
                                                            placeholder="your.email@example.com"
                                                            leftSection={<IconAt size={16} />}
                                                            error={formValidationErrors.emailAddress && "Please enter a valid email address"}
                                                            onChange={e => handleFormChange({ emailAddress: e.target.value })}
                                                            onBlur={() => handleFormValidation({ emailAddress: userInfo.emailAddress })}
                                                            size="md"
                                                            required
                                                        />
        
                                                        <TextInput
                                                            label="Phone Number"
                                                            placeholder="Enter your phone number"
                                                            leftSection={<IconPhone size={16} />}
                                                            error={formValidationErrors.phoneNumber && "Phone number must be at least 6 digits"}
                                                            onChange={e => handleFormChange({ phoneNumber: e.target.value })}
                                                            onBlur={() => handleFormValidation({ phoneNumber: userInfo.phoneNumber })}
                                                            size="md"
                                                            required
                                                        />
        
                                                        <TextInput
                                                            label="Alternative Phone Number"
                                                            placeholder="Enter alternative phone number"
                                                            leftSection={<IconPhone size={16} />}
                                                            onChange={e => handleFormChange({ altPhoneNumber: e.target.value })}
                                                            size="md"
                                                        />
        
                                                        <Select
                                                            label="Preferred Contact Method"
                                                            placeholder="Select preference"
                                                            data={[
                                                                { value: 'email', label: 'Email' },
                                                                { value: 'phone', label: 'Phone' },
                                                                { value: 'text', label: 'Text Message' }
                                                            ]}
                                                            onChange={(value) => handleFormChange({ contactPreference: value || undefined })}
                                                            size="md"
                                                        />
        
                                                        <Checkbox
                                                            label="I would like to receive updates about services and important notifications"
                                                            onChange={(e) => handleFormChange({ receiveUpdates: e.currentTarget.checked })}
                                                            mt="xs"
                                                        />
                                                    </Stack>
                                                </Tabs.Panel>
        
                                                <Tabs.Panel value="address" pt="md">
                                                    <Stack>
                                                        <TextInput
                                                            label="Street Address"
                                                            placeholder="Enter your street address"
                                                            leftSection={<IconHome size={16} />}
                                                            onChange={e => handleFormChange({ streetAddress: e.target.value })}
                                                            size="md"
                                                        />
        
                                                        <TextInput
                                                            label="Apartment/Unit Number"
                                                            placeholder="Enter apartment or unit number (if applicable)"
                                                            leftSection={<IconBuilding size={16} />}
                                                            onChange={e => handleFormChange({ apartmentNumber: e.target.value })}
                                                            size="md"
                                                        />
        
                                                        <Grid gutter="md">
                                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                <TextInput
                                                                    label="City"
                                                                    placeholder="Enter your city"
                                                                    leftSection={<IconMapPin size={16} />}
                                                                    onChange={e => handleFormChange({ city: e.target.value })}
                                                                    size="md"
                                                                />
                                                            </Grid.Col>
                                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                <TextInput
                                                                    label="State/Province"
                                                                    placeholder="Enter your state"
                                                                    leftSection={<IconFlag size={16} />}
                                                                    onChange={e => handleFormChange({ state: e.target.value })}
                                                                    size="md"
                                                                />
                                                            </Grid.Col>
                                                        </Grid>
        
                                                        <Grid gutter="md">
                                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                <TextInput
                                                                    label="Zip Code"
                                                                    placeholder="Enter your zip code"
                                                                    leftSection={<IconMapPin size={16} />}
                                                                    error={formValidationErrors.zipCode && "Zip code must be at least 5 characters"}
                                                                    onChange={e => handleFormChange({ zipCode: e.target.value })}
                                                                    onBlur={() => handleFormValidation({ zipCode: userInfo.zipCode })}
                                                                    size="md"
                                                                    required
                                                                />
                                                            </Grid.Col>
                                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                                <Select
                                                                    label="Country"
                                                                    placeholder="Select country"
                                                                    data={[
                                                                        { value: 'US', label: 'United States' },
                                                                        { value: 'CA', label: 'Canada' },
                                                                        { value: 'UK', label: 'United Kingdom' },
                                                                        { value: 'AU', label: 'Australia' },
                                                                        { value: 'OTHER', label: 'Other' }
                                                                    ]}
                                                                    defaultValue="US"
                                                                    onChange={(value) => handleFormChange({ country: value || undefined })}
                                                                    size="md"
                                                                />
                                                            </Grid.Col>
                                                        </Grid>
                                                    </Stack>
                                                </Tabs.Panel>
                                            </Tabs>
        
                                            <Divider my="sm" />
        
                                            <Alert color="blue" radius="md">
                                                <Group>
                                                    <ThemeIcon color="blue" size="lg" radius="xl" variant="light">
                                                        <IconInfoCircle size={18} />
                                                    </ThemeIcon>
                                                    <Text size="sm" fw={500}>Your information helps us provide personalized service throughout this process.</Text>
                                                </Group>
                                            </Alert>
        
                                            <Button
                                                size="lg"
                                                type="submit"
                                                fullWidth
                                                mt="md"
                                                variant="gradient"
                                                gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
                                                leftSection={<IconUserCheck size={20} />}
                                            >
                                                Create Profile
                                            </Button>
                                        </Stack>
                                    </Paper>
                                </Grid.Col>
        
                                <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
                                    <Stack h="100%" justify="center" align="flex-start" pl={{ md: "xl" }}>
                                        <Title order={1} size="h2" fw={700} c="var(--mantine-color-primary-5).9">
                                            Create Your Profile
                                        </Title>
                                        <Text size="lg" c="gray.7" maw={450} mb="md">
                                            Please fill in your personal information to get started. This information helps us 
                                            provide you with tailored services and support during this difficult time.
                                        </Text>
                                        
                                        <Paper shadow="md" radius="lg" p="lg" withBorder mb="md" w="100%">
                                            <Stack>
                                                <Title order={3} size="h5" fw={600}>Why We Need Your Information</Title>
                                                <List spacing="xs" size="sm" center icon={
                                                    <ThemeIcon color="var(--mantine-color-primary-5)" size={18} radius="xl">
                                                        <IconCheck size={12} />
                                                    </ThemeIcon>
                                                }>
                                                    <List.Item>Verify your identity for secure document handling</List.Item>
                                                    <List.Item>Ensure proper delivery of services and notifications</List.Item>
                                                    <List.Item>Provide personalized support throughout the process</List.Item>
                                                    <List.Item>Maintain compliance with legal and regulatory requirements</List.Item>
                                                </List>
                                            </Stack>
                                        </Paper>
                                        
                                        <Box
                                            h={200}
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
                                            <Stack align="center" gap={0}>
                                                <ThemeIcon size={64} radius={64} color="white" variant="light">
                                                    <IconUserShield size={40} color="var(--mantine-color-primary-6)" />
                                                </ThemeIcon>
                                                <Text c="white" fw={600} mt="md">Your information is secure and protected</Text>
                                            </Stack>
                                        </Box>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </form>
            </Container>
        </AuthenticatedPage>

    );
}

export default CreateProfile;