'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateTaskGroup } from '@task/services/task-group/update-task-group'

export const useUpdateTaskGroup = () => {
    return useMutation({
        mutationFn: updateTaskGroup,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-groups']
            })

            toast.success('Liste mise à jour avec succès !')
        }
    })
}
