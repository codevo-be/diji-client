import { httpService } from '@/utils/httpService'

export const deleteTaskItem = async (taskId: number) => {
    return httpService.delete(`/api/task-items/${taskId}`)
}
