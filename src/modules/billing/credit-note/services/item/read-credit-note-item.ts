import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from './..'

export const readCreditNoteItem = async (credit_note_id: number, id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${credit_note_id}/items/${id}`, params)
