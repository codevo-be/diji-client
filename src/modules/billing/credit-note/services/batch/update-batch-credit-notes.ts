import { InvoiceType } from '@billing/invoice/types/invoice'

import { HttpService } from '..'

export const updateBatchCreditNotes = async (data: { credit_note_ids: number[]; data: Partial<InvoiceType> }) => HttpService.put(`/batch`, data)
