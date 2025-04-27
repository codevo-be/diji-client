import { HttpService } from '@project/services'
import { TaskGroupType } from '@task/types/task-group'

export const createTaskGroup = async (data: Partial<Omit<TaskGroupType, 'id'>>) =>
    HttpService.post<{
        data: TaskGroupType
    }>(`/${data.project_id}/task/groups`, data)
