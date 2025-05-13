import { TenantType } from '../../types/tenant.types'

import TenantListItem from '@components/auth/TenantListItem'

interface TenantsListProps {
    tenants: TenantType[];
}

export default function TenantsList({ tenants }: TenantsListProps) {



    return (
        <div className={"w-full flex flex-col gap-6"}>
            {tenants.map((tenant: any) => (
                <TenantListItem key={tenant.id} tenant={tenant} />
            ))}
        </div>
    )
}