import { HttpService } from '@contact/services'
import { ContactType } from '@contact/types/contact'

export const createContact = async (data: ContactType) => HttpService.post(`/`, data)
