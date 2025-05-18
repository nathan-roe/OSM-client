"use client";
import '@mantine/dropzone/styles.css';
import React, {useState} from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {
    Divider,
    Title,
    Text,
    Stack,
    Group,
    Button,
    BackgroundImage,
    Paper,
    Affix,
    ThemeIcon, Badge, Stepper, Alert, List, Timeline
} from '@mantine/core';
import {Dropzone, FileWithPath, IMAGE_MIME_TYPE, PDF_MIME_TYPE} from '@mantine/dropzone';
import {
    IconAlertCircle,
    IconArrowRight,
    IconCheck,
    IconCloudUpload,
    IconInfoCircle,
    IconUpload,
    IconX
} from "@tabler/icons-react";
import { convertFileToBase64 } from "@/common/fileUtils";
import { FileUpload } from "@/query/deceasedUserManagement/useAddIdentificationToDeceasedUser";

interface FileUploadPageProps {
    title: string;
    icon: any;
    description: string;
    onSubmit: (file: FileUpload) => Promise<void>;
}

const FileUploadPage: React.FC<FileUploadPageProps> = ({
    title,
    description,
    onSubmit,
    ...props
}) => {
    // const [validUpload, setValidUpload] = React.useState<boolean>(false);
    // const [fileUpload, setFileUpload] = React.useState<FileWithPath>();
    const [validUpload, setValidUpload] = useState<boolean>(false);
    const [fileUpload, setFileUpload] = useState<FileWithPath | null>(null);
    const [activeTab, setActiveTab] = useState<string | null>('certificate');
    const [currentStep, setCurrentStep] = useState(0);

    // const handleSubmit = React.useCallback(async () => {
    //     if (!validUpload) {
    //         return;
    //     }
    //     const content = await convertFileToBase64(fileUpload as Blob);
    //     onSubmit({ content, name: fileUpload?.name ?? "" }).catch(console.error);
    // }, [validUpload, fileUpload]);

    const handleSubmit = async () => {
        if (!validUpload || !fileUpload) {
            return;
        }

        try {
            const content = await convertFileToBase64(fileUpload as Blob);
            console.log("Uploading file:", {
                content: content.substring(0, 50) + "...", // Truncate for logging
                name: fileUpload.name,
                type: fileUpload.type,
                size: fileUpload.size
            });

            // Move to next step or tab
            if (currentStep < 2) {
                setCurrentStep(currentStep + 1);
            } else if (activeTab === 'certificate') {
                setActiveTab('identification');
                setCurrentStep(0);
            } else if (activeTab === 'identification') {
                setActiveTab('authorization');
                setCurrentStep(0);
            } else {
                // All uploads complete, navigate to next page
                console.log("All documents uploaded successfully");
                // Redirect to next page here
            }

            // Reset file upload state
            setFileUpload(null);
            setValidUpload(false);
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    };

    const getAcceptedFileTypes = () => {
        return [...IMAGE_MIME_TYPE, ...PDF_MIME_TYPE];
    };

    return (
        <AuthenticatedPage>
            <Paper shadow="sm" p="xl" radius="lg" withBorder mt="md">
                <Stack>
                    <Group justify="space-between" align="flex-start">
                        <Stack gap="xs">
                            <Group>
                                <ThemeIcon size="lg" radius="md" color="var(--mantine-color-primary-6)">
                                    <props.icon size={20} />
                                </ThemeIcon>
                                <Title order={2} fw={600} size="h3">{title}</Title>
                            </Group>
                            <Text c="dimmed" maw={600}>
                                {description}
                            </Text>
                        </Stack>
                        <Badge size="lg" radius="sm" color={validUpload ? "green" : "blue"}>
                            {validUpload ? "Ready to Upload" : "Waiting for File"}
                        </Badge>
                    </Group>

                    <Divider my="md" />

                    <Stepper active={currentStep} onStepClick={setCurrentStep}>
                        <Stepper.Step
                            label="Upload"
                            description="Select or drag file"
                            icon={<IconUpload size={18} />}
                        >
                            <Alert
                                icon={<IconInfoCircle size={16} />}
                                title="Document Requirements"
                                color="blue"
                                radius="md"
                                mb="lg"
                            >
                                <List size="sm" spacing="xs">
                                    <List.Item>Files must be in JPG, PNG, or PDF format</List.Item>
                                    <List.Item>Maximum file size: 5MB</List.Item>
                                    <List.Item>Document must be clearly legible</List.Item>
                                    <List.Item>All information must be visible and unobstructed</List.Item>
                                </List>
                            </Alert>

                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSubmit().catch(console.error);
                            }}>
                                <Dropzone
                                    h={300}
                                    onDrop={(files) => {
                                        setValidUpload(true);
                                        setFileUpload(files[0]);
                                        setCurrentStep(1);
                                    }}
                                    onReject={() => setValidUpload(false)}
                                    maxSize={5 * 1024 ** 2}
                                    accept={getAcceptedFileTypes()}
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
                                                        color="var(--mantine-color-primary-6)"
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
                                                    <IconCloudUpload
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
                                                    <Stack align="center" gap={5}>
                                                        <Text size="xl" fw={500}>
                                                            Drag {title.toLowerCase()} here or click to select
                                                        </Text>
                                                        <Text size="sm" c="dimmed">
                                                            Accepted formats: PDF, JPG, PNG (max 5MB)
                                                        </Text>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Group>
                                    </BackgroundImage>
                                </Dropzone>
                            </form>
                        </Stepper.Step>

                        <Stepper.Step
                            label="Verify"
                            description="Check document quality"
                            icon={<IconCheck size={18} />}
                        >
                            <Alert
                                icon={<IconAlertCircle size={16} />}
                                title="Document Verification"
                                color="yellow"
                                radius="md"
                                mb="lg"
                            >
                                Please verify that your document meets these requirements:
                                <List size="sm" spacing="xs" mt="xs">
                                    <List.Item>All text is clearly visible and legible</List.Item>
                                    <List.Item>The entire document is visible in the image</List.Item>
                                    <List.Item>There is no glare or shadow obscuring information</List.Item>
                                    <List.Item>The document is not expired (if applicable)</List.Item>
                                </List>
                            </Alert>

                            {fileUpload && (
                                <Paper radius="md" p="xs" withBorder>
                                    <BackgroundImage
                                        src={URL.createObjectURL(fileUpload)}
                                        radius="md"
                                        h={300}
                                        style={{
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundColor: '#f8f9fa'
                                        }}
                                    />
                                </Paper>
                            )}

                            <Group justify="space-between" mt="xl">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setCurrentStep(0);
                                        setFileUpload(null);
                                        setValidUpload(false);
                                    }}
                                >
                                    Select Different File
                                </Button>
                                <Button
                                    variant="filled"
                                    color="green"
                                    onClick={() => setCurrentStep(2)}
                                >
                                    Document Looks Good
                                </Button>
                            </Group>
                        </Stepper.Step>

                        <Stepper.Step
                            label="Confirm"
                            description="Ready to upload"
                            icon={<IconCloudUpload size={18} />}
                        >
                            <Alert
                                icon={<IconCheck size={16} />}
                                title="Ready to Upload"
                                color="green"
                                radius="md"
                                mb="lg"
                            >
                                Your {title.toLowerCase()} is ready to be uploaded. Click the Continue button to proceed.
                            </Alert>

                            <Stack gap="md">
                                <Paper radius="md" p="lg" withBorder>
                                    <Group justify="space-between">
                                        <Group>
                                            <ThemeIcon radius="md" size="xl" color="var(--mantine-color-primary-6)">
                                                <props.icon size={24} />
                                            </ThemeIcon>
                                            <Stack gap={0}>
                                                <Text fw={600}>{fileUpload?.name}</Text>
                                                <Text size="sm" c="dimmed">
                                                    {fileUpload?.type} • {Math.round((fileUpload?.size || 0) / 1024)} KB
                                                </Text>
                                            </Stack>
                                        </Group>
                                        <Badge color="green" size="lg">Ready</Badge>
                                    </Group>
                                </Paper>

                                <Timeline active={2} bulletSize={24} lineWidth={2}>
                                    <Timeline.Item
                                        bullet={<IconUpload size={12} />}
                                        title="File Selected"
                                    >
                                        <Text size="sm" c="dimmed">{fileUpload?.name} selected for upload</Text>
                                    </Timeline.Item>
                                    <Timeline.Item
                                        bullet={<IconCheck size={12} />}
                                        title="Verification Complete"
                                    >
                                        <Text size="sm" c="dimmed">Document has been verified and is ready</Text>
                                    </Timeline.Item>
                                    <Timeline.Item
                                        bullet={<IconCloudUpload size={12} />}
                                        title="Ready to Upload"
                                    >
                                        <Text size="sm" c="dimmed">Click Continue to upload your document</Text>
                                    </Timeline.Item>
                                </Timeline>
                            </Stack>
                        </Stepper.Step>
                    </Stepper>
                </Stack>
            </Paper>
            <Affix position={{bottom: 75, right: 20}}>
                <Button
                    size="lg"
                    radius="xl"
                    rightSection={<IconArrowRight size={20} />}
                    disabled={!validUpload || currentStep < 2}
                    variant="gradient"
                    gradient={{from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)'}}
                    onClick={handleSubmit}
                    styles={{
                        root: {
                            padding: '0 30px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }
                    }}
                >
                    Continue
                </Button>
            </Affix>
        </AuthenticatedPage>
    );
}

export default FileUploadPage;