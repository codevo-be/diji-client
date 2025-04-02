'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import { updateSupplier } from '@/modules/supplier/services/supplier/update-supplier'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateSupplier = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: updateSupplier,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            setErrors(null)
            queryClient.invalidateQueries({
                queryKey: ['suppliers']
            })

            queryClient.invalidateQueries({
                queryKey: ['invoice-items']
            })
        }
    })
}
