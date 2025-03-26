import { RecurringInvoiceType } from '../types/recurring-invoice'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { ContactType } from '@contact/types/contact'

import { HttpService } from '.'

export const readRecurringInvoice = async (id: number, params?: Record<string, any>) => {
    return HttpService.get<{
        data: RecurringInvoiceType & {
            items?: BillingItemType[]
            contact?: ContactType
        }
    }>(`/${id}`, params).then((response) => {
        return response.data
    })
}
