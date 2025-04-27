import { HttpService } from '@project/services'
import { ProjectType } from '@project/types/project'

export const createProject = async (data: ProjectType) =>
    HttpService.post<{
        data: ProjectType
    }>(`/`, data)
