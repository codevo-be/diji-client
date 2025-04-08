'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateMultipleTasks = () => {
    return useMutation({
        mutationFn: async (tasks: { id: number, order: number }[]) => {
            console.log('[MOCK] Mise à jour simulée des tâches :', tasks) // todo
            return new Promise((resolve) => setTimeout(resolve, 300)) // petit délai simulé
        },
        onError: () => {
            toast.error("Erreur simulée.")
        },
        onSuccess: () => {
            toast.success("Les tâches ont été mises à jour avec succès !")
        },
    })
}
