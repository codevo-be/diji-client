import { InvoiceType } from '@billing/invoice/types/invoice'

import { HttpService } from '..'

export const updateBatchSelfInvoices = async (data: { self_invoice_ids: number[]; data: Partial<InvoiceType> }) => HttpService.put(`/batch`, data)
