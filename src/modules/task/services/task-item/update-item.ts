import { TaskItemType } from '@task/types/task-item'

import { HttpService } from '.'

export const updateItem = async (data: Partial<TaskItemType> & { project_id: number }) =>
    HttpService.put(`/${data.project_id}/task/groups/${data.task_group_id}/items/${data.id}`, data)
