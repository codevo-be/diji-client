'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import { updateTaskItem } from '@/modules/task/services/task-item/update-task-item'
import { useErrorStore } from '@/store/errorStore'
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useUpdateTaskItem = () => {
    const { setErrors } = useErrorStore()

    return useMutation({
        mutationFn: ({ taskId, data}: { taskId: number, data: any, previousColumnId?: number }) =>
            updateTaskItem(taskId, data),
        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message)
            setErrors(error.errors)
        },
        onSuccess: (_, { data, previousColumnId }) => {
            // Invalider et refetch les colonnes (car elles contiennent les tâches)
            queryClient.invalidateQueries({ queryKey: ['task-columns'] })

            // Si la colonne a changé, on refetch les anciennes et nouvelles colonnes
            if (previousColumnId && previousColumnId !== data.task_column_id) {
                queryClient.invalidateQueries({ queryKey: ['task-columns', { task_column_id: previousColumnId }] })
                queryClient.invalidateQueries({ queryKey: ['task-columns', { task_column_id: data.task_column_id }] })
            }
        }
    })
}
