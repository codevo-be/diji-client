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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoice-items']
            })

            toast.success('La ligne a été créée !')
        }
    })
}
