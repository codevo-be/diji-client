import { HttpService } from '@task/services/taskProjects/index'
import { ProjectType } from '@task/types/project'

export const readProject = async (id: number) =>
    HttpService.get<{
        data: ProjectType[]
    }>(`/${id}`)
