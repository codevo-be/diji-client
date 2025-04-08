import { z } from 'zod'

import { TaskItemSchema } from './taskItem.schema'

export const TaskColumnSchema = z.object({
    id: z.number(),
    name: z.string(),
    order: z.number(),
    project_id: z.number(),
    tasks: z.array(z.lazy(() => TaskItemSchema))
})
