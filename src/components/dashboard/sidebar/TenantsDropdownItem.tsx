import { queryClient } from '@digico/utils'

import { TenantType } from '../../../types/tenant.types'

import TenantLogo from '@components/dashboard/sidebar/TenantLogo'
import { useRouter } from 'next/dist/client/components/navigation'

interface TenantsDropdownItemProps {
    tenant: TenantType;
    current?: boolean;
}

export default function TenantsDropdownItem({ tenant, current = false }: TenantsDropdownItemProps) {
    const router = useRouter();
    const onTenantClicked = () => {
        queryClient.removeQueries()
        router.push(`/${tenant.name}`)
    }

    return (
        <button onClick={onTenantClicked} className={`rounded flex gap-8 items-center py-2 px-4 h-20 hover:cursor-pointer ${current ? 'bg-primary text-white' : 'group hover:bg-main text-main hover:text-white'}`}>
            <div className={"h-full aspect-square"}>
                <TenantLogo tenant={tenant} />
            </div>

            <p className={"text-md"}>{tenant.name}</p>
        </button>
    )
}