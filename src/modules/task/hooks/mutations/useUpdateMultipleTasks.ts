'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateMultipleTasks } from '@task/services/taskItems/update-multiple-tasks'

export const useUpdateMultipleTasks = () => {
    return useMutation({
        mutationFn: updateMultipleTasks,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task_columns']
            })

            toast.success('Tâche mise à jour avec succès !')
        }
    })
}