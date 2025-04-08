import { z } from 'zod'

export const KanbanCategorySchema = z.object({
    id: z.number(),
    kanban_id: z.number(),
    name: z.string(),
    order: z.number()
})

export const KanbanCategoriesSchema = z.array(KanbanCategorySchema)
