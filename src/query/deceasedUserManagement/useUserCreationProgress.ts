import {useQuery} from "@tanstack/react-query";

export enum UserCreationProgress {
    NOT_STARTED,
    USER_INFO,
    CERTIFICATE,
    IDENTIFICATION,
    SERVICE_SELECTION
}

type ProgressResponse = string;

interface UserCreationProgressParams {
    id: string;
}

const getUserCreationProgress = async ({id}: UserCreationProgressParams): Promise<ProgressResponse> => {
    const response = await fetch(
        `/api/deceasedUserManagement/${id}/progress`,
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
    const progress = await response.json();
    return progress as ProgressResponse;
}

export const useUserCreationProgress = (
        userCreationProgress: UserCreationProgressParams,
) => {
    return useQuery({
        queryKey: ['userCreationProgress'],
        queryFn: () => getUserCreationProgress(userCreationProgress)
    });
}