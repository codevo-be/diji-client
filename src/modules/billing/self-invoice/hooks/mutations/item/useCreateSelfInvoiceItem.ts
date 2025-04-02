'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createSelfInvoiceItem } from '@billing/self-invoice/services/item'

export const useCreateSelfInvoiceItem = () => {
    return useMutation({
        mutationFn: createSelfInvoiceItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoice-items']
            })

            queryClient.invalidateQueries({
                queryKey: ['self-invoices', { id: Number(variables.self_invoice_id) }]
            })

            toast.success('La ligne a été créée !')
        }
    })
}
