import React from 'react';
import {Stack, Text, Group, Menu, MenuItem} from "@mantine/core";
import {IconChevronRight} from "@tabler/icons-react";
import {useRouter} from "next/navigation";


interface PublicNavBarProps {

}

const NAV_LINKS: Record<string, string> = {
    "About": "/about",
    "Support": "/support",
    "Pricing": "/pricing",

}

const PublicNavBar: React.FC<PublicNavBarProps> = () => {
    const router = useRouter();

    return (
        <Stack pt={50}>
            <Menu>
                {Object.entries(NAV_LINKS).map(([key, value]) => (
                    <MenuItem
                        key={key}
                        onClick={() => router.push(value)}
                        bg="white"
                    >
                        <Group justify="space-between">
                            <Text size="md" fw="bold">{key}</Text>
                            <IconChevronRight />
                        </Group>
                    </MenuItem>
                ))}
            </Menu>
        </Stack>
    );
}
export default PublicNavBar;