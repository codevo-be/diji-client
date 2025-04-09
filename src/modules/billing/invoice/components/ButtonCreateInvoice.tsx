import { Button } from '@digico/ui'

import { useCreateInvoice } from '@billing/invoice/hooks/mutations'

import { useRouteTenant } from 'helpers/route-tenant'

export const ButtonCreateInvoice = () => {
    const routeWithTenant = useRouteTenant()
    const { mutate, isPending, isSuccess } = useCreateInvoice()

    const onCreateInvoice = () => {
        mutate(
            {},
            {
                onSuccess: ({ data }) => {
                    routeWithTenant.push(`/billing/invoice/${data.id}`)
                }
            }
        )
    }

    return (
        <Button isLoading={isPending || isSuccess} onClick={onCreateInvoice}>
            Créer une facture
        </Button>
    )
}
