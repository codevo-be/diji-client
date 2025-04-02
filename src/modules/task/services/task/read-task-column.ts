import { httpService } from '@/utils/httpService'

type Props = {
    with?: ['contacts']
}

export const readTaskColumn = async (params?: Props) => {
    const data = await httpService.get('/api/task-columns', params)
    return {
        ...data,
        items: data.items
    }
}
