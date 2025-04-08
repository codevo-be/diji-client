'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateItem } from '@task/services/update-item'

export const useUpdateTaskItem = () => {
    return useMutation({
        mutationFn: updateItem,
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
