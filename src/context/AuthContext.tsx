import React from "react";
import {useLogin, UserAuthentication} from "@/query/userManagement/useLogin";
import {useLogout} from "@/query/userManagement/useLogout";
import {ActiveUser, useActiveUserInfo} from "@/query/userManagement/useActiveUserInfo";
import {useRouter} from "next/navigation";
import {useLocalStorage} from "@mantine/hooks";

export enum UserAuthenticationState {
    FAILED,
    INITIALIZING,
}

const AuthContext = React.createContext({
    user: UserAuthenticationState.INITIALIZING as ActiveUser | UserAuthenticationState,
    login: async (_: UserAuthentication) => {
    },
    logout: async () => {
    }
});

interface AuthProviderProps {
    children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const router = useRouter();
    const {mutateAsync: login} = useLogin();
    const {mutateAsync: logout} = useLogout();
    const {refetch} = useActiveUserInfo();
    const [user, setUser] = useLocalStorage<ActiveUser | UserAuthenticationState>({
        key: 'user-profile',
        defaultValue: UserAuthenticationState.INITIALIZING,
    });

    const handleLogin = React.useCallback(async (authentication: UserAuthentication) => {
        await login(authentication);
        const {data} = await refetch();
        setUser(data ?? UserAuthenticationState.FAILED);
    }, []);

    const handleLogout = React.useCallback(async () => {
        await logout();
        setUser(UserAuthenticationState.INITIALIZING);
        router.push("/");
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login: handleLogin,
            logout: handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);