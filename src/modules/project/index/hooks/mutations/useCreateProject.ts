'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProject } from '../../services/create-project'

import { queryClient } from '@/libs/react-query'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useCreateProject = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: createProject,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects']
            })

            queryClient.invalidateQueries({
                queryKey: ['project-history']
            })
        }
    })
}
