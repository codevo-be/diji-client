import { HttpService } from '@billing/invoice/services'
import { InvoiceType } from '../types/invoice'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { TransactionType } from '@billing/types/transaction'
import { ContactType } from '@contact/types/contact'

export const readInvoices = async (
    params?: Record<string, any>
): Promise<{
    data: (InvoiceType & {
        items?: BillingItemType[]
        transactions?: TransactionType[]
        contact?: ContactType
    })[]
}> => HttpService.get(`/`, params)
