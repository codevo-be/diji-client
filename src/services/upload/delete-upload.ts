import { HttpService } from './index'

export default async function deleteUpload(uploadId: string) {
    return await HttpService.delete(`/${uploadId}`);
}