import { UploadType } from '../../types/upload.types'

import { HttpService } from '.'

export default async function getItemUploads($model: string, $id: string) {
    return await HttpService.get<UploadType[]>(`/${$model}/${$id}`);
}