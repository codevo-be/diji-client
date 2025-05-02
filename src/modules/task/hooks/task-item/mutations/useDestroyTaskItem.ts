'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyItem } from '@task/services/task-item/destroy-item'

export const useDestroyTaskItem = () => {
    return useMutation({
        mutationFn: destroyItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-groups']
            })

            toast.success('La tâche a été supprimée !')
        }
    })
}
