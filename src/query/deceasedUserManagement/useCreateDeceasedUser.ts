import {useMutation} from "@tanstack/react-query";

export interface DeceasedServiceOwner {
    firstName: string;
    middleName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    zipCode: string;
}

interface DeceasedServiceOwnerResponse extends DeceasedServiceOwner {
    id: string;
}

const createDeceasedUser = async (deceasedUser: DeceasedServiceOwner) => {
    const response = await fetch(
        "/api/deceasedUserManagement",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deceasedUser)
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as DeceasedServiceOwnerResponse;
}

export const useCreateDeceasedUser = () => {
    return useMutation({
        mutationFn: createDeceasedUser,
        mutationKey: ['createDeceasedUser']
    });
}