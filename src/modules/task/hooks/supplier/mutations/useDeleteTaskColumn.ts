'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/libs/react-query'
import {deleteTaskColumn} from "@/modules/task/services/task-column/delete-task-Column";
import { HttpServiceErrorProps } from '@/types/httpServiceError'

export const useDeleteTaskColumn = () => {
    return useMutation({
        // 🔹 Fonction pour supprimer une colonne via API
        mutationFn: deleteTaskColumn,

        onError: (error: HttpServiceErrorProps) => {
            toast.error(error.message || "Une erreur s'est produite lors de la suppression.")
        },

        onSuccess: () => {
            toast.success("Colonne supprimée avec succès !")

            // Rafraîchir la liste des colonnes après suppression
            queryClient.invalidateQueries({ queryKey: ['task-columns'] })
        }
    })
}
