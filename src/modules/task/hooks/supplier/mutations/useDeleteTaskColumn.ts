'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteTaskColumn } from '@tasks/services/task-column/delete-task-Column'

export const useDeleteTaskColumn = () => {
    return useMutation({
        mutationFn: deleteTaskColumn,

        onError: (error) => {
            toast.error(error.message || "Une erreur s'est produite lors de la suppression.")
        },

        onSuccess: () => {
            toast.success('Colonne supprimée avec succès !')

            queryClient.invalidateQueries({ queryKey: ['task-columns'] })
        }
    })
}
