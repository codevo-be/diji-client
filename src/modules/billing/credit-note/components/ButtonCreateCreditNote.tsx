import { Button } from '@digico/ui'

import { useCreateCreditNote } from '../hooks/mutations'

import { useRouteTenant } from 'helpers/route-tenant'

export const ButtonCreateCreditNote = () => {
    const routeWithTenant = useRouteTenant()
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
