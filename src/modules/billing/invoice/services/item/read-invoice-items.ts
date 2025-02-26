import { HttpService } from '@billing/invoice/services'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export const readInvoicesItems = async (invoice_id: number) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${invoice_id}/items`)
