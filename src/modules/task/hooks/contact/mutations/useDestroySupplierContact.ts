'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import { destroyContact } from '@/modules/supplier/services/contact/destroy-contact'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useDestroySupplierContact = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: (data: { supplier_id: number; id: number }) => destroyContact(data),
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
