import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from '..'

export const updateSelfInvoiceItem = async ({
    self_invoice_id,
    id,
    ...data
}: Partial<Omit<BillingItemType, 'id'>> & { id: BillingItemType['id']; self_invoice_id: number }) =>
    HttpService.put<{
        data: BillingItemType
    }>(`/${self_invoice_id}/items/${id}`, data)
