import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { usePrintEstimate } from '@billing/estimate/hooks/mutations/usePrintEstimate'

type Props = {
    className?: string
}

export const ButtonPrintEstimate = ({ ...props }: Props) => {
    const { id } = useParams()
    const printEstimate = usePrintEstimate()

    const onPrint = () => printEstimate.mutate(Number(id))

    return (
        <Button {...props} isLoading={printEstimate.isPending} onClick={onPrint} intent={'grey200'}>
            Imprimer
        </Button>
    )
}
