import { HttpService } from '@contact/services'
import { ContactType } from '@contact/types/contact'

export const readContacts = async () =>
    HttpService.get<{
        data: ContactType[]
    }>(`/`)
