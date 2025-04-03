import { httpService } from '@/utils/httpService'

export const destroyProjectReport = async (project_id: number, report_id: number) => httpService.delete(`/api/projects/${project_id}/reports/${report_id}`)
