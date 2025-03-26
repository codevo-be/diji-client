'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createRecurringInvoice } from '@billing/recurring-invoice/services'

export const useCreateRecurringInvoice = () => {
    return useMutation({
        mutationFn: createRecurringInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['recurring-invoices']
            })

            toast.success('La facture récurrente a été créée !')
        }
    })
}
