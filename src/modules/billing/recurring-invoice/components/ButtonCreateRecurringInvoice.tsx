import { Button } from '@digico/ui'

import { useCreateRecurringInvoice } from '../hooks/mutations'

import { useRouteTenant } from 'helpers/route-tenant'

export const ButtonCreateRecurringInvoice = () => {
    const routeWithTenant = useRouteTenant()
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
