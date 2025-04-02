'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateTaskItem } from '@tasks/services/task-item/update-task-item'

export const useUpdateTaskItem = () => {

    return useMutation({
        mutationFn: ({ taskId, data}: { taskId: number, data: any, previousColumnId?: number }) =>
            updateTaskItem(taskId, data),
        onError: (error) => {
            toast.error(error.message)
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
