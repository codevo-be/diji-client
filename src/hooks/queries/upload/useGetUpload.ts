import { useQuery } from '@tanstack/react-query'

import getItemUploads from '../../../services/upload/get-item-uploads'

export default function useGetUpload(modelType: string, modelId: string) {

    return useQuery({
        queryKey: ['uploads', modelType, modelId],
        queryFn: () => getItemUploads(modelType, modelId),
    })
}