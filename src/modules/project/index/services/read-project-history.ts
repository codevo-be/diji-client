import { HttpService } from '@projects/index/services/index'

export const readProjectHistory = async (project_id: number) => {
    const data = await HttpService.get(`/api/projects/${project_id}/history`)

    return {
        ...data,
        items: data.items
    }
}
