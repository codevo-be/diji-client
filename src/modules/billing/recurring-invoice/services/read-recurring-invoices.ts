import { RecurringInvoiceType } from '../types/recurring-invoice'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { ContactType } from '@contact/types/contact'

import { HttpService } from '.'

export const readRecurringInvoices = async (
    params?: Record<string, any>
): Promise<{
    data: (RecurringInvoiceType & {
        items?: BillingItemType[]
        contact?: ContactType
    })[]
}> => HttpService.get(`/`, params)
