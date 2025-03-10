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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoices']
            })

            toast.success('La facture à été modifiée !')
        }
    })
}
