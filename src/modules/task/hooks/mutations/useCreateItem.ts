'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createItem } from '@task/services'

export const useCreateItem = () => {
    return useMutation({
        mutationFn: createItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['items']
            })

            toast.success('Le contact a été créé !')
        }
    })
}
