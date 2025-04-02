import { z } from 'zod'
import { KanbanTaskSchema } from '@tasks/schemas/task.schema'


export type KanbanTaskType = z.infer<typeof KanbanTaskSchema>
