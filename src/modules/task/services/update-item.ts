import { HttpService } from '@task/services'
import { TaskItem } from '@task/types/task_item'

export const updateItem = async (data: TaskItem) =>
    HttpService.put<{ data: TaskItem }>(`/${data.id}`, data)
