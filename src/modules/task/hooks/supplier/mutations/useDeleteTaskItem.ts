'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteTaskColumn } from '@tasks/services/task-column/delete-task-Column'

export const useDeleteTaskItem = () => {
    return useMutation({
        mutationFn: deleteTaskColumn,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-columns']
            }) // Met à jour la liste des colonnes & tâches
        }
    })
}
