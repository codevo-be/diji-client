'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createEstimateItem } from '@billing/estimate/services'

export const useCreateEstimateItem = () => {
    return useMutation({
        mutationFn: createEstimateItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['estimate-items']
            })

            queryClient.invalidateQueries({
                queryKey: ['estimates', { id: Number(variables.estimate_id) }]
            })

            toast.success('La ligne a été créée !')
        }
    })
}
