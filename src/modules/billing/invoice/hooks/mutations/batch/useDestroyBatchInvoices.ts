'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyBatchInvoices } from '@billing/invoice/services/batch/destroy-batch-invoices'

export const useDestroyBatchInvoices = () => {
    return useMutation({
        mutationFn: destroyBatchInvoices,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoices']
            })

            toast.success('Les factures ont été supprimées !')
        }
    })
}
