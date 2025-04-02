import { z } from 'zod'

export const KanbanTaskSchema = z.object({
    id: z.number(),
    category_id: z.number(),
    title: z.string(),
    content: z.string().nullable(),
    sum: z.number().nullable(),
    order: z.number()
})

export const KanbanTasksSchema = z.array(KanbanTaskSchema)
