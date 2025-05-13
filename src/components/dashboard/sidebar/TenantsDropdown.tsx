import { TenantType } from '../../../types/tenant.types'

import TenantsDropdownItem from '@components/dashboard/sidebar/TenantsDropdownItem'

interface TenantsDropdownProps {
    tenants: TenantType[];
    currentTenant: TenantType;
}

export default function TenantsDropdown({ tenants, currentTenant }: TenantsDropdownProps) {

    return (
        <ul className="w-full p-4 bg-grey-400 text-main flex flex-col gap-2 rounded">
            {currentTenant && (
                <TenantsDropdownItem tenant={currentTenant} current />
            )}

            {tenants
                .filter((tenant) => tenant.id !== currentTenant?.id)
                .map((tenant) => (
                    <TenantsDropdownItem key={tenant.id} tenant={tenant} />
                ))}
        </ul>

    )
}