'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyEstimate } from '@billing/estimate/services'

export const useDestroyEstimate = () => {
    return useMutation({
        mutationFn: destroyEstimate,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['estimates']
            })

            toast.success('Le devis a été supprimé !')
        }
    })
}
