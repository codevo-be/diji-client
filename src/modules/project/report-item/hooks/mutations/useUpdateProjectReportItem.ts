'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateProjectReportItem } from '../../services/update-project-report-item'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateProjectReportItem = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: updateProjectReportItem,
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
