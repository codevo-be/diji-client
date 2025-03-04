import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from './..'

export const createCreditNoteItem = async ({ credit_note_id, ...data }: Partial<Omit<BillingItemType, 'id'>> & { credit_note_id: number }) =>
    HttpService.post<{
        data: BillingItemType
    }>(`/${credit_note_id}/items`, data)
