'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyProject } from '@project/services'

export const useDestroyProject = () => {
    return useMutation({
        mutationFn: destroyProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects']
            })
            toast.success('Le projet a été supprimé !')
        }
    })
}
