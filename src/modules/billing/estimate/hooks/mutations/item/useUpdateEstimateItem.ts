'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateEstimateItem } from '@billing/estimate/services'

export const useUpdateEstimateItem = () => {
    return useMutation({
        mutationFn: updateEstimateItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['estimate-items', { invoice_id: Number(variables.estimate_id) }]
            })

            queryClient.invalidateQueries({
                queryKey: ['estimates', { id: Number(variables.estimate_id) }]
            })

            toast.success('La ligne à été modifiée !')
        }
    })
}
