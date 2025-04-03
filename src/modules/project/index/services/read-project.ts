import { httpService } from '@/utils/httpService'

type Props = {
    with?: []
}

export const readProject = async (id: number, params?: Props) => {
    const data = await httpService.get(`/api/projects/${id}`, params)

    return data.item
}
