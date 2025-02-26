import { HttpService } from '@billing/invoice/services'
import { InvoiceType } from '../types/invoice'

export const readInvoice = async (id: number) =>
    HttpService.get<{
        data: InvoiceType
    }>(`/${id}`)
