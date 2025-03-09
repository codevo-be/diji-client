import { Button } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useCreateSelfInvoice } from '../hooks/mutations'

export const ButtonCreateSelfInvoice = () => {
    const routeWithTenant = useRouterWithTenant()
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
