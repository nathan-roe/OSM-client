import {useQuery} from "@tanstack/react-query";

export interface SupportedService {
    service: string;
    resource: string;
}

const getAvailableServices = async (): Promise<SupportedService[]> => {
    const response = await fetch(
        "/api/dataRemoval/services",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const managingUser = await response.json();
    return managingUser as SupportedService[];
}

export const useAvailableServices = () => {
    return useQuery({
        queryKey: ['availableServices'],
        queryFn: getAvailableServices
    });
}