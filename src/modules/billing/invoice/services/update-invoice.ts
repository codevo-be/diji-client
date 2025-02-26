import { HttpService } from '@billing/invoice/services'
import { InvoiceType } from '@billing/invoice/types/invoice'

export const updateInvoice = async ({ id, ...data }: Partial<Omit<InvoiceType, 'id'>> & { id: InvoiceType['id'] }) =>
    HttpService.put<{
        data: InvoiceType
    }>(`/${id}`, data)
