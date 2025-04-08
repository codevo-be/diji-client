'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateProject } from '@task/services/taskProjects/update-project'


export const useUpdateProject = () => {
    return useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task_projects']
            })
            toast.success('Le contact a été modifié !')
        }
    })
}
