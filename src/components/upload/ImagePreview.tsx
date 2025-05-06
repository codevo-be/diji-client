import { ImageBuilder } from '@digico/ui'

import { UploadType } from '../../types/upload.types'

export default function ImagePreview(file: UploadType) {
    return (
        <>
            <ImageBuilder src={file.url}  className={"w-full h-full object-cover"}/>
        </>
    )
}