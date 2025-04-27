import { HttpService } from '.'

export const destroyProject = async (id: number) => HttpService.delete(`/${id}`)
