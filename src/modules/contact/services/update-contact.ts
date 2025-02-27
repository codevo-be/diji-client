import { HttpService } from '@contact/services'
import { ContactType } from '@contact/types/contact'

export const updateContact = async ({ id, ...data }: Partial<Omit<ContactType, 'id'>> & { id: ContactType['id'] }) =>
    HttpService.put<{
        data: ContactType
    }>(`/${id}`, data)
