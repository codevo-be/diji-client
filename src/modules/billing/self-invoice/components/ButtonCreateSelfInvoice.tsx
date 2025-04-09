import { Button } from '@digico/ui'

import { useCreateSelfInvoice } from '../hooks/mutations'

import { useRouteTenant } from 'helpers/route-tenant'

export const ButtonCreateSelfInvoice = () => {
    const routeWithTenant = useRouteTenant()
    const { mutate, isPending, isSuccess } = useCreateSelfInvoice()

    const onCreateSelfInvoice = () => {
        mutate(
            {},
            {
                onSuccess: ({ data }) => {
                    routeWithTenant.push(`/billing/self-invoice/${data.id}`)
                }
            }
        )
    }

    return (
        <Button isLoading={isPending || isSuccess} onClick={onCreateSelfInvoice}>
            Créer une autofacturation
        </Button>
    )
}
