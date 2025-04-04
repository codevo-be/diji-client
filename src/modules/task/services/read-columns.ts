import { HttpService } from '@task/services'
import { ProjectType } from '@task/types/project'

export const readColumns = async (id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: ProjectType[]
    }>(`/${id}/columns`, params)
