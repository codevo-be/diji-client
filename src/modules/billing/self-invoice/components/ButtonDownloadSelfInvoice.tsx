import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { useDownloadSelfInvoice } from '../hooks/mutations/useDownloadSelfInvoice'

type Props = {
    className?: string
}

export const ButtonDownloadSelfInvoice = ({ ...props }: Props) => {
    const { id } = useParams()
    const downloadSelfInvoice = useDownloadSelfInvoice()

    const handleDownload = () => downloadSelfInvoice.mutate(Number(id))

    return (
        <Button {...props} isLoading={downloadSelfInvoice.isPending} onClick={handleDownload} intent={'grey200'}>
            Télécharger
        </Button>
    )
}
