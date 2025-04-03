import { httpService } from '@/utils/httpService'

type Props = {
    with?: ['invoices' | 'estimates']
}

export const readProjects = async (params?: Props) => {
    const data = await httpService.get('/api/projects', params)

    return {
        ...data,
        items: data.items
    }
}
