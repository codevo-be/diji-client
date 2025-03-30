'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyRecurringInvoiceItem } from '@billing/recurring-invoice/services'

export const useDestroyRecurringInvoiceItem = () => {
    return useMutation({
        mutationFn: (data: { recurring_invoice_id: number; id: number }) => destroyRecurringInvoiceItem(data.recurring_invoice_id, data.id),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['recurring-invoice-items']
            })

            toast.success('La ligne a été supprimée !')
        }
    })
}
