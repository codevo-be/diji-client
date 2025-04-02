'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateSelfInvoiceItem } from '@billing/self-invoice/services/item'

export const useUpdateSelfInvoiceItem = () => {
    return useMutation({
        mutationFn: updateSelfInvoiceItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoice-items', { self_invoice_id: Number(variables.self_invoice_id) }]
            })

            queryClient.invalidateQueries({
                queryKey: ['self-invoices', { id: Number(variables.self_invoice_id) }]
            })

            toast.success('La ligne à été modifiée !')
        }
    })
}
