import { HttpService } from '@billing/invoice/services'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export const updateInvoiceItem = async ({
    invoice_id,
    id,
    ...data
}: Partial<Omit<BillingItemType, 'id'>> & { id: BillingItemType['id']; invoice_id: number }) =>
    HttpService.put<{
        data: BillingItemType
    }>(`/${invoice_id}/items/${id}`, data)
