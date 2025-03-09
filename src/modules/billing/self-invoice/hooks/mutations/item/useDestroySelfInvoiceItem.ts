'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroySelfInvoiceItem } from '@billing/self-invoice/services/item'

export const useDestroySelfInvoiceItem = () => {
    return useMutation({
        mutationFn: (data: { self_invoice_id: number; id: number }) => destroySelfInvoiceItem(data.self_invoice_id, data.id),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoice-items']
            })

            toast.success('La ligne a été supprimée !')
        }
    })
}
