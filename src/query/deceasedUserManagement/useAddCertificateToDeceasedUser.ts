import {useMutation} from "@tanstack/react-query";
import { FileUpload } from "./useAddIdentificationToDeceasedUser";

const addCertificateToDeceasedUser = async (id: string, fileUpload: FileUpload) => {
    const response = await fetch(
        `/api/deceasedUserManagement/${id}/certificate`,
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

export const useAddCertificateToDeceasedUser = ({id}: {id: string}) => {
    return useMutation({
        mutationFn: (fileUpload: FileUpload) => addCertificateToDeceasedUser(id, fileUpload),
        mutationKey: ['addCertificateToDeceasedUser']
    });
}