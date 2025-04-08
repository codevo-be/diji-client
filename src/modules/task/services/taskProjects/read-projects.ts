import { HttpService } from '@task/services/taskProjects/index'
import { ProjectType } from '@task/types/project'

export const readProjects = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: ProjectType[]
    }>(`/`, params)
