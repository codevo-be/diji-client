import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'

import { useDestroyEstimate } from '@billing/estimate/hooks/mutations'

import { useRouteTenant } from 'helpers/route-tenant'

export const DraftBox = () => {
    const { id } = useParams()
    const router = useRouteTenant()

    const destroyEstimate = useDestroyEstimate()

    const onDestroy = () => {
        destroyEstimate.mutate(Number(id), {
            onSuccess: () => {
                router.push(`/billing/estimate`)
            }
        })
    }

    return (
        <Box className="flex gap-4">
            <Button intent="error" className="flex-1" onClick={onDestroy} isLoading={destroyEstimate.isPending || destroyEstimate.isSuccess}>
                Supprimer
            </Button>
        </Box>
    )
}
