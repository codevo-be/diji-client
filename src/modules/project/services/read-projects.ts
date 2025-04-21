import { HttpService } from '@project/services/index'
import { ProjectType } from '@project/types/project'
import { PaginateType } from 'types/paginate'

export const readProjects = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: ProjectType[]
        meta: PaginateType
    }>(`/`, params)
