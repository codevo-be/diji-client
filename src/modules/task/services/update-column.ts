import { HttpService } from '@task/list/services'
import { TaskItem } from '@task/types/task_item'

export const updateColumn = async (data: any) =>
    HttpService.put<{ data: TaskItem }>(`/${data.columnId}`, data)
