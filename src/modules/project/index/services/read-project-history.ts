import { httpService } from '@/utils/httpService'

export const readProjectHistory = async (project_id: number) => {
    const data = await httpService.get(`/api/projects/${project_id}/history`)

    return {
        ...data,
        items: data.items
    }
}
