'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateRecurringInvoiceItem } from '@billing/recurring-invoice/services'

export const useUpdateRecurringInvoiceItem = () => {
    return useMutation({
        mutationFn: updateRecurringInvoiceItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['recurring-invoice-items', { invoice_id: Number(variables.recurring_invoice_id) }]
            })

            toast.success('La ligne à été modifiée !')
        }
    })
}
