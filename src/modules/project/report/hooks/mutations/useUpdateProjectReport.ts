'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateProjectReport } from '../../services/update-project-report'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateProjectReport = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: updateProjectReport,
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
