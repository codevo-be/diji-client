import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid, ImageBuilder } from '@digico/ui'
import { toast } from 'sonner'

import { useCreateUpload } from '../../hooks/mutations/upload'
import useDeleteUpload from '../../hooks/mutations/upload/useDeleteUpload'
import useGetUpload from '../../hooks/queries/upload/useGetUpload'
import { UploadType } from '../../types/upload.types'

import { Modal } from '@components/Modal'
import DropFiles from '@components/upload/DropFiles'

import { useModal } from '../../context/ModalContext'
import PdfPreview from './PdfPreview'
import ImagePreview from '@components/upload/ImagePreview'
import { Icon } from '@components/Icon'
import downloadUpload from '../../services/upload/download-upload'

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

    const onDownloadFile = async (url: string, filename: string) => {
        await downloadUpload(url, filename);
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
                <Grid className={"p-8"}>
                    {uploadFiles.map((file: UploadType, index: number) => {

                        let preview;

                        if (/^image\/.+$/.test(file.mime_type)) {
                            preview = <ImagePreview { ...file } />
                        } else if (file.mime_type === 'application/pdf') {
                            preview = <PdfPreview { ...file } />
                        }

                        return (
                            <Grid.Col key={index} column={3} className={"flex flex-col gap-4 justify-between items-center"}>
                                <div className="w-[18rem] aspect-square flex justify-center items-center overflow-hidden relative">
                                    {preview}

                                    <a href={file.url} target={"_blank"} className="w-full h-full absolute top-0 left-0 opacity-0 hover:cursor-pointer hover:opacity-100 hover:bg-[#000000]/40 flex items-center justify-center transition duration-150">
                                        <Icon name="eye" fill={"white"} className="size-24 " />
                                    </a>
                                </div>


                                <p className={"max-w-full text-sm h-12 text-center line-clamp-1"}>{file.filename}</p>


                                <Button type={"button"} onClick={() => {
                                    onDownloadFile(file.url, file.filename);
                                }}>Télécharger</Button>

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