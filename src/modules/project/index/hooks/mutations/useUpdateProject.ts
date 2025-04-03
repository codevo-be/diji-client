'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateProject } from '../../services/update-project'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateProject = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: updateProject,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            setErrors(null)
            queryClient.invalidateQueries({
                queryKey: ['projects']
            })

            queryClient.invalidateQueries({
                queryKey: ['project-history']
            })
        }
    })
}
