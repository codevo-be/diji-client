'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryClient } from '@digico/utils'
import { updateTaskColumn } from '@tasks/services/task-column/update-task-column'

export const useUpdateTaskColumn = () => {

    return useMutation({
        mutationFn: ({ columnId, data }: { columnId: number; data: any }) =>
            updateTaskColumn(columnId, data),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('La colonne a été mise à jour avec succès !')

            queryClient.invalidateQueries({ queryKey: ['task-columns'] })
        }
    })
}
