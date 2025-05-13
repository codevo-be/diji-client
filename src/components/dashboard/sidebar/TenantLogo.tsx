import { TenantType } from '../../../types/tenant.types'

interface TenantLogoProps {
    tenant: TenantType
}

export default function TenantLogo({ tenant }: TenantLogoProps) {

    const initials = tenant.name.split(' ').slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();

    return (
        <>
            <p className={`${initials.length > 1 ? 'text-sm' : 'text-2xl' } text-main font-semibold`}>{initials}</p>
        </>
    )
}