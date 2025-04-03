'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateProjectStep } from '../../services/update-project-step'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateProjectStep = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: updateProjectStep,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-steps']
            })
        }
    })
}
