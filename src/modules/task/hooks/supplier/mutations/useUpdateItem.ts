'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import { createTaskItem } from '@/modules/task/services/task-item/create-task-item'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateItem = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: createTaskItem,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-items']
            })
        }
    })
}
