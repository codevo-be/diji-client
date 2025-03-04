import { Button } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useCreateCreditNote } from '../hooks/mutations'

export const ButtonCreateCreditNote = () => {
    const routeWithTenant = useRouterWithTenant()
    const { mutate, isPending, isSuccess } = useCreateCreditNote()

    const onCreateCreditNote = () => {
        mutate(
            {},
            {
                onSuccess: ({ data }) => {
                    routeWithTenant.push(`/billing/credit-note/${data.id}`)
                }
            }
        )
    }

    return (
        <Button isLoading={isPending || isSuccess} onClick={onCreateCreditNote}>
            Créer une note de crédit
        </Button>
    )
}
