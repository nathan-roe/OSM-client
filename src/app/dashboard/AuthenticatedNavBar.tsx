import React from 'react';
import {Box, Progress, Stack, Text, ThemeIcon, Timeline, Title} from "@mantine/core";
import {
    IconCircleDashedCheck,
    IconDeviceImacSearch,
    IconFileCertificate, IconId,
    IconUserFilled
} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {useCreationProgress} from "@/context/UserCreationProgressContext";


interface AuthenticatedNavBarProps {

}

const AuthenticatedNavBar: React.FC<AuthenticatedNavBarProps> = () => {
    const router = useRouter();
    const {progress} = useCreationProgress();
    console.log("progress: ", progress)

    return (
        <Stack
            h="100%"
            p="md"
            display={{ base: 'none', md: 'flex' }}
            bg="var(--mantine-color-body)"
            style={{
                borderRight: '1px solid var(--mantine-color-gray-2)',
            }}
        >
            <Stack gap="xs" mb="lg">
                <Title order={4} c="gray.7">Progress</Title>
                <Text size="sm" c="dimmed">Complete these steps to continue</Text>
            </Stack>

            <Timeline
                active={progress}
                bulletSize={28}
                lineWidth={2}
                styles={{
                    root: {
                        paddingTop: 0,
                        paddingBottom: 0
                    },
                    item: {
                        paddingLeft: 'var(--mantine-spacing-xl)',
                    },
                    itemTitle: {
                        fontWeight: 600,
                        fontSize: 'var(--mantine-font-size-sm)',
                        color: 'var(--mantine-color-gray-7)'
                    }
                }}
            >
                <Timeline.Item
                    title="User Info"
                    bullet={
                        <ThemeIcon
                            size={28}
                            radius="xl"
                            variant={progress >= 0 ? "gradient" : "light"}
                            gradient={{ from: 'blue.6', to: 'cyan.5' }}
                            style={{
                                boxShadow: progress >= 0
                                    ? '0 0 12px var(--mantine-color-blue-3)'
                                    : 'none'
                            }}
                        >
                            <IconUserFilled size={14} />
                        </ThemeIcon>
                    }
                >
                    <Text size="xs" c="dimmed" mt={4} mb="lg">
                        Provide account details
                    </Text>
                </Timeline.Item>

                <Timeline.Item
                    title="Death Certificate"
                    bullet={
                        <ThemeIcon
                            size={28}
                            radius="xl"
                            variant={progress >= 1 ? "gradient" : "light"}
                            gradient={{ from: 'blue.6', to: 'cyan.5' }}
                            style={{
                                boxShadow: progress >= 1
                                    ? '0 0 12px var(--mantine-color-blue-3)'
                                    : 'none'
                            }}
                        >
                            <IconFileCertificate size={14} />
                        </ThemeIcon>
                    }
                >
                    <Text size="xs" c="dimmed" mt={4} mb="lg">
                        Upload certificate
                    </Text>
                </Timeline.Item>

                <Timeline.Item
                    title="Identification"
                    bullet={
                        <ThemeIcon
                            size={28}
                            radius="xl"
                            variant={progress >= 2 ? "gradient" : "light"}
                            gradient={{ from: 'blue.6', to: 'cyan.5' }}
                            style={{
                                boxShadow: progress >= 2
                                    ? '0 0 12px var(--mantine-color-blue-3)'
                                    : 'none'
                            }}
                        >
                            <IconId size={14} />
                        </ThemeIcon>
                    }
                >
                    <Text size="xs" c="dimmed" mt={4} mb="lg">
                        Verify identity
                    </Text>
                </Timeline.Item>

                <Timeline.Item
                    title="Services"
                    bullet={
                        <ThemeIcon
                            size={28}
                            radius="xl"
                            variant={progress >= 3 ? "gradient" : "light"}
                            gradient={{ from: 'blue.6', to: 'cyan.5' }}
                            style={{
                                boxShadow: progress >= 3
                                    ? '0 0 12px var(--mantine-color-blue-3)'
                                    : 'none'
                            }}
                        >
                            <IconDeviceImacSearch size={14} />
                        </ThemeIcon>
                    }
                >
                    <Text size="xs" c="dimmed" mt={4} mb="lg">
                        Select services
                    </Text>
                </Timeline.Item>

                <Timeline.Item
                    title="Review"
                    bullet={
                        <ThemeIcon
                            size={28}
                            radius="xl"
                            variant={progress >= 4 ? "gradient" : "light"}
                            gradient={{ from: 'blue.6', to: 'cyan.5' }}
                            style={{
                                boxShadow: progress >= 4
                                    ? '0 0 12px var(--mantine-color-blue-3)'
                                    : 'none'
                            }}
                        >
                            <IconCircleDashedCheck size={14} />
                        </ThemeIcon>
                    }
                >
                    <Text size="xs" c="dimmed" mt={4}>
                        Confirm details
                    </Text>
                </Timeline.Item>
            </Timeline>

            {/* Optional: Progress indicator at the bottom */}
            <Box mt="auto" pt="xl">
                <Text size="sm" c="dimmed" mb={8}>Overall Progress</Text>
                <Progress
                    value={(progress / 4) * 100}
                    size="sm"
                    radius="xl"
                    color="blue.6"
                />
                <Text size="xs" c="dimmed" ta="right" mt={4}>
                    {progress + 1} of 5 steps
                </Text>
            </Box>
        </Stack>
    );
}
export default AuthenticatedNavBar;