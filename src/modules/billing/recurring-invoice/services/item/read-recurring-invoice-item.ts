import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from './..'

export const readRecurringInvoiceItem = async (recurring_invoice_id: number, id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${recurring_invoice_id}/items/${id}`, params)
