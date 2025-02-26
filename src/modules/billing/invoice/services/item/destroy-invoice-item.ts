import { HttpService } from '@billing/invoice/services'

export const destroyInvoiceItem = async (invoice_id: number, id: number) => HttpService.delete(`/${invoice_id}/items/${id}`)
