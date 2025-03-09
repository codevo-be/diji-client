import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from '..'

export const readSelfInvoiceItem = async (self_invoice_id: number, id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${self_invoice_id}/items/${id}`, params)
