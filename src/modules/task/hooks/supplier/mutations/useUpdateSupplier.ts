'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateSupplier } from '@tasks/services/supplier/update-supplier'

export const useUpdateSupplier = () => {
    return useMutation({
        mutationFn: updateSupplier,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['suppliers']
            })

            queryClient.invalidateQueries({
                queryKey: ['invoice-items']
            })
        }
    })
}
