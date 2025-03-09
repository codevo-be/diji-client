import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from '..'

export const readSelfInvoicesItems = async (self_invoice_id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${self_invoice_id}/items`, params)
