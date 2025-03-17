import { HttpService } from '@billing/invoice/services'

export const destroyBatchInvoices = async (data: { invoice_ids: number[] }) => HttpService.delete(`/batch`, data)
