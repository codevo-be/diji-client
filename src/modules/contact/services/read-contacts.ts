import { HttpService } from '@contact/services'
import { ContactType } from '@contact/types/contact'

export const readContacts = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: ContactType[]
    }>(`/`, params)
