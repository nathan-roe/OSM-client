"use client";
import '@mantine/dropzone/styles.css';
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {Divider, Title, Text, Stack, Group, Button, BackgroundImage} from '@mantine/core';
import {Dropzone, FileWithPath, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import {convertFileToBase64} from "@/common/fileUtils";
import {FileUpload} from "@/query/deceasedUserManagement/useAddIdentificationToDeceasedUser";


interface UploadCertificateProps {
    title: string;
    onSubmit: (file: FileUpload) => Promise<void>;
 }

const UploadCertificate: React.FC<UploadCertificateProps> = ({
    title,
    onSubmit
                                                             }) => {
    const [validUpload, setValidUpload] = React.useState<boolean>(false);
    const [fileUpload, setFileUpload] = React.useState<FileWithPath>();

    const handleSubmit = React.useCallback(async () => {
        if(!validUpload) {
            return;
        }
        const content = await convertFileToBase64(fileUpload as Blob);
        onSubmit({content, name: fileUpload?.name ?? ""}).catch(console.error);
    }, [validUpload, fileUpload]);

    return (
        <AuthenticatedPage>
            <Stack align="center" pl={{sm: 0, md: 200}}>
                <Title variant="h6" fw="normal">Upload {title}</Title>
                <Divider w={500} maw="90vw" />
                <form onSubmit={e => {
                    e.preventDefault();
                    handleSubmit().catch(console.error);
                }}>
                    <Stack w={1000} maw={{
                        base: "90vw",
                        md: "calc(90vw - 200px)",
                    }}>
                        <Dropzone
                            h="100%"
                            my={50}
                            onDrop={(files) => {
                                setValidUpload(true);
                                setFileUpload(files[0]);
                            }}
                            onReject={() => setValidUpload(false)}
                            maxSize={5 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            style={{position: 'relative'}}
                        >
                            <BackgroundImage src={
                                fileUpload
                                    ? URL.createObjectURL(fileUpload)
                                    : ""
                            }>
                                <Group justify="center" gap='xl' mih={220} style={{pointerEvents: 'none'}}>
                                    <Dropzone.Accept>
                                        <IconUpload
                                            style={{ width: "rem(52)", height: "rem(52)", color: 'var(--mantine-color-blue-6)' }}
                                            stroke={1.5}
                                        />
                                    </Dropzone.Accept>
                                    <Dropzone.Reject>
                                        <IconX
                                            style={{ width: "rem(52)", height: "rem(52)", color: 'var(--mantine-color-red-6)' }}
                                            stroke={1.5}
                                        />
                                    </Dropzone.Reject>
                                    <Dropzone.Idle>
                                        <IconPhoto
                                            style={{ width: "rem(52)", height: "rem(52)", color: 'var(--mantine-color-dimmed)' }}
                                            stroke={1.5}
                                        />
                                    </Dropzone.Idle>

                                    {
                                        fileUpload ? (
                                            <Text size="xl" inline>
                                                {fileUpload.name}
                                            </Text>
                                        ) : (
                                            <div>
                                                <Text size="xl" inline>
                                                    Drag {title.toLowerCase()} here or click to select from files
                                                </Text>
                                                <Text size="sm" c="dimmed" inline mt={7}>
                                                    Attach your {title.toLowerCase()}. This file should not exceed 5mb
                                                </Text>
                                            </div>
                                        )
                                    }
                                </Group>
                            </BackgroundImage>
                        </Dropzone>
                    </Stack>
                    <Button size="md" type="submit" bottom={50} right={{base: 20, md: 50}} style={{
                        position: 'absolute'
                    }}>
                        Continue
                    </Button>
                </form>
            </Stack>
        </AuthenticatedPage>
    );
}

export default UploadCertificate;