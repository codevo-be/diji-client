import { Button } from '@digico/ui'

import { useCreateEstimate } from '@billing/estimate/hooks/mutations'

import { useRouteTenant } from 'helpers/route-tenant'

export const ButtonCreateEstimate = () => {
    const routeWithTenant = useRouteTenant()
    const { mutate, isPending, isSuccess } = useCreateEstimate()

    const onCreateEstimate = () => {
        mutate(
            {},
            {
                onSuccess: ({ data }) => {
                    routeWithTenant.push(`/billing/estimate/${data.id}`)
                }
            }
        )
    }

    return (
        <Button isLoading={isPending || isSuccess} onClick={onCreateEstimate}>
            Créer un devis
        </Button>
    )
}
