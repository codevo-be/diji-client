'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import { createTaskColumn } from '@/modules/task/services/supplier/create-task-column'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useCreateSupplier = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: createTaskColumn,
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
