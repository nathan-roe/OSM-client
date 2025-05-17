"use client";
import '@mantine/dropzone/styles.css';
import React from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import { Divider, Title, Text, Stack, Group, Button, BackgroundImage, Paper, Container } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { convertFileToBase64 } from "@/common/fileUtils";
import { FileUpload } from "@/query/deceasedUserManagement/useAddIdentificationToDeceasedUser";

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
        if (!validUpload) {
            return;
        }
        const content = await convertFileToBase64(fileUpload as Blob);
        onSubmit({ content, name: fileUpload?.name ?? "" }).catch(console.error);
    }, [validUpload, fileUpload]);

    return (
        <AuthenticatedPage>
            <Container size="lg">
                <Paper shadow="sm" p="xl" radius="md" withBorder>
                    <Stack>
                        <Title order={2} fw={500} ta="center">Upload {title}</Title>
                        <Divider />
                        
                        <form onSubmit={e => {
                            e.preventDefault();
                            handleSubmit().catch(console.error);
                        }}>
                            <Stack>
                                <Dropzone
                                    h={300}
                                    onDrop={(files) => {
                                        setValidUpload(true);
                                        setFileUpload(files[0]);
                                    }}
                                    onReject={() => setValidUpload(false)}
                                    maxSize={5 * 1024 ** 2}
                                    accept={IMAGE_MIME_TYPE}
                                    radius="md"
                                    style={{ position: 'relative' }}
                                >
                                    <BackgroundImage 
                                        src={fileUpload ? URL.createObjectURL(fileUpload) : ""}
                                        radius="md"
                                    >
                                        <Group 
                                            justify="center" 
                                            align="center" 
                                            style={{ 
                                                minHeight: 300,
                                                backgroundColor: fileUpload ? 'rgba(0,0,0,0.3)' : 'transparent',
                                            }}
                                        >
                                            <Stack align="center">
                                                <Dropzone.Accept>
                                                    <IconUpload
                                                        size={52}
                                                        color="var(--mantine-color-blue-6)"
                                                        stroke={1.5}
                                                    />
                                                </Dropzone.Accept>
                                                <Dropzone.Reject>
                                                    <IconX
                                                        size={52}
                                                        color="var(--mantine-color-red-6)"
                                                        stroke={1.5}
                                                    />
                                                </Dropzone.Reject>
                                                <Dropzone.Idle>
                                                    <IconPhoto
                                                        size={52}
                                                        color="var(--mantine-color-dimmed)"
                                                        stroke={1.5}
                                                    />
                                                </Dropzone.Idle>

                                                {fileUpload ? (
                                                    <Text size="xl" c="white" fw={500}>
                                                        {fileUpload.name}
                                                    </Text>
                                                ) : (
                                                    <Stack align="center" spacing={5}>
                                                        <Text size="xl" fw={500}>
                                                            Drag {title.toLowerCase()} here or click to select
                                                        </Text>
                                                        <Text size="sm" c="dimmed">
                                                            Maximum file size: 5MB
                                                        </Text>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Group>
                                    </BackgroundImage>
                                </Dropzone>

                                <Group justify="flex-end">
                                    <Button 
                                        size="lg"
                                        type="submit"
                                        disabled={!validUpload}
                                        variant="filled"
                                    >
                                        Continue
                                    </Button>
                                </Group>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
            </Container>
        </AuthenticatedPage>
    );
}

export default UploadCertificate;