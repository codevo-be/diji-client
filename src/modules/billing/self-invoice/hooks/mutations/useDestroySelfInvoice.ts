'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroySelfInvoice } from '@billing/self-invoice/services'

export const useDestroySelfInvoice = () => {
    return useMutation({
        mutationFn: destroySelfInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoices']
            })
            toast.success('La facture a été supprimée !')
        }
    })
}
