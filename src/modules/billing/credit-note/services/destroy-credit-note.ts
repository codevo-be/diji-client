import { HttpService } from '.'
export const destroyCreditNote = async (id: number) => HttpService.delete(`/${id}`)
