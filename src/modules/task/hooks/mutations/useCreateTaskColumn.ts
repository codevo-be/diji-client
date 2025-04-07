'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createColumn } from '@task/services/create-column'

export const useCreateTaskColumn = () => {
    return useMutation({
        mutationFn: createColumn,
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
