import { EstimateType } from '../types/estimate'

import { HttpService } from '.'

export const createEstimate = async (data: Partial<Omit<EstimateType, 'id'>>) =>
    HttpService.post<{
        data: EstimateType
    }>(`/`, data)
