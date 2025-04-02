'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import {deleteTaskColumn} from "@/modules/task/services/task-column/delete-task-Column";
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useDeleteTaskItem = () => {
    const { setErrors } = useErrorStore()
    return useMutation({
        mutationFn: deleteTaskColumn,
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-columns']
            }) //  Met à jour la liste des colonnes & tâches
        }
    })
}
