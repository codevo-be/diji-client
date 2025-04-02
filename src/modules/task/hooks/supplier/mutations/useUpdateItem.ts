'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createTaskItem } from '@tasks/services/task-item/create-task-item'


export const useUpdateItem = () => {
    return useMutation({
        mutationFn: createTaskItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-items']
            })
        }
    })
}
