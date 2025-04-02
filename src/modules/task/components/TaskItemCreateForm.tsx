'use client'

import { useParams,useRouter } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateItem } from '../hooks/supplier/mutations/useCreateItem'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/libs/button'
import { Form } from '@/libs/form'
import { TaskItemFields } from "@/modules/task/components/form/TaskItemFields"
import { routes } from '@/utils/route'

export const TaskItemCreateForm = () => {
    const { workspace } = useAuth()
    const router = useRouter()
    const { id: task_column_id } = useParams()
    const form = useForm()

    const { mutate, isPending } = useCreateItem()

    const handleSubmit = (data: FieldValues) => {
        const formData = {
            ...data,
            task_column_id: Number(task_column_id)
        }

        mutate(formData, {
            onSuccess: () => {
                toast.success('La tâche a été ajoutée !')
                router.push(routes.workspace.taskColumns.tasks.create(workspace.slug, Number(task_column_id)))
            }
        })
    }

    return (
        <Form useForm={form} onSubmit={handleSubmit}>
            <TaskItemFields />
            <Button isLoading={isPending} type="submit">
                Sauvegarder
            </Button>
        </Form>
    )
}
