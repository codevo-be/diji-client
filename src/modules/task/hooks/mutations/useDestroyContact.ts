'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyItem } from '@task/services/taskItems/destroy-item'


export const useDestroyTaskItem = () => {
    return useMutation({
        mutationFn: destroyItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task_columns']
            })
            toast.success('La tâche a été supprimée !')
        }
    })
}
