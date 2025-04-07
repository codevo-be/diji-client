import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useCreateTaskItem } from '@task/hooks/mutations'
import { ContactType } from '@contact/types/contact'

import { TaskFields } from '@task/list/components/TaskFields'

export const TaskItemForm = () => {
    const createItem = useCreateTaskItem()

    const form = useForm({
        values: "",
    })

    const handleSubmit = (data: ContactType) => {
        createItem.mutate(data, {})
    }

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <TaskFields />
                <Button type="submit">
                    Ajouter une tâche
                </Button>
            </Form>
        </Box>
    )
}
