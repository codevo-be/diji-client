'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProjectReportItem } from '../../services/create-project-report-item'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useCreateProjectReportItem = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: createProjectReportItem,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-report-items']
            })
        }
    })
}
