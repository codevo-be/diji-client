'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateSelfInvoice } from '@billing/self-invoice/services'

export const useUpdateSelfInvoice = () => {
    return useMutation({
        mutationFn: updateSelfInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoices', { id: variables.id }]
            })
            toast.success('La facture a été modifiée !')
        }
    })
}
