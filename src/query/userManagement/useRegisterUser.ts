import {useMutation} from "@tanstack/react-query";

export interface UserSignUp {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
}

const registerUser = async (userSignUp: UserSignUp) => {
    const response = await fetch(
        "/api/userManagement/register",
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userSignUp)
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: registerUser,
        mutationKey: ['register']
    });
}