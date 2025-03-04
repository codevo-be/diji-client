import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { useDownloadCreditNote } from '../hooks/mutations/useDownloadCreditNote'

type Props = {
    className?: string
}

export const ButtonDownloadCreditNote = ({ ...props }: Props) => {
    const { id } = useParams()
    const downloadCreditNote = useDownloadCreditNote()

    const handleDownload = () => downloadCreditNote.mutate(Number(id))

    return (
        <Button {...props} isLoading={downloadCreditNote.isPending} onClick={handleDownload} intent={'grey200'}>
            Télécharger
        </Button>
    )
}
