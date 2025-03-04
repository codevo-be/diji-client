import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { usePrintCreditNote } from '../hooks/mutations/usePrintCreditNote'

type Props = {
    className?: string
}

export const ButtonPrintCreditNote = ({ ...props }: Props) => {
    const { id } = useParams()
    const printCreditNote = usePrintCreditNote()

    const onPrint = () => printCreditNote.mutate(Number(id))

    return (
        <Button {...props} isLoading={printCreditNote.isPending} onClick={onPrint} intent={'grey200'}>
            Imprimer
        </Button>
    )
}
