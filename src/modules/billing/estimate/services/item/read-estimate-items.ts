import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { HttpService } from '..'

export const readEstimateItems = async (estimate_id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: BillingItemType[]
    }>(`/${estimate_id}/items`, params)
