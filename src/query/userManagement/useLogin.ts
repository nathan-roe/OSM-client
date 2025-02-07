import {useMutation} from "@tanstack/react-query";

export interface UserAuthentication {
    username: string;
    password: string;
}

const authenticateUser = async (userAuthentication: UserAuthentication) => {
    const response = await fetch(
        "/api/userManagement/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userAuthentication)
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export const useLogin = () => {
    return useMutation({
        mutationFn: authenticateUser,
        mutationKey: ['authentication']
    });
}