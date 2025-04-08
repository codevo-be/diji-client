import { HttpService } from '@task/services/taskProjects'
import { ContactType } from '@contact/types/contact'

export const createProject = async (data: ContactType) =>
    HttpService.post<{
        data: ContactType
    }>(`/`, data)
