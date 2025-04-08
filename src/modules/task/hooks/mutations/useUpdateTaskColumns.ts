'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateColumn } from '@task/services/taskColumns/update-column'


export const useUpdateTaskColumn = () => {
    return useMutation({
        mutationFn: updateColumn,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task_columns']
            })

            toast.success('Liste des tâches mise à jour avec succès !')
        }
    })
}
