import { httpService } from '@/utils/httpService'

type Props = {
    with?: []
}

export const readProjectReportItems = async (project_id: number, report_id: number, params?: Props) => {
    const data = await httpService.get(`/api/projects/${project_id}/reports/${report_id}/items`, params)

    return {
        ...data,
        items: data.items
    }
}
