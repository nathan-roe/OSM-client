"use client";
import '@mantine/dropzone/styles.css';
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {
    Affix,
    Autocomplete,
    Box,
    Button,
    Card,
    SimpleGrid,
    Container,
    Stack,
    Title,
    Image,
    Text,
    Badge
} from '@mantine/core';
import {useRouter} from "next/navigation";
import {SupportedService, useAvailableServices} from "@/query/dataRemoval/useAvailableServices";
import {IconArrowRight, IconCheck, IconSearch} from '@tabler/icons-react';
import {useAddServicesToDeceasedUser} from "@/query/deceasedUserManagement/useAddServicesToDeceasedUser";
import {useCreationProgress} from "@/context/UserCreationProgressContext";
import {UserCreationProgress} from "@/query/deceasedUserManagement/useUserCreationProgress";
import {usePageLoadIndicator} from "@/context/LoadingContext";


interface ServicesProps {

}

const Services: React.FC<ServicesProps> = () => {
    const router = useRouter();
    const {setProgress} = useCreationProgress();
    const {setLoading} = usePageLoadIndicator();
    const { data: availableServices } = useAvailableServices();
    const {mutateAsync: addServices} = useAddServicesToDeceasedUser({
        id: sessionStorage.getItem("serviceOwnerId") || ""
    });
    const [search, setSearch] = React.useState("");
    const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

    const handleSelection = React.useCallback((selection: SupportedService) => {
        setSelectedServices(services => services.includes(selection.service)
            ? services.filter(s => s !== selection.service)
            : [...services, selection.service]
        );
    }, []);

    const handleSubmit = React.useCallback(async () => {
        if(!selectedServices.length) {
            return;
        }
        setLoading(true);
        await addServices(selectedServices);
        setProgress(UserCreationProgress.SERVICE_SELECTION);
        setLoading(false);
        router.push("/confirmation");
    }, [selectedServices, setLoading]);

    const servicesInSearch = React.useMemo(() => {
        let services = (availableServices || []).sort((a: SupportedService, b: SupportedService) =>
            a.service.localeCompare(b.service)
        );
        if(search.length) {
            services = services.filter(s =>
                s.service.toLowerCase().includes(search.toLowerCase())
            );
        }
        return services;
    }, [search, availableServices, selectedServices]);

    return (
        <AuthenticatedPage>
            <Stack px="md" py="xl">
                <Container size="xl">
                    <Stack align="center">
                        <Title order={1} ta="center" size="h2" fw={700} c="blue.9">
                            Select Your Services
                        </Title>

                        <Autocomplete
                            placeholder="Search for services..."
                            data={(availableServices || []).map(s => s.service)}
                            value={search}
                            onChange={setSearch}
                            size="lg"
                            radius="xl"
                            w={{ base: '95%', sm: '70%', md: '50%' }}
                            leftSection={<IconSearch size={20} style={{ color: 'var(--mantine-color-blue-6)' }} />}
                            styles={{
                                input: {
                                    '&:focus': {
                                        borderColor: 'var(--mantine-color-blue-5)',
                                        boxShadow: '0 0 0 3px var(--mantine-color-blue-1)',
                                    },
                                },
                            }}
                        />
                    </Stack>
                </Container>

                <Container size="xl" py="xl">
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        verticalSpacing="xl"
                    >
                        {servicesInSearch.map(availableService => {
                            const selected = selectedServices.includes(availableService.service);
                            return (
                                <Card
                                    key={availableService.service}
                                    shadow="sm"
                                    padding="lg"
                                    radius="lg"
                                    withBorder
                                    style={{
                                        cursor: 'pointer',
                                        transform: selected ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.2s ease',
                                        border: selected ? '2px solid var(--mantine-color-blue-5)' : undefined,
                                    }}
                                    onClick={() => handleSelection(availableService)}
                                >
                                    {selected && (
                                        <Box
                                            style={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                zIndex: 2,
                                            }}
                                        >
                                            <Badge
                                                radius="xl"
                                                variant="gradient"
                                                gradient={{ from: 'blue', to: 'cyan' }}
                                                leftSection={<IconCheck size={14} />}
                                            >
                                                Selected
                                            </Badge>
                                        </Box>
                                    )}

                                    <Card.Section>
                                        <Box
                                            p="xl"
                                            style={{
                                                background: 'linear-gradient(to bottom, var(--mantine-color-gray-0), var(--mantine-color-gray-1))',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: 200,
                                            }}
                                        >
                                            <Image
                                                src={`data:image/png;base64,${availableService.resource}`}
                                                w="auto"
                                                h={150}
                                                alt={`${availableService.service} Logo`}
                                                style={{
                                                    filter: selected ? 'none' : 'grayscale(0.2)',
                                                    transition: 'filter 0.2s ease',
                                                }}
                                            />
                                        </Box>
                                    </Card.Section>

                                    <Stack mt="md">
                                        <Text
                                            fw={500}
                                            size="lg"
                                            ta="center"
                                            c={selected ? 'blue.9' : 'dark'}
                                        >
                                            {availableService.service}
                                        </Text>
                                        <Text c="dimmed" size="sm" ta="center">
                                            Click to {selected ? 'deselect' : 'select'} this service
                                        </Text>
                                    </Stack>
                                </Card>
                            );
                        })}
                    </SimpleGrid>
                </Container>

                <Affix position={{ bottom: 20, right: 20 }}>
                    <Button
                        size="lg"
                        radius="xl"
                        disabled={!selectedServices.length}
                        onClick={handleSubmit}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                        leftSection={<IconArrowRight size={20} />}
                        px={30}
                    >
                        Continue with {selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'}
                    </Button>
                </Affix>
            </Stack>
        </AuthenticatedPage>
    );
}

export default Services;