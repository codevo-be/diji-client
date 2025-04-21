import { TaskGroupType } from '@task/types/task-group'

import { HttpService } from '.'

export const updateTaskGroup = async (data: Partial<TaskGroupType> & { project_id: number }) =>
    HttpService.put(`/${data.project_id}/task/groups/${data.id}`, data)
