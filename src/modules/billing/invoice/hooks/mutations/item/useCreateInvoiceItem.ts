'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createInvoiceItem } from '@billing/invoice/services'

export const useCreateInvoiceItem = () => {
    return useMutation({
        mutationFn: createInvoiceItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoice-items']
            })

            toast.success('La ligne a été créée !')
        }
    })
}
