import { HttpService } from '@billing/invoice/services'
import { InvoiceType } from '@billing/invoice/types/invoice'

export const createInvoice = async (data: Partial<Omit<InvoiceType, 'id'>>) =>
    HttpService.post<{
        data: InvoiceType
    }>(`/`, data)
