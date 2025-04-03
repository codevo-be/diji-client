import { HttpService } from '@projects/index/services/index'

type Props = {
    with?: []
}

export const readProject = async (id: number, params?: Props) => {
    const data = await HttpService.get(`/api/projects/${id}`, params)

    return data.item
}
