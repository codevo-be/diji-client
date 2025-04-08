import { HttpService } from '@task/services/taskColumns/index'
import { ContactType } from '@contact/types/contact'

export const createColumn = async (data: ContactType) =>
    HttpService.post<{
        data: ContactType
    }>(`/`, data)
