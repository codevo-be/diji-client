'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createSelfInvoice } from '@billing/self-invoice/services'

export const useCreateSelfInvoice = () => {
    return useMutation({
        mutationFn: createSelfInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoices']
            })

            toast.success('La facture a été créé !')
        }
    })
}
