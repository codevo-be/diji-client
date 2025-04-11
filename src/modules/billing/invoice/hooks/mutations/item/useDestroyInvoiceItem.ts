'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyInvoiceItem } from '@billing/invoice/services'

export const useDestroyInvoiceItem = () => {
    return useMutation({
        mutationFn: (data: { invoice_id: number; id: number }) => destroyInvoiceItem(data.invoice_id, data.id),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['invoice-items']
            })

            queryClient.invalidateQueries({
                queryKey: ['invoices', { id: Number(variables.invoice_id) }]
            })

            toast.success('La ligne a été supprimée !')
        }
    })
}
