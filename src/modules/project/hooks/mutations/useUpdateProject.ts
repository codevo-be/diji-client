'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateProject } from '@project/services/update-project'

export const useUpdateProject = () => {
    return useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects']
            })
            toast.success('Le projet a été modifié !')
        }
    })
}
