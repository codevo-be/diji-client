import { queryClient } from '@digico/utils'

import { TenantType } from '../../../types/tenant.types'

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
        <button onClick={onTenantClicked} className={`flex gap-8 items-center py-2 px-4 h-20 hover:cursor-pointer ${current ? 'bg-main text-white' : 'group hover:bg-main text-main hover:text-white'}`}>
            <div className={`${current ? 'bg-white' : 'bg-main group-hover:bg-white'} h-full aspect-square`}>

            </div>

            <p className={"text-md"}>{tenant.name}</p>
        </button>
    )
}