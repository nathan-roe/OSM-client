import {useQuery} from "@tanstack/react-query";

export interface ActiveUser {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
}

const getActiveUserInfo = async (): Promise<ActiveUser> => {
    const response = await fetch(
        "/api/userManagement/me",
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
    return managingUser as ActiveUser;
}

export const useActiveUserInfo = () => {
    return useQuery({
        queryKey: ['activeUser'],
        queryFn: getActiveUserInfo
    });
}