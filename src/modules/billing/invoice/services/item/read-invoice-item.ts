import { HttpService } from '@billing/invoice/services'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export const readInvoiceItem = async (invoice_id: number, id: number) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${invoice_id}/items/${id}`)
