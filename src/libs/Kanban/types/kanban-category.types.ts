import { KanbanCategorySchema } from '@tasks/schemas/category.schema'
import { z } from 'zod'

export type KanbanCategoryType = z.infer<typeof KanbanCategorySchema>
