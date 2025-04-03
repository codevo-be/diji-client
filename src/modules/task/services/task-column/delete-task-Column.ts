import { httpService } from '@/utils/httpService'

export const deleteTaskColumn = async (taskId: number) => {
    return httpService.delete(`/api/task-columns/${taskId}`)
}
