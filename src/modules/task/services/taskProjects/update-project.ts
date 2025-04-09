import { HttpService } from '@task/services/taskProjects'
import { ProjectType } from '@task/types/project'
import { TaskItem } from '@task/types/task_item'

export const updateProject = async (data: ProjectType) =>
    HttpService.put<{ data: TaskItem }>(`/${data.id}`, data)
