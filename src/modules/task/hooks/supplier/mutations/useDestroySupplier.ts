'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroySupplier } from '@tasks/services/supplier/destroy-supplier'

export const useDestroySupplier = () => {
    return useMutation({
        mutationFn: destroySupplier,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['suppliers']
            })
        }
    })
}
