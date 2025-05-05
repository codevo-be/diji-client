'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateTenant } from 'services/tenant'

export const useUpdateTenant = () => {
    return useMutation({
        mutationFn: updateTenant,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tenant']
            })
        }
    })
}
