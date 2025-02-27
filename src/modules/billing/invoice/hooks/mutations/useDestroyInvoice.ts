'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyInvoice } from '@billing/invoice/services'

export const useDestroyInvoice = () => {
    return useMutation({
        mutationFn: destroyInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoices']
            })

            toast.success('La facture a été supprimée !')
        }
    })
}
