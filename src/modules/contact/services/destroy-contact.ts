import { HttpService } from '@contact/services'

export const destroyContact = async (id: number) => HttpService.delete(`/${id}`)
