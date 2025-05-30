'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateEstimate } from '@billing/estimate/services'

export const useUpdateEstimate = () => {
    return useMutation({
        mutationFn: updateEstimate,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['estimates']
            })

            toast.success('Le devis à été modifié !')
        }
    })
}
