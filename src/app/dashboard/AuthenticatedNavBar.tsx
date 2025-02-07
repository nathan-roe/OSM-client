import React from 'react';
import {Stack, Text, Timeline} from "@mantine/core";
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
        <Stack pt={50} px={10} display={{sm: 'none', md: 'flex'}}>
            <Timeline active={progress} lineWidth={2} bulletSize={24}>
                <Timeline.Item
                    title="User Info"
                    bullet={
                        <IconUserFilled size={15} />
                    }
                >
                    <Text c="dimmed" size="xs">
                        Provide information for the deceased user's account
                    </Text>
                </Timeline.Item>
                <Timeline.Item
                    title="Certificate"
                    bullet={
                        <IconFileCertificate size={15} />
                    }
                >
                    <Text c="dimmed" size="xs">
                        Upload the deceased user's death certificate
                    </Text>
                </Timeline.Item>
                <Timeline.Item
                    title="Identification"
                    bullet={
                        <IconId size={15} />
                    }
                >
                    <Text c="dimmed" size="xs">
                        Upload identification for the deceased user
                    </Text>
                </Timeline.Item>
                <Timeline.Item
                    title="Services"
                    bullet={
                        <IconDeviceImacSearch size={15} />
                    }
                >
                    <Text c="dimmed" size="xs">
                        Search and select services to remove
                    </Text>
                </Timeline.Item>
                <Timeline.Item
                    title="Confirmation"
                    bullet={
                        <IconCircleDashedCheck size={15} />
                    }
                >
                    <Text c="dimmed" size="xs">
                        Confirm the deceased user's information
                    </Text>
                </Timeline.Item>
            </Timeline>
        </Stack>
    );
}
export default AuthenticatedNavBar;