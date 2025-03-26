import { HttpService } from './..'

export const destroyRecurringInvoiceItem = async (recurring_invoice_id: number, id: number) => HttpService.delete(`/${recurring_invoice_id}/items/${id}`)
