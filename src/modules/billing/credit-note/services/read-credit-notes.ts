import { CreditNoteType } from '../types/credit-note'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { TransactionType } from '@billing/types/transaction'
import { ContactType } from '@contact/types/contact'

import { HttpService } from '.'

export const readCreditNotes = async (
    params?: Record<string, any>
): Promise<{
    data: (CreditNoteType & {
        items?: BillingItemType[]
        transactions?: TransactionType[]
        contact?: ContactType
    })[]
}> => HttpService.get(`/`, params)
