import {useMutation} from "@tanstack/react-query";


const addServicesToDeceasedUser = async (id: string, services: string[]) => {
    const response = await fetch(
        `/api/deceasedUserManagement/${id}/services`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({services})
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export const useAddServicesToDeceasedUser = ({id}: {id: string}) => {
    return useMutation({
        mutationFn: (services: string[]) => addServicesToDeceasedUser(id, services),
        mutationKey: ['addServicesToDeceasedUser']
    });
}