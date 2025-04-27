'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProject } from '@project/services'

export const useCreateProject = () => {
    return useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects']
            })

            toast.success('Le projet a été créé !')
        }
    })
}
