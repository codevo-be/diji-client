import { HttpService } from '@tasks/services/task'

export const deleteTaskColumn = async (taskId: number) => {
    return HttpService.delete(`/api/task-columns/${taskId}`)
}
