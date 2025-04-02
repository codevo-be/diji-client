import { z } from 'zod'

export const KanbanSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string()
})

export const KanbansSchema = z.array(KanbanSchema)
