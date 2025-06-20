import { HttpService } from '@billing/invoice/services'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { InvoiceType } from '@billing/invoice/types/invoice'

export const createInvoice = async (data: Partial<Omit<InvoiceType, 'id'> & { items?: BillingItemType[] }>) =>
    HttpService.post<{
        data: InvoiceType
    }>(`/`, data)
