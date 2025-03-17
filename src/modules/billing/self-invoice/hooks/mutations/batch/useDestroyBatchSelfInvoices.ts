'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyBatchSelfInvoices } from '@billing/self-invoice/services/batch/destroy-batch-self-invoices'

export const useDestroyBatchSelfInvoices = () => {
    return useMutation({
        mutationFn: destroyBatchSelfInvoices,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['self-invoices']
            })

            toast.success('Les factures ont été supprimées !')
        }
    })
}
