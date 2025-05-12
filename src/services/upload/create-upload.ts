import { HttpService } from '.'

export const createUpload = (data: FormData) =>
    HttpService.post<{
        message: string
    }>(`/`, data)
