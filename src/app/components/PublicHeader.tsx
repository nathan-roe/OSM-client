"use client";
import React from 'react';
import {ActionIcon, Button, Group, Menu, Text} from "@mantine/core";
import {IconLanguage, IconLeaf2} from "@tabler/icons-react";
import SupportedLanguages from '@/translation/supportedLanguages.json';
import {useRouter} from "next/navigation";

interface PublicHeaderProps {
    showSignIn?: boolean;
    customActions?: React.ReactNode | React.ReactNode[];
}

const PublicHeader: React.FC<PublicHeaderProps> = ({showSignIn, customActions}) => {
    const router = useRouter();

    return (
        <Group h="100%" px={10} align="center" justify="space-between">
            <Button variant="transparent" w='fit-content' px={2} style={{border: 'none'}} onClick={() => router.push("/")}>
                <Group w="fit-content" align="center">
                    <IconLeaf2 size={25} />
                    <Text size="md" fw="bold" ml={-15} mt={4}>Digital Remains</Text>
                </Group>
            </Button>
            <Group w="fit-content">
                {customActions ?? (
                    <>
                        <Menu>
                            <Menu.Target>
                                <ActionIcon variant="transparent">
                                    <IconLanguage color="black"/>
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown onChange={e => console.log("updated language selection: ", e.target)}>
                                {SupportedLanguages.map(language => (
                                    <Menu.Item key={language}>
                                        {language}
                                    </Menu.Item>
                                ))}
                            </Menu.Dropdown>
                        </Menu>
                        {showSignIn && (
                            <>
                                <Button variant="outline" onClick={() => {
                                    router.push("/signup")
                                }}>Sign up</Button>
                                <Button visibleFrom="md" variant="contained" onClick={() => {
                                    router.push("/signin")
                                }}>Sign in</Button>
                            </>
                        )}
                    </>
                )}
            </Group>
        </Group>
    );
}

export default PublicHeader;