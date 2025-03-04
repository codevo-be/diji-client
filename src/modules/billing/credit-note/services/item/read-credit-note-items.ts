import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from './..'

export const readCreditNoteItems = async (credit_note_id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${credit_note_id}/items`, params)
