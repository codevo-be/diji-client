'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createEstimate } from '@billing/estimate/services'

export const useCreateEstimate = () => {
    return useMutation({
        mutationFn: createEstimate,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['estimates']
            })

            toast.success('Le devis a été créé !')
        }
    })
}
