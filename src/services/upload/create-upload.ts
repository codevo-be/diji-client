import { UploadType } from 'types/upload.types'

import { HttpService } from '.'

export const createUpload = (data: FormData) =>
    HttpService.post<{
        data: UploadType
    }>(`/`, data)
