import { z } from 'zod'

import { TaskColumnSchema } from '../schemas/taskColumn.schema' // Ajoute ce fichier si nécessaire
import { TaskItemSchema } from '../schemas/taskItem.schema'

// Définition du type pour une colonne
export type TaskColumnType = z.infer<typeof TaskColumnSchema>

// Définition du type pour une tâche (avec la colonne associée)
export type TaskItemType = z.infer<typeof TaskItemSchema> & {
    column?: TaskColumnType
}
