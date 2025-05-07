import { EstimateType } from '../types/estimate'

import { HttpService } from '.'

export const updateEstimate = async ({ id, ...data }: Partial<Omit<EstimateType, 'id'>> & { id: EstimateType['id'] }) => {
    if (data.contact_id === -1) { // Vérifie si le code est celui de la création.
        data.contact_id = undefined;
    }

    return HttpService.put<{
        data: EstimateType
    }>(`/${id}`, data)
}
