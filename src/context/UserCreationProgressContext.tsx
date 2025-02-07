import React from "react";
import {UserCreationProgress, useUserCreationProgress} from "@/query/deceasedUserManagement/useUserCreationProgress";

const UserCreationProgressContext = React.createContext({
    progress: UserCreationProgress.NOT_STARTED,
    setProgress: (_: UserCreationProgress) => {}
});


interface UserCreationProgressProviderProps {
    children: React.ReactNode | React.ReactNode[];
}

export const UserCreationProgressProvider = ({children}: UserCreationProgressProviderProps) => {
    const {data} = useUserCreationProgress({
        id: sessionStorage.getItem("serviceOwnerId") || ""
    });
    const [progress, setProgress] = React.useState<UserCreationProgress>(
        UserCreationProgress.NOT_STARTED
    );

    React.useEffect(() => {
        setProgress(UserCreationProgress[
            data as unknown as number
        ] as unknown as UserCreationProgress);
    }, [data]);

    return (
        <UserCreationProgressContext.Provider value={{
            progress,
            setProgress
        }}>
            {children}
        </UserCreationProgressContext.Provider>
    );
}

export const useCreationProgress = () => React.useContext(UserCreationProgressContext);