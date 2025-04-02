'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import { createContact } from '@/modules/supplier/services/contact/create-contact'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useCreateSupplierContact = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: createContact,
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
