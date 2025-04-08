import { HttpService } from '@task/services'
import { TaskItem } from '@task/types/task_item'

export const updateMultipleTasks = async (data: TaskItem) =>
    HttpService.post<{ data: TaskItem }>(`/${data.id}`, data)

