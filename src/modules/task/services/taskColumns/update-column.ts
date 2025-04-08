import { HttpService } from '@task/services/taskColumns/index'
import { TaskItem } from '@task/types/task_item'

export const updateColumn = async (data: any) =>
    HttpService.put<{ data: TaskItem }>(`/${data.columnId}`, data)
