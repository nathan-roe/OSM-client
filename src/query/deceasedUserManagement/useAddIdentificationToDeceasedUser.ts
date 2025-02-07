import {useMutation} from "@tanstack/react-query";

export interface FileUpload {
    name: string;
    content: string;
}

const addIdentificationToDeceasedUser = async (id: string, fileUpload: FileUpload) => {
    const response = await fetch(
        `/api/deceasedUserManagement/${id}/identification`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fileUpload)
        }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export const useAddIdentificationToDeceasedUser = ({id}: {id: string}) => {
    return useMutation({
        mutationFn: (fileUpload: FileUpload) => addIdentificationToDeceasedUser(id, fileUpload),
        mutationKey: ['addIdentificationToDeceasedUser']
    });
}