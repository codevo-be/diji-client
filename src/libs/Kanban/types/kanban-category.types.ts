import { z } from 'zod'
import { KanbanCategorySchema } from '@tasks/schemas/category.schema'


export type KanbanCategoryType = z.infer<typeof KanbanCategorySchema>
