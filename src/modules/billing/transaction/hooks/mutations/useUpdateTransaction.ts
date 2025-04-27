'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateTransaction } from '@billing/transaction/services/update-transaction'

export const useUpdateTransaction = () => {
    return useMutation({
        mutationFn: updateTransaction,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['transactions']
            })

            toast.success('La transaction à été modifiée !')
        }
    })
}
