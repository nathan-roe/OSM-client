"use client";
import React from 'react';
import {Avatar, Button, Group, Menu, Text} from "@mantine/core";
import {IconLeaf2, IconUserFilled} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";


interface AuthenticatedHeaderProps {

}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = () => {
    const router = useRouter();
    const {logout} = useAuth();

    return (
        <Group h="100%" px={10} align="center" justify="space-between">
            <Button variant="transparent" w='fit-content' px={2} style={{border: 'none'}} onClick={() => router.push("/")}>
                <Group w="fit-content" align="center">
                    <IconLeaf2 size={30} />
                    <Text size="md" fw="bold" ml={-15} mt={4}>Digital Remains</Text>
                </Group>
            </Button>
            <Group w="fit-content">
                <Menu>
                    <Menu.Target>
                        <Avatar style={{cursor: 'pointer'}}>
                            <IconUserFilled color="black"/>
                        </Avatar>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={() => (
                            logout().catch(console.error)
                        )}>
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}

export default AuthenticatedHeader;