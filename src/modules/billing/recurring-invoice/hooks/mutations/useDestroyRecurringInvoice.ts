'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyRecurringInvoice } from '@billing/recurring-invoice/services'

export const useDestroyRecurringInvoice = () => {
    return useMutation({
        mutationFn: destroyRecurringInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['recurring-invoices']
            })

            toast.success('La facture récurrente a été supprimée !')
        }
    })
}
