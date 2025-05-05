import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid } from '@digico/ui'
import { toast } from 'sonner'

import { useCreateUpload } from '../../hooks/mutations/upload'
import useDeleteUpload from '../../hooks/mutations/upload/useDeleteUpload'
import useGetUpload from '../../hooks/queries/upload/useGetUpload'
import { UploadType } from '../../types/upload.types'

import { Modal } from '@components/Modal'
import DropFiles from '@components/upload/DropFiles'

import { useModal } from '../../context/ModalContext'
import ImageFilePreview from '@components/upload/ImageFilePreview'

interface FilesBoxProps {
    modelType: string;
    modelId: string;
}

export default function FilesBox(props: FilesBoxProps): ReactNode {

    const form = useForm();

    const [uploadFiles, setUploadFiles] = useState<UploadType[]>([]);
    const [selectedFile, setSelectedFile] = useState<UploadType|undefined>(undefined);
    const files = form.watch('files') || [];

    const { setOpen } = useModal();

    const { mutate: deleteFile } = useDeleteUpload();
    const onDeleteFile = (fileId: string) => {
        deleteFile(fileId, {
            onSuccess: () => {
                toast.success("Le fichier a été supprimé avec succès");
            },
            onError: (error) => {
                console.log(error);
                toast.error("La suppression a échoué : " + error);
            }
        });
        setOpen(false);
    }

    const { mutate: uploadFile } = useCreateUpload();
    const onSubmit = () => {
        const formData = new FormData();

        formData.append('model', props.modelType);
        formData.append('model_id', props.modelId);
        formData.append('name', 'files');

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files[]', files[i].file);
            }
        }

        uploadFile(formData, {
            onSuccess: () => {
                form.resetField('files');
                toast.success("Les fichiers ont été téléchargés avec succès");
            },
            onError: (error) => {
                console.log(error);
                toast.error("Le téléchargement a échoué : " + error.message);
            }
        });
    }

    const { data: uploads, isLoading } = useGetUpload(props.modelType, props.modelId);

    useEffect(() => {
        if (isLoading || !uploads) return;

        console.log(uploads)

        setUploadFiles(uploads);
    }, [isLoading, uploads])

    return (
        <Box>
            <Modal>
                <div className={"flex flex-col gap-20"}>
                    <p className={"text-xl"}>Êtes-vous sûr de vouloir supprimer &quot;{selectedFile?.filename}&quot; ?</p>

                    <div className={"flex flex-col gap-4"}>
                        <Button intent={"grey200"} type={"button"} onClick={() => {
                            setOpen(false);
                            setSelectedFile(undefined);
                        }}>Annuler</Button>
                        <Button intent={"error"} type={"button"} onClick={() => {
                            onDeleteFile(String(selectedFile?.id));
                        }}>Confirmer</Button>
                    </div>
                </div>
            </Modal>

            {uploadFiles.length > 0 &&
                <Grid>
                    {uploadFiles.map((file: UploadType, index: number) => {
                        /*if (file.mime_type === 'image/jpeg') {
                            return <ImageFilePreview key={index} { ...file } />
                        }*/
                        return (
                            <Grid.Col key={index} column={3} className={"flex flex-col justify-between items-center"}>
                                <p>{file.filename}</p>

                                <Button intent={"error"} type={"button"} onClick={() => {
                                    setOpen(true);
                                    setSelectedFile(file);
                                }}>Supprimer</Button>
                            </Grid.Col>
                        )
                    })}
                </Grid>
            }
            <Form useForm={form} onSubmit={onSubmit}>
                <DropFiles name={"files"} />

                <Button>Sauvegarder</Button>
            </Form>
        </Box>
    )
}