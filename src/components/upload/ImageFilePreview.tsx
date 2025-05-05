import { ImageBuilder } from '@digico/ui'

import { UploadType } from '../../types/upload.types'

export default function ImageFilePreview(file: UploadType) {

    console.log(file);

    return (
        <div>
            <ImageBuilder src={file.url}  className={""}/>
        </div>
    )
}