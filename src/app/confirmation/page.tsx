"use client";
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {ActionIcon, TextInput, Divider, Stack, Title, Text, Affix, Button, Card, Group, Box, Grid} from "@mantine/core";
import {IconEdit} from "@tabler/icons-react";

interface OrderConfirmationProps {

}

const OrderConfirmation: React.FC<OrderConfirmationProps> = () => {

    return (
        <AuthenticatedPage>
            <Stack w="90vw" pl={{sm: 0, md: 200}}>
                <Title>Confirm Your Selections</Title>
                <Text>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Text>
            <Grid w="100%">
                <Grid.Col span={{sm: 12, md: 6}}>
                    <Stack h="65vh" align="flex-start" justify="space-between" >
                        <Card w="100%" mih="fit-content">
                            <Group justify="space-between" align="center">
                                <Text>User Information</Text>
                                <ActionIcon>
                                    <IconEdit/>
                                </ActionIcon>
                            </Group>
                            <Divider mt={10} mb={20}/>
                            <Grid>
                                <Grid.Col span={4}>
                                    <TextInput disabled value="first"/>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput disabled value="middle"/>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput disabled value="last"/>
                                </Grid.Col>
                            </Grid>
                            <Grid mt={10}>
                                <Grid.Col span={4}>
                                    <TextInput disabled value="email"/>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput disabled value="phone"/>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput disabled value="zip"/>
                                </Grid.Col>
                            </Grid>
                        </Card>
                        <Card w="100%">
                            <Group justify="space-between" align="center">
                                <Text>Death Certificate</Text>
                                <ActionIcon>
                                    <IconEdit/>
                                </ActionIcon>
                            </Group>
                            <Divider mt={10} mb={20}/>
                            <Box h={100} w="100%" bg="lightgrey" style={{
                                borderRadius: 5
                            }}/>
                        </Card>
                        <Card w="100%">
                            <Group justify="space-between" align="center">
                                <Text>Driver's License or Government ID</Text>
                                <ActionIcon>
                                    <IconEdit/>
                                </ActionIcon>
                            </Group>
                            <Divider mt={10} mb={20}/>
                            <Box h={100} w="100%" bg="lightgrey" style={{
                                borderRadius: 5
                            }}/>
                        </Card>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{sm: 12, md: 6}}>
                    <Card w="100%" h="65vh">
                        <Group justify="space-between" align="center">
                            <Text>Selected Services</Text>
                            <ActionIcon>
                                <IconEdit/>
                            </ActionIcon>
                        </Group>
                        <Divider mt={10} mb={20}/>
                        <Group justify="center" w="100%" style={{overflowY: 'auto'}}>
                            {Array.from(new Array(10)).map(() => (
                                <Card withBorder shadow="sm" w={200} h={200}>

                                </Card>
                            ))}
                        </Group>
                    </Card>
                </Grid.Col>
            </Grid>
            </Stack>
            <Affix bottom={50} right={{base: 20, md: 50}}>
                <Button size="md">
                    Checkout
                </Button>
            </Affix>
        </AuthenticatedPage>
    );
}

export default OrderConfirmation;