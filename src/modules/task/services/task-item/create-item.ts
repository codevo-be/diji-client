import { TaskItemType } from '@task/types/task-item'

import { HttpService } from '.'

export const createItem = async (data: Partial<Omit<TaskItemType, 'id'>> & { project_id: number; task_group_id: number }) =>
    HttpService.post<{
        data: TaskItemType
    }>(`/${data.project_id}/task/groups/${data.task_group_id}/items`, data)
