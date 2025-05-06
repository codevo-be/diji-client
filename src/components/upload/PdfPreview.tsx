import { UploadType } from '../../types/upload.types'

import { Icon } from '@components/Icon'

export default function PdfPreview(file: UploadType) {


    return (
        <div className="w-full h-full flex items-center justify-center">
            <Icon name={"pdf"} className={"size-28"} />

        </div>
    )
}