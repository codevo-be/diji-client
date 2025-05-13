import TenantListItem from '@components/auth/TenantListItem'

interface TenantsListProps {
    tenants: any;
}

export default function TenantsList({ tenants }: TenantsListProps) {



    return (
        <div className={"w-full flex flex-col gap-4"}>
            {tenants.map((tenant: any) => (
                    <TenantListItem key={tenant.id} tenant={tenant} />
            ))}
        </div>
    )
}