import { UploadType } from '../../types/upload.types'

import { HttpService } from '.'

export default function getItemUploads($model: string, $id: string) {
    return HttpService.get<UploadType[]>(`/${$model}/${$id}`);
}