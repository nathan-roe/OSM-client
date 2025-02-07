"use client";
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {Title, Text, Button, Divider, Box, Stack} from '@mantine/core';
import {useRouter} from "next/navigation";


interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = () => {
    const router = useRouter();
    return (
        <AuthenticatedPage>
            <Stack align="center" w="100%" maw="90vw" mt={25}>
                <Box h={150} w={250} maw="90vw" bg="lightgrey" style={{
                    borderRadius: 5
                }}/>
                <Title ta="center" variant="h6" fw="normal">Lorem ipsum lorem ipsum</Title>
                <Text visibleFrom="md" size="lg" c="dimmed">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Text>
                <Button onClick={() => router.push("/create-profile")} w={400} maw="90vw" mt={50}>Start a profile for ...</Button>
                <Divider w={400} maw="90vw" mt={25} label="OR" labelPosition="center" />
                <Button w={400} maw="90vw" mt={25}>Start a profile for yourself</Button>
            </Stack>
        </AuthenticatedPage>
    );
}

export default Dashboard;