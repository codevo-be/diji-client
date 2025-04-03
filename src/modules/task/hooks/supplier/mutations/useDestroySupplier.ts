'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import { destroySupplier } from '@/modules/supplier/services/supplier/destroy-supplier'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useDestroySupplier = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: destroySupplier,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['suppliers']
            })
        }
    })
}
