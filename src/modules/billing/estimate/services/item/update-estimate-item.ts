import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from '..'

export const updateEstimateItem = async ({
    estimate_id,
    id,
    ...data
}: Partial<Omit<BillingItemType, 'id'>> & { id: BillingItemType['id']; estimate_id: number }) =>
    HttpService.put<{
        data: BillingItemType
    }>(`/${estimate_id}/items/${id}`, data)
