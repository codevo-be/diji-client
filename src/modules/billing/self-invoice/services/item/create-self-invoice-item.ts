import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from '..'

export const createSelfInvoiceItem = async ({ self_invoice_id, ...data }: Partial<Omit<BillingItemType, 'id'>> & { self_invoice_id: number }) =>
    HttpService.post<{
        data: BillingItemType
    }>(`/${self_invoice_id}/items`, data)
