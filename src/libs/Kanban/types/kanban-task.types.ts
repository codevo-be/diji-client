import { KanbanTaskSchema } from '@tasks/schemas/task.schema'
import { z } from 'zod'

export type KanbanTaskType = z.infer<typeof KanbanTaskSchema>
