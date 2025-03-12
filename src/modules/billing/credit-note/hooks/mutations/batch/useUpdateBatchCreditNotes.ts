'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateBatchCreditNotes } from '@billing/credit-note/services/batch/update-batch-credit-notes'

export const useUpdateBatchCreditNotes = () => {
    return useMutation({
        mutationFn: updateBatchCreditNotes,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Les factures ont été modifiées !')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['credit-notes']
            })
        }
    })
}
