'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateRecurringInvoice } from '@billing/recurring-invoice/services'

export const useUpdateRecurringInvoice = () => {
    return useMutation({
        mutationFn: updateRecurringInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['recurring-invoices']
            })

            toast.success('La facture récurrente à été modifiée !')
        }
    })
}
