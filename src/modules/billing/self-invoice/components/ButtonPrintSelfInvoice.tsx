import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { usePrintSelfInvoice } from '../hooks/mutations/usePrintSelfInvoice'

type Props = {
    className?: string
}

export const ButtonPrintSelfInvoice = ({ ...props }: Props) => {
    const { id } = useParams()
    const printSelfInvoice = usePrintSelfInvoice()

    const onPrint = () => printSelfInvoice.mutate(Number(id))

    return (
        <Button {...props} isLoading={printSelfInvoice.isPending} onClick={onPrint} intent={'grey200'}>
            Imprimer
        </Button>
    )
}
