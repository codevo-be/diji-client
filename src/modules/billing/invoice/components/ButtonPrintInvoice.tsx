import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { usePrintInvoice } from '../hooks/mutations/usePrintInvoice'

type Props = {
    className?: string
}

export const ButtonPrintInvoice = ({ ...props }: Props) => {
    const { id } = useParams()
    const printInvoice = usePrintInvoice()

    const onPrint = () => printInvoice.mutate(Number(id))

    return (
        <Button {...props} isLoading={printInvoice.isPending} onClick={onPrint} intent={'grey200'}>
            Imprimer
        </Button>
    )
}
