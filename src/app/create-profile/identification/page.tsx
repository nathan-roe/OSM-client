"use client";
import '@mantine/dropzone/styles.css';
import React from 'react';
import {useRouter} from "next/navigation";
import {
    FileUpload,
    useAddIdentificationToDeceasedUser
} from "@/query/deceasedUserManagement/useAddIdentificationToDeceasedUser";
import FileUploadPage from "@/app/create-profile/FileUploadPage";
import {useCreationProgress} from "@/context/UserCreationProgressContext";
import {UserCreationProgress} from "@/query/deceasedUserManagement/useUserCreationProgress";
import {usePageLoadIndicator} from "@/context/LoadingContext";
import { IconFileDescription } from '@tabler/icons-react';


interface UploadCertificateProps {

}

const UploadCertificate: React.FC<UploadCertificateProps> = () => {
    const router = useRouter();
    const {setProgress} = useCreationProgress();
    const {setLoading} = usePageLoadIndicator();
    const {mutateAsync: addIdentification} = useAddIdentificationToDeceasedUser({
       id: sessionStorage.getItem("serviceOwnerId") || ""
   });

    const onSubmit = React.useCallback(async (file: FileUpload) => {
        setLoading(true);
        await addIdentification(file);
        setProgress(UserCreationProgress.IDENTIFICATION);
        setLoading(false);
        router.push("/services");
    }, []);

    return (
        <FileUploadPage
            onSubmit={onSubmit}
            title="Government ID"
            icon={IconFileDescription}
            description="An official document that proves your identity, such as a driver's license, passport, or state ID card."
        />
   );
}

export default UploadCertificate;