import {useMutation} from "@tanstack/react-query";
import {DeceasedServiceOwner} from "@/query/deceasedUserManagement/useCreateDeceasedUser";


const updateDeceasedUser = async (id: string, deceasedUser: DeceasedServiceOwner) => {
    const response = await fetch(
        `/api/deceasedUserManagement/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deceasedUser)
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export const useUpdateDeceasedUser = ({id}: {id: string}) => {
    return useMutation({
        mutationFn: (serviceOwner: DeceasedServiceOwner) => updateDeceasedUser(id, serviceOwner),
        mutationKey: ['updateDeceasedUser']
    });
}