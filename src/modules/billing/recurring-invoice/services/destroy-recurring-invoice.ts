import { HttpService } from '.'

export const destroyRecurringInvoice = async (id: number) => HttpService.delete(`/${id}`)
