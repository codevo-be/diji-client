'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProjectReport } from '../../services/create-project-report'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useCreateProjectReport = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: createProjectReport,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-reports']
            })
        }
    })
}
