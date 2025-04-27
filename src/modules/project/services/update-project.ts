import { HttpService } from '@project/services'
import { ProjectType } from '@project/types/project'

export const updateProject = async (data: ProjectType) => HttpService.put<{ data: ProjectType }>(`/${data.id}`, data)
