'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateInvoiceItem } from '@billing/invoice/services'

export const useUpdateInvoiceItem = () => {
    return useMutation({
        mutationFn: updateInvoiceItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['invoice-items', { invoice_id: Number(variables.invoice_id) }]
            })

            toast.success('La ligne à été modifiée !')
        }
    })
}
