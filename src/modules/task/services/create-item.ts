import { HttpService } from '@task/services'
import { ContactType } from '@contact/types/contact'

export const createItem = async (data: ContactType) =>
    HttpService.post<{
        data: ContactType
    }>(`/`, data)
