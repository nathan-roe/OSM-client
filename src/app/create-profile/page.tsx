"use client";
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {Grid, Card, Divider, Text, TextInput, Title, Stack, Group, Button, Box, useMatches} from '@mantine/core';
import {useRouter} from "next/navigation";
import {validateEmailAddress} from "@/common/validationUtils";
import {useCreateDeceasedUser} from "@/query/deceasedUserManagement/useCreateDeceasedUser";
import {useCreationProgress} from "@/context/UserCreationProgressContext";
import {UserCreationProgress} from "@/query/deceasedUserManagement/useUserCreationProgress";
import {usePageLoadIndicator} from "@/context/LoadingContext";


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
            <Stack pl={{sm: 0, md: 200}} pt={{sm: 20, md: 50}} h="calc(100vh - 200px)" w="100vw" justify="center" align="center">
                <form style={{
                    width: '100%',
                    height: '100%',
                }} onSubmit={e => {
                    e.preventDefault();
                    setLoading(true);
                    handleSubmit();
                }}>
                    <Grid>
                        <Grid.Col span={6} visibleFrom="md">
                            <Stack w="100%" align="flex-end">
                                <Title size={25}>Lorem Ipsum lorem ipsum</Title>
                                <Text size="md">
                                    Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                                </Text>
                                <Box h={400} w='30vw' bg="lightgrey" style={{
                                    borderRadius: 5
                                }}/>
                            </Stack>
                        </Grid.Col>
                        {/*<Divider visibleFrom="md" orientation="vertical" w='10px'/>*/}
                        <Grid.Col span={{sm: 12, md: 6}}>
                            <Stack align={formAlignment}>
                                <Card
                                    shadow="lg"
                                    padding="xl"
                                    radius="md"
                                    withBorder
                                    maw="90vw"
                                    w={500}
                                >
                                    <Stack w="100%" pos="relative">
                                        <Text component="label" mb={-15} size="sm" htmlFor="first-name-input">
                                            First Name
                                        </Text>
                                        <TextInput
                                            mb={5}
                                            id="first-name-input"
                                            error={formValidationErrors.firstName}
                                            onChange={e => {
                                                handleFormChange({firstName: e.target.value});
                                            }}
                                            onBlur={() => handleFormValidation({
                                                firstName: userInfo.firstName
                                            })}
                                        />
                                        <Text component="label" mb={-15} size="sm" htmlFor="middle-name-input">
                                            Middle Name
                                        </Text>
                                        <TextInput
                                            mb={5}
                                            id="middle-name-input"
                                            error={formValidationErrors.middleName}
                                            onChange={e => {
                                                handleFormChange({middleName: e.target.value});
                                            }}
                                            onBlur={() => handleFormValidation({
                                                middleName: userInfo.middleName
                                            })}
                                        />
                                        <Text component="label" mb={-15} size="sm" htmlFor="last-name-input">
                                            Last Name
                                        </Text>
                                        <TextInput
                                            mb={5}
                                            id="last-name-input"
                                            error={formValidationErrors.lastName}
                                            onChange={e => {
                                                handleFormChange({lastName: e.target.value});
                                            }}
                                            onBlur={() => handleFormValidation({
                                                lastName: userInfo.lastName
                                            })}
                                        />
                                        <Text component="label" mb={-15} size="sm" htmlFor="email-address-input">
                                            Email Address
                                        </Text>
                                        <TextInput
                                            mb={5}
                                            id="email-address-input"
                                            error={formValidationErrors.emailAddress}
                                            onChange={e => {
                                                handleFormChange({emailAddress: e.target.value});
                                            }}
                                            onBlur={() => handleFormValidation({
                                                emailAddress: userInfo.emailAddress
                                            })}
                                        />
                                        <Text component="label" mb={-15} size="sm" htmlFor="phone-number-input">
                                            Phone Number
                                        </Text>
                                        <TextInput
                                            mb={5}
                                            id="phone-number-input"
                                            error={formValidationErrors.phoneNumber}
                                            onChange={e => {
                                                handleFormChange({phoneNumber: e.target.value});
                                            }}
                                            onBlur={() => handleFormValidation({
                                                phoneNumber: userInfo.phoneNumber
                                            })}
                                        />
                                        <Text component="label" mb={-15} size="sm" htmlFor="zip-code-input">
                                            Zip Code
                                        </Text>
                                        <TextInput
                                            mb={5}
                                            id="zip-code-input"
                                            error={formValidationErrors.zipCode}
                                            onChange={e => {
                                                handleFormChange({zipCode: e.target.value});
                                            }}
                                            onBlur={() => handleFormValidation({
                                                zipCode: userInfo.zipCode
                                            })}
                                        />
                                    </Stack>
                                </Card>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                    <Button size="md" type="submit" bottom={50} right={{base: 20, md: 50}} style={{
                        position: 'absolute'
                    }}>
                        Continue
                    </Button>
                </form>
            </Stack>
        </AuthenticatedPage>
    );
}

export default CreateProfile;