import {useMutation} from "@tanstack/react-query";

const logoutActiveUser = async () => {
    await fetch(
        "/api/userManagement/logout",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}

export const useLogout = () => {
    return useMutation({
        mutationFn: logoutActiveUser,
        mutationKey: ['logout']
    });
}