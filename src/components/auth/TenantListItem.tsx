import { TenantType } from '../../types/tenant.types'

import TenantLogo from '@components/dashboard/sidebar/TenantLogo'

interface TenantListItemProps {
    tenant: TenantType;
}

export default function TenantListItem({ tenant }: TenantListItemProps) {

    const onTenantClick = () => {
        window.location.assign(`/${tenant.id}`)
    }

    return (
        <button type={"button"} onClick={onTenantClick} className={"flex gap-16 items-center border-2 rounded p-4 pr-28 hover:cursor-pointer hover:bg-primary hover:text-white"}>
            <div className={"size-32"}>
                <TenantLogo tenant={tenant} />
            </div>
            
            <p className={"text-md basis-1/2"}>{tenant.name}</p>
        </button>
    )
}