import { HttpService } from '@billing/invoice/services'
import { InvoiceType } from '../types/invoice'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { TransactionType } from '@billing/types/transaction'
import { ContactType } from '@contact/types/contact'

export const readInvoice = async (id: number, params?: Record<string, any>) => {
    return HttpService.get<{
        data: InvoiceType & {
            items?: BillingItemType[]
            transactions?: TransactionType[]
            contact?: ContactType
        }
    }>(`/${id}`, params).then((response) => {
        return response.data
    })
}
