import { CreditNoteType } from '../types/credit-note'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { TransactionType } from '@billing/transaction/types/transaction'
import { ContactType } from '@contact/types/contact'

import { HttpService } from '.'

export const readCreditNote = async (id: number, params?: Record<string, any>) => {
    return HttpService.get<{
        data: CreditNoteType & {
            items?: BillingItemType[]
            transactions?: TransactionType[]
            contact?: ContactType
        }
    }>(`/${id}`, params).then((response) => {
        return response.data
    })
}
