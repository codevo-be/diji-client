import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import DropFiles from '@billing/expense/DropFiles'
import { Box, Button, Form } from '@digico/ui'

import { HttpService } from '../../../services/upload'

export default function FilesBox(): ReactNode {

    const form = useForm();

    const files = form.watch('files') || [];

     const onSubmit = async () => {
         const formData = new FormData();

         formData.append('name', 'files');

         for (let i = 0; i < files.length; i++) {
             formData.append('files[]', files[i].file);
         }

         const response = await HttpService.post('/expense', formData);
         console.log(response)
     }

    return (
        <Box>
            <Form useForm={form} onSubmit={onSubmit}>
                <DropFiles name={"files"} />

                <Button>Sauvegarder</Button>
            </Form>
        </Box>
    )
}