import { HttpService } from '..'
export const destroyBatchSelfInvoices = async (data: { self_invoice_ids: number[] }) => HttpService.delete(`/batch`, data)
