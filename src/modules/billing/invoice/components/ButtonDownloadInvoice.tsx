import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { useDownloadInvoice } from '../hooks/mutations/useDownloadInvoice'

type Props = {
    className?: string
}

export const ButtonDownloadInvoice = ({ ...props }: Props) => {
    const { id } = useParams()
    const downloadInvoice = useDownloadInvoice()

    const handleDownload = () => downloadInvoice.mutate(Number(id))

    return (
        <Button {...props} isLoading={downloadInvoice.isPending} onClick={handleDownload} intent={'grey200'}>
            Télécharger
        </Button>
    )
}
