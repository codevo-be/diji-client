interface TenantListItemProps {
    tenant: any;
}

export default function TenantListItem({ tenant }: TenantListItemProps) {

    const onTenantClick = () => {
        window.location.assign(`/${tenant.id}`)
    }

    return (
        <button type={"button"} onClick={onTenantClick} className={"flex items-center border-2 rounded p-4 hover:cursor-pointer hover:bg-primary hover:text-white"}>
            <p>{tenant.name}</p>
        </button>
    )
}