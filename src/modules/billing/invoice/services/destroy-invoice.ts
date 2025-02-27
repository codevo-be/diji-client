import { HttpService } from '@billing/invoice/services'

export const destroyInvoice = async (id: number) => HttpService.delete(`/${id}`)
