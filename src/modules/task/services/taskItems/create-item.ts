import { HttpService } from '@task/services/taskItems/index'
import { TaskItem } from '@task/types/task_item'

export const createItem = async (data: TaskItem) =>
    HttpService.post<{
        data: TaskItem
    }>(`/`, data)
