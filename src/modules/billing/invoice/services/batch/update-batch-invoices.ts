import { HttpService } from '@billing/invoice/services'
import { InvoiceType } from '@billing/invoice/types/invoice'

export const updateBatchInvoices = async (data: { invoice_ids: number[]; data: Partial<InvoiceType> }) => HttpService.put(`/batch`, data)
