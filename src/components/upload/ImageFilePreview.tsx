import { useEffect, useState } from 'react'
import { ImageBuilder } from '@digico/ui'

import getItemUploadBlob from '../../services/upload/get-item-upload-blob'
import { UploadType } from '../../types/upload.types'

export default function ImageFilePreview(file: UploadType) {

    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        const result = getItemUploadBlob(file.url);
        result.then(r => {
            setUrl(r)
        });
    }, [])

    return (
        <div>
            <ImageBuilder src={url} className={''} />
        </div>
    )
}