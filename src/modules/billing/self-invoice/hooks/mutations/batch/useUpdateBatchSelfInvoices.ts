'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateBatchSelfInvoices } from '@billing/self-invoice/services/batch/update-batch-self-invoices'

export const useUpdateBatchSelfInvoices = () => {
    return useMutation({
        mutationFn: updateBatchSelfInvoices,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Les factures ont été modifiées !')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoices']
            })
        }
    })
}
