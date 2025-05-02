import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid } from '@digico/ui'

import { HttpService } from '../../services/upload'

import { Modal } from '@components/Modal'
import DropFiles from '@components/upload/DropFiles'

import { useModal } from '../../context/ModalContext'

interface FilesBoxProps {
    modelType: string;
    modelId: string;
}

export default function FilesBox(props: FilesBoxProps): ReactNode {

    const form = useForm();

    const files = form.watch('files') || [];

    const { setOpen } = useModal();

    const [existingFiles, setExistingFiles] = useState([""]);
    const [selectedFile, setSelectedFile] = useState("Fichier");

     const onSubmit = async () => {
         const formData = new FormData();

         formData.append('model', props.modelType);
         formData.append('model_id', props.modelId);
         formData.append('name', 'files');

         if (files.length > 0) {
             for (let i = 0; i < files.length; i++) {
                 formData.append('files[]', files[i].file);
             }
         }
         const response = await HttpService.post('/', formData);
         if (response) {
             //Ajouter les nouveaux fichiers à existingFiles
             console.log("Succeed");
             form.resetField('files');
         }
     }

    useEffect(() => {
        const test = HttpService.get(`/${props.modelType}/${props.modelId}`)
        test.then((response) => {
            setExistingFiles(response.files)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        console.log(files)
    }, [files]);

    return (
        <Box>
            <Modal>
                <div className={"flex flex-col gap-20"}>
                    <p className={"text-xl"}>Êtes-vous sûr de vouloir supprimer &quot;{selectedFile.filename}&quot; ?</p>

                    <div className={"flex flex-col gap-4"}>
                        <Button intent={"grey200"} type={"button"} onClick={() => {
                            setOpen(false);
                            setSelectedFile("");
                        }}>Annuler</Button>
                        <Button intent={"error"} type={"button"} onClick={() => {
                            onDeleteFile(selectedFile.id);
                        }}>Confirmer</Button>
                    </div>
                </div>
            </Modal>

            {existingFiles.length > 0 &&
                <Grid>
                    {existingFiles.map((file: any, index: number) => {
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