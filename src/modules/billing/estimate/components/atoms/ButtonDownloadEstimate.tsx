import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { useDownloadEstimate } from '@billing/estimate/hooks/mutations/useDownloadEstimate'

type Props = {
    className?: string
}

export const ButtonDownloadEstimate = ({ ...props }: Props) => {
    const { id } = useParams()
    const downloadEstimate = useDownloadEstimate()

    const handleDownload = () => downloadEstimate.mutate(Number(id))

    return (
        <Button {...props} isLoading={downloadEstimate.isPending} onClick={handleDownload} intent={'grey200'}>
            Télécharger
        </Button>
    )
}
