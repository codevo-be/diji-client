'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import { updateTaskColumn } from '@/modules/task/services/task-column/update-task-column'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateTaskColumn = () => {
    const { setErrors } = useErrorStore()

    return useMutation({
        mutationFn: ({ columnId, data }: { columnId: number; data: any }) =>
            updateTaskColumn(columnId, data),
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: () => {
            toast.success('La colonne a été mise à jour avec succès !')

            queryClient.invalidateQueries({ queryKey: ['task-columns'] })
        }
    })
}
