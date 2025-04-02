'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useCreateSupplier } from '../hooks/supplier/mutations/useCreateSupplier'

import { TaskColumnFields } from './form/TaskColumnFields'

interface TaskColumnCreateFormProps {
    projectId?: number
}

export const TaskColumnCreateForm = ({ projectId }: TaskColumnCreateFormProps) => {
    const form = useForm({
        defaultValues: {
            project_id: projectId || undefined
        }
    })

    const { mutate, isPending } = useCreateSupplier()

    const handleSubmit = (data: FieldValues) => {
        // @ts-ignore
        mutate(data, {
            onSuccess: () => {
                toast.success('La colonne a été ajoutée !')
            }
        })
    }

    return (
        <Form useForm={form} onSubmit={handleSubmit}>
            <TaskColumnFields />
            <Button isLoading={isPending} type="submit">
                Sauvegarder
            </Button>
        </Form>
    )
}
