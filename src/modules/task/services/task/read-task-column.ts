import { HttpService } from '@tasks/services/task/index'

type Props = {
    with?: ['contacts']
}

export const readTaskColumn = async (params?: Props) => {
    const data = await HttpService.get('/api/task-columns', params)
    return {
        ...data,
        items: data.items
    }
}
