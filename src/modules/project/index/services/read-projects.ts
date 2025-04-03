import { HttpService } from '@projects/index/services/index'

type Props = {
    with?: ['invoices' | 'estimates']
}

export const readProjects = async (params?: Props) => {
    const data = await HttpService.get('/api/projects', params)

    return {
        ...data,
        items: data.items
    }
}
