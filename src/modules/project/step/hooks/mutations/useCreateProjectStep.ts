'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProjectStep } from '../../services/create-project-step'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useCreateProjectStep = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: createProjectStep,
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
