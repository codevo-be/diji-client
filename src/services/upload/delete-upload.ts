import { HttpService } from '.'

export default async function deleteUpload(uploadId: string) {
    return await HttpService.delete(`/${uploadId}`);
}