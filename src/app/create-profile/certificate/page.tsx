"use client";
import '@mantine/dropzone/styles.css';
import React from 'react';
import {useRouter} from "next/navigation";
import {useAddCertificateToDeceasedUser} from "@/query/deceasedUserManagement/useAddCertificateToDeceasedUser";
import {FileUpload} from "@/query/deceasedUserManagement/useAddIdentificationToDeceasedUser";
import FileUploadPage from "@/app/create-profile/FileUploadPage";
import {useCreationProgress} from "@/context/UserCreationProgressContext";
import {UserCreationProgress} from "@/query/deceasedUserManagement/useUserCreationProgress";
import {usePageLoadIndicator} from "@/context/LoadingContext";
import {IconFileCertificate} from "@tabler/icons-react";


interface UploadCertificateProps {

}

const UploadCertificate: React.FC<UploadCertificateProps> = () => {
    const router = useRouter();
    const {setProgress} = useCreationProgress();
    const {setLoading} = usePageLoadIndicator();
    const {mutateAsync: addCertificate} = useAddCertificateToDeceasedUser({
        id: sessionStorage.getItem("serviceOwnerId") || ""
    });

    const onSubmit = React.useCallback(async (file: FileUpload) => {
        setLoading(true);
        await addCertificate(file);
        setProgress(UserCreationProgress.CERTIFICATE);
        setLoading(false);
        router.push("/create-profile/identification");
    }, [setLoading, setProgress, router, addCertificate]);

    return (
        <FileUploadPage
            onSubmit={onSubmit}
            title="Death Certificate"
            icon={IconFileCertificate}
            description="An official document issued by a medical practitioner which confirms the date, location, and cause of a person's death."
        />
    );
}

export default UploadCertificate;