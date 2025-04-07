import { HttpService } from '@task/list/services'
import { ContactType } from '@contact/types/contact'

export const createColumn = async (data: ContactType) =>
    HttpService.post<{
        data: ContactType
    }>(`/`, data)
