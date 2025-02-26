'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateInvoice } from '@billing/invoice/services'

export const useUpdateInvoice = () => {
    return useMutation({
        mutationFn: updateInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['invoices', { id: variables.id }]
            })

            toast.success('La facture à été modifiée !')
        }
    })
}
