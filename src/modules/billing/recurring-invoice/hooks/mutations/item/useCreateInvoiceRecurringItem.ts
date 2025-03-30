'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createRecurringInvoiceItem } from '@billing/recurring-invoice/services'

export const useCreateRecurringInvoiceItem = () => {
    return useMutation({
        mutationFn: createRecurringInvoiceItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['recurring-invoice-items']
            })

            toast.success('La ligne a été créée !')
        }
    })
}
