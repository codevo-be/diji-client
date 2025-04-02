'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateMultipleTaskItems } from '@tasks/services/task-item/update-multiple-task-items'

export const useUpdateMultipleTasks = () => {

    return useMutation({
        mutationFn: (tasks: { id: number, order: number }[]) =>
            updateMultipleTaskItems({ tasks }),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Les tâches ont été mises à jour avec succès !')
        }
    })
}

