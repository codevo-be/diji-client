import { z } from 'zod'

import { KanbanTaskSchema } from '../schemas/task.schema'

export type KanbanTaskType = z.infer<typeof KanbanTaskSchema>
