import { z } from 'zod'

export const TaskItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    status: z.enum(['pending', 'in_progress', 'completed']),
    priority: z.number().min(1).max(5),
    task_column_id: z.number(),
})
