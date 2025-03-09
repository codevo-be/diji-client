import { HttpService } from '..'

export const destroySelfInvoiceItem = async (self_invoice_id: number, id: number) => HttpService.delete(`/${self_invoice_id}/items/${id}`)
