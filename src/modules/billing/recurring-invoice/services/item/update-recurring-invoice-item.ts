import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from './..'

export const updateRecurringInvoiceItem = async ({
    recurring_invoice_id,
    id,
    ...data
}: Partial<Omit<BillingItemType, 'id'>> & { id: BillingItemType['id']; recurring_invoice_id: number }) =>
    HttpService.put<{
        data: BillingItemType
    }>(`/${recurring_invoice_id}/items/${id}`, data)
