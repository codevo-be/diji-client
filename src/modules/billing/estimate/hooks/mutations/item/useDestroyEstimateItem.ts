'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyInvoiceItem } from '@billing/invoice/services'

export const useDestroyEstimateItem = () => {
    return useMutation({
        mutationFn: (data: { estimate_id: number; id: number }) => destroyInvoiceItem(data.estimate_id, data.id),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['estimate-items']
            })

            queryClient.invalidateQueries({
                queryKey: ['estimates', { id: Number(variables.estimate_id) }]
            })

            toast.success('La ligne a été supprimée !')
        }
    })
}
