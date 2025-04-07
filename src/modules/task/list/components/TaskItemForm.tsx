import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useUpdateContact } from '@contact/hooks/mutations'
import { useReadContact } from '@contact/hooks/queries'

import { TaskFields } from '@task/list/components/TaskFields'

export const TaskItemForm = (id: number) => {
    const { data } = useReadContact(Number(id))
    const updateContact = useUpdateContact()

    const form = useForm({
        values: data?.data
    })

    return (
        <Box>
            <Form useForm={form} onSubmit={updateContact.mutate}>
                <TaskFields />
                <Button isLoading={updateContact.isPending} type="submit">
                    Ajouter une tâche
                </Button>
            </Form>
        </Box>
    )
}
