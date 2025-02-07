import {Group, Paper, Text} from "@mantine/core";

const Footer = () => {
    return (
        <Paper withBorder shadow="lg" w='100vw' px={25} h="30px" style={{
            zIndex: 1000
        }}>
            <Group h='30px' align="center" justify="space-between" w="100%">
                <Group>
                    <Text size="xs">Copyright 2024</Text>
                </Group>
                <Group w="fit-content">
                    <Text size="xs">Support</Text>
                    <Text size="xs">Contact Us</Text>
                </Group>
            </Group>
        </Paper>
    );
}
export default Footer;