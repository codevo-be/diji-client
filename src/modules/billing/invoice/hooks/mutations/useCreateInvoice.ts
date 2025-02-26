'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createInvoice } from '@billing/invoice/services'

export const useCreateInvoice = () => {
    return useMutation({
        mutationFn: createInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoices']
            })

            toast.success('La facture a été créée !')
        }
    })
}
