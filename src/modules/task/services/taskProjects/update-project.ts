import { HttpService } from '@task/services/taskProjects'
import { TaskItem } from '@task/types/task_item'

export const updateProject = async (data: TaskItem) =>
    HttpService.put<{ data: TaskItem }>(`/${data.id}`, data)
