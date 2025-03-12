'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateBatchInvoices } from '@billing/invoice/services/batch/update-batch-invoices'

export const useUpdateBatchInvoices = () => {
    return useMutation({
        mutationFn: updateBatchInvoices,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Les factures ont été modifiées !')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoices']
            })
        }
    })
}
