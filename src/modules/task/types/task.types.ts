import { TaskColumnSchema } from '@task/schemas/taskColumn.schema'
import { TaskItemSchema } from '@task/schemas/taskItem.schema'
import { z } from 'zod'


export type TaskColumnType = z.infer<typeof TaskColumnSchema>

export type TaskItemType = z.infer<typeof TaskItemSchema> & {
    column?: TaskColumnType
}
