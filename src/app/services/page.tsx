"use client";
import '@mantine/dropzone/styles.css';
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {Affix, Autocomplete, Box, Button, Card, Chip, Group, Image, Text} from '@mantine/core';
import {useRouter} from "next/navigation";
import {SupportedService, useAvailableServices} from "@/query/dataRemoval/useAvailableServices";
import {IconSearch} from '@tabler/icons-react';
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
            <Autocomplete
                placeholder="Find services"
                data={(availableServices || []).map(s => s.service)}
                value={search}
                onChange={setSearch}
                w='50vw'
                miw={200}
                leftSection={<IconSearch style={{height: 20}} stroke={1.5} />}
            />
            <Group justify="center">
                {servicesInSearch.map(availableService => {
                    const selected = selectedServices.includes(availableService.service);
                    return (
                        <Card
                            key={availableService.service}
                            shadow="lg"
                            padding="md"
                            radius="md"
                            withBorder
                            w={300}
                            h={300}
                            style={{cursor: 'pointer'}}
                            onClick={() => handleSelection(availableService)}
                        >
                            {selected ? (
                                <Chip defaultChecked style={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5
                                }}>Selected</Chip>
                            ) : <Box />}
                            <Card.Section>
                                <Group justify="center" p={20}>
                                    <Image
                                        src={`data:image/png;base64,${availableService.resource}`}
                                        w="auto"
                                        h={150}
                                        alt={`${availableService.service} Logo`}
                                    />
                                </Group>
                            </Card.Section>
                            <Group justify="center">
                                <Text>{availableService.service}</Text>
                            </Group>
                        </Card>
                    );
                })}
            </Group>
            <Affix bottom={50} right={{base: 20, md: 50}}>
                <Button size="md" onClick={handleSubmit} disabled={!selectedServices.length}>
                    Continue
                </Button>
            </Affix>
        </AuthenticatedPage>
    );
}

export default Services;