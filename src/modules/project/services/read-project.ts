import { HttpService } from '@project/services/index'
import { ProjectType } from 'modules/project/types/project'

export const readProject = async (id: number) =>
    HttpService.get<{
        data: ProjectType
    }>(`/${id}`)
