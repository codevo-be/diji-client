import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { useDestroyProject } from '@project/hooks/mutations/useDestroyProject'

import { useRouteTenant } from 'helpers/route-tenant'

export const ButtonDestroyProject = () => {
    const { id } = useParams()
    const destroyProject = useDestroyProject()

    const routerTenant = useRouteTenant()

    const onDestroy = () => {
        destroyProject.mutate(Number(id), {
            onSuccess: () => {
                routerTenant.push('/project')
            }
        })
    }

    return (
        <Button intent="error" onClick={onDestroy}>
            Supprimer
        </Button>
    )
}
