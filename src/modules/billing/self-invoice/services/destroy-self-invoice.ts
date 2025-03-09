import { HttpService } from '.'
export const destroySelfInvoice = async (id: number) => HttpService.delete(`/${id}`)
