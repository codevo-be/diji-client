import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from './..'

export const createRecurringInvoiceItem = async ({ recurring_invoice_id, ...data }: Partial<Omit<BillingItemType, 'id'>> & { recurring_invoice_id: number }) =>
    HttpService.post<{
        data: BillingItemType
    }>(`/${recurring_invoice_id}/items`, data)
