import { httpService } from '@/utils/httpService'

type Props = {
    with?: ['user']
}

export const readProjectReports = async (project_id: number, params?: Props) => {
    const data = await httpService.get(`/api/projects/${project_id}/reports`, params)

    return {
        ...data,
        items: data.items
    }
}
