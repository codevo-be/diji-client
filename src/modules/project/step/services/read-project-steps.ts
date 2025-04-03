import { httpService } from '@/utils/httpService'

type Props = {
    with?: []
}

export const readProjectSteps = async (project_id: number, params?: Props) => {
    const data = await httpService.get(`/api/projects/${project_id}/steps`, params)

    return {
        ...data,
        items: data.items
    }
}
