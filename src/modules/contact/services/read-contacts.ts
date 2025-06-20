import { HttpService } from '@contact/services'
import { ContactType } from '@contact/types/contact'
import { PaginateType } from 'types/paginate'

export const readContacts = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: ContactType[]
        meta: PaginateType
    }>(`/`, params)
