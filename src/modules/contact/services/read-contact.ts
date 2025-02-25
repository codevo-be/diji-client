import { HttpService } from '@contact/services'

export const readContact = async (id: number) => HttpService.get(`/${id}`)
