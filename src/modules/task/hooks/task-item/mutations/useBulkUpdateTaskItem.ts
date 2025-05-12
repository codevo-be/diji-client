'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { bulkUpdate } from '@task/services/task-item/bulk-update-item'


export const useBulkUpdate = () => {
    return useMutation({
        mutationFn: bulkUpdate,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task-groups']
            })

            toast.success('Les tâches ont été mises à jour !')
        }
    })
}
