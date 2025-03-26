import { Button } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useCreateRecurringInvoice } from '../hooks/mutations'

export const ButtonCreateRecurringInvoice = () => {
    const routeWithTenant = useRouterWithTenant()
    const { mutate, isPending, isSuccess } = useCreateRecurringInvoice()

    const onCreateRecurringInvoice = () => {
        mutate(
            {},
            {
                onSuccess: ({ data }) => {
                    routeWithTenant.push(`/billing/recurring-invoice/${data.id}`)
                }
            }
        )
    }

    return (
        <Button isLoading={isPending || isSuccess} onClick={onCreateRecurringInvoice}>
            Créer une récurrence
        </Button>
    )
}
