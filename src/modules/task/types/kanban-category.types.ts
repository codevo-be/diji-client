import { z } from 'zod'

import { KanbanCategorySchema } from '../schemas/category.schema'

export type KanbanCategoryType = z.infer<typeof KanbanCategorySchema>
