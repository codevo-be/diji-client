import { HttpService } from '@contact/services'
import { ContactType } from '@contact/types/contact'

export const readContact = async (id: number) =>
    HttpService.get<{
        data: ContactType
    }>(`/${id}`)
