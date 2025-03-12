'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyBatchCreditNotes } from '@billing/credit-note/services/batch/destroy-batch-credit-notes'

export const useDestroyBatchCreditNotes = () => {
    return useMutation({
        mutationFn: destroyBatchCreditNotes,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['credit-notes']
            })

            toast.success('Les factures ont été supprimées !')
        }
    })
}
