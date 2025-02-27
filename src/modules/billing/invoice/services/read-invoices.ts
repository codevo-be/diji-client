import { HttpService } from '@billing/invoice/services'
import { InvoiceType } from '../types/invoice'

export const readInvoices = async () =>
    HttpService.get<{
        data: InvoiceType[]
    }>(`/`)
