'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createItem } from '@task/services'

export const useCreateTaskItem = () => {
    return useMutation({
        mutationFn: createItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task_columns']
            })

            toast.success('Le contact a été créé !')
        }
    })
}
