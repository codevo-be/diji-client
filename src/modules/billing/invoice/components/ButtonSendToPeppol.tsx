import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { useSendToPeppol } from '../hooks/mutations/useSendToPeppol'

type Props = {
    className?: string
}

export const ButtonSendToPeppol = ({ ...props }: Props) => {
    const { id } = useParams()
    const sendToPeppol = useSendToPeppol()

    const handleSend = () => sendToPeppol.mutate(Number(id))

    return (
        <Button {...props} isLoading={sendToPeppol.isPending} onClick={handleSend} intent={'main'}>
            Envoyer via Peppol
        </Button>
    )
}
