import { FieldValues, useForm } from 'react-hook-form'

import { Box } from '../../Box'
import { Button } from '../../button'
import { Form } from '../../form'
import { useKanbanContext } from '../contexts/KanbanContext'

import { TaskFields } from './TaskFields'

import { useUpdateKanbanTask } from '@/modules/kanban/hooks/mutations/useUpdateSupplier'

export const FormUpdateTask = () => {
    const { taskOpen, setTaskOpen } = useKanbanContext()

    const updateTask = useUpdateKanbanTask()

    const form = useForm({
        values: taskOpen ?? {}
    })

    if (!taskOpen) {
        return null
    }

    const handleClose = () => {
        setTaskOpen(null)
    }

    const handleSubmit = (data: FieldValues) => {
        updateTask.mutate(data, {
            onSuccess: () => {
                setTaskOpen(null)
            }
        })
    }

    return (
        <div
            className={`w-full h-screen fixed top-0 left-0 z-[100] bg-secondary/70 flex justify-center items-center cursor-pointer pointer`}
            onClick={handleClose}>
            <Box className="cursor-default min-w-[46rem]" onClick={(e) => e.stopPropagation()}>
                <Form useForm={form} onSubmit={handleSubmit}>
                    <TaskFields />
                    <Button isLoading={updateTask.isPending} type="submit">
                        Enregistrer
                    </Button>
                </Form>
            </Box>
        </div>
    )
}