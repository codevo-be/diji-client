import { TaskItemType } from '@task/types/task-item'

import { HttpService } from '.'

export const bulkUpdate = async (
    data: { project_id: number } & {
        tasks: Array<Pick<TaskItemType, 'id' | 'position' | 'task_group_id'>>
    }
) => HttpService.put(`/${data.project_id}/task/items/bulk`, data)
