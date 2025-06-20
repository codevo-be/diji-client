import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from '..'

export const readEstimateItem = async (estimate_id: number, id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${estimate_id}/items/${id}`, params)
