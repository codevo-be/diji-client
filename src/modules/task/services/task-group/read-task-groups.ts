import { HttpService } from '@project/services/index'
import { TaskGroupType } from '@task/types/task-group'
import { PaginateType } from 'types/paginate'

export const readTaskGroups = async (project_id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: TaskGroupType[]
        meta?: PaginateType
    }>(`/${project_id}/task/groups`, params)
