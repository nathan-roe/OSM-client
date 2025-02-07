import React from 'react';
import {Box, Button, Card, Checkbox, Group, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconLock} from "@tabler/icons-react";
import {validateEmailAddress} from "@/common/validationUtils";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface SignInCardProps {
    autoFocus?: boolean;
}

const SignInCard: React.FC<SignInCardProps> = ({autoFocus}) => {
    const router = useRouter();
    const [rememberMe, setRememberMe] = React.useState(true);
    const [emailValid, setEmailValid] = React.useState(true);
    const [emailAddress, setEmailAddress] = React.useState("");
    const handleSignIn = React.useCallback(() => {
        if (validateEmailAddress(emailAddress)) {
            sessionStorage.setItem("emailAddress", emailAddress);
            router.push("/signin/verify");
        } else {
            setEmailValid(false);
        }
    }, [emailAddress, rememberMe]);

    return (
        <Card w="100%" radius="md" withBorder px={50}>
            <Card.Section pt={30} pb={10} withBorder>
                <Stack align="center">
                    <Title size={25} c="primary">Digital Remains</Title>
                    <Title size={20}>Let's get you signed in</Title>

                </Stack>
            </Card.Section>
            <Card.Section pt={20} pb={40} withBorder>
                <form onSubmit={e => {
                    e.preventDefault();
                    handleSignIn();
                }}>
                    <Stack align="center">
                        <TextInput
                            w="100%"
                            autoFocus={autoFocus}
                            error={!emailValid && "Please ensure the email you entered is valid"}
                            description="Phone number or email address"
                            onChange={(e) => {
                                const updatedEmail = e.target.value;
                                setEmailAddress(updatedEmail);
                                if (validateEmailAddress(updatedEmail) && !emailValid) {
                                    setEmailValid(true);
                                }
                            }}
                            onBlur={() => {
                                setEmailValid(validateEmailAddress(emailAddress));
                            }}
                        />
                        <Group w="100%">
                            <Checkbox label="Remember me" checked={rememberMe} onChange={() => {
                                setRememberMe(rm => !rm);
                            }}/>
                        </Group>
                        <Button w="100%" pr={50} type="submit">
                            <IconLock/>
                            <Text fw={600} mt={5} ml={5}>Sign in</Text>
                        </Button>
                        <Text size="xs" c="dimmed" style={{
                            textAlign: 'center'
                        }}>By selecting Sign In, you agree to our&nbsp;
                            <Box c="blue" variant="link" component={Link} href="/">
                                Terms
                            </Box>&nbsp;and acknowledge our&nbsp;
                            <Box c="blue" variant="link" component={Link} href="/">
                                Privacy Statement
                            </Box>
                            .</Text>
                        <Text size="sm" style={{display: 'inline-block'}}>
                            Not already a user?&nbsp;
                            <Box c="blue" variant="link" component={Link} href="/signup">
                                Create an account
                            </Box>
                        </Text>
                    </Stack>
                </form>
            </Card.Section>
        </Card>
    )
        ;
}

export default SignInCard;