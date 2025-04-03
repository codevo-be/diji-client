'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateSupplier } from '../hooks/supplier/mutations/useCreateSupplier'

import { TaskColumnFields } from './form/TaskColumnFields'

import { Button } from '@/libs/button'
import { Form } from '@/libs/form'

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
