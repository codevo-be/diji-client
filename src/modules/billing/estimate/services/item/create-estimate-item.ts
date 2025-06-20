import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from '..'

export const createEstimateItem = async ({ estimate_id, ...data }: Partial<Omit<BillingItemType, 'id'>> & { estimate_id: number }) =>
    HttpService.post<{
        data: BillingItemType
    }>(`/${estimate_id}/items`, data)
