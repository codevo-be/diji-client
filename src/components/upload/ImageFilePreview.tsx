import { ImageBuilder } from '@digico/ui'

import { UploadType } from '../../types/upload.types'

export default function ImageFilePreview(file: UploadType) {

    return (
        <div>
            <ImageBuilder src={file.url} className={''} />
        </div>
    )
}