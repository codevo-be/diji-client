'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createTaskGroup } from '@task/services/task-group/create-task-group'

export const useCreateTaskGroup = () => {
    return useMutation({
        mutationFn: createTaskGroup,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-groups']
            })

            toast.success('La liste a été créée !')
        }
    })
}
