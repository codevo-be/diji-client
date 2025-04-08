'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProject } from '@task/services/taskProjects/create-project'

export const useCreateTaskProject = () => {
    return useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['task_projects']
            })

            toast.success('Le projet a été créé !')
        }
    })
}
