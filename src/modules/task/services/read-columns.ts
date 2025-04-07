import { HttpService } from '@task/project/services'
import { ProjectType } from '@task/types/project'

export const readColumns = async (id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: ProjectType[]
    }>(`/${id}/columns`, params)
