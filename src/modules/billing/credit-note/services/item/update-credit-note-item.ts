import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from './..'

export const updateCreditNoteItem = async ({
    credit_note_id,
    id,
    ...data
}: Partial<Omit<BillingItemType, 'id'>> & { id: BillingItemType['id']; credit_note_id: number }) =>
    HttpService.put<{
        data: BillingItemType
    }>(`/${credit_note_id}/items/${id}`, data)
