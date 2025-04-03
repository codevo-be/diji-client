import { httpService } from '@/utils/httpService'

export const destroyProjectStep = async ({ project_id, id }: { project_id: number; id: number }) =>
    httpService.delete(`/api/projects/${project_id}/steps/${id}`)
