import { httpService } from '@/utils/httpService'

export const destroyProjectReportItem = async ({ project_id, report_id, id }: { project_id: number; report_id: number; id: number }) =>
    httpService.delete(`/api/projects/${project_id}/reports/${report_id}/items/${id}`)
