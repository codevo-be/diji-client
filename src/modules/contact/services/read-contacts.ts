import { HttpService } from '@contact/services'

export const readContacts = async () => HttpService.get(`/`)
