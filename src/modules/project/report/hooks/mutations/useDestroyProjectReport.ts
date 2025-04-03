'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyProjectReport } from '../../services/destroy-project-report'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useDestroyProjectReport = (project_id: number, id: number) => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: () => destroyProjectReport(project_id, id),
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
