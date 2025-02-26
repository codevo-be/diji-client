import { Button } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useCreateInvoice } from '@billing/invoice/hooks/mutations'

export const ButtonCreateInvoice = () => {
    const routeWithTenant = useRouterWithTenant()
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
