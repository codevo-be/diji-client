'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyGroup } from '@task/services/task-group/destroy-group'

export const useDestroyTaskGroup = () => {
    return useMutation({
        mutationFn: destroyGroup,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-groups']
            })
            toast.success('La liste de tâches a été supprimée !')
        }
    })
}
