import { EstimateType } from '../types/estimate'

import { HttpService } from '.'

export const updateEstimate = async ({ id, ...data }: Partial<Omit<EstimateType, 'id'>> & { id: EstimateType['id'] }) =>
    HttpService.put<{
        data: EstimateType
    }>(`/${id}`, data)
