import { HttpService } from '@billing/invoice/services'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export const createInvoiceItem = async ({ invoice_id, ...data }: Partial<Omit<BillingItemType, 'id'>> & { invoice_id: number }) =>
    HttpService.post<{
        data: BillingItemType
    }>(`/${invoice_id}/items`, data)
