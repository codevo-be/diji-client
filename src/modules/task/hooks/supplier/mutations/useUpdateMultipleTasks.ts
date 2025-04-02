'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateMultipleTaskItems } from '@/modules/task/services/task-item/update-multiple-task-items'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateMultipleTasks = () => {
    const { setErrors } = useErrorStore()

    return useMutation({
        mutationFn: (tasks: { id: number, order: number }[]) =>
            updateMultipleTaskItems({ tasks }),
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            toast.success('Les tâches ont été mises à jour avec succès !')
        }
    })
}

