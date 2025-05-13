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
        <div className={"size-32 flex justify-center items-center bg-white rounded-2xl"}>
            {tenant.logoUrl && tenant.logoUrl !== '' ?
                <img src={process.env.NEXT_PUBLIC_API_URL + tenant.logoUrl} alt={`${tenant.name} logo`} className={"w-full h-full object-cover"} />
                :
                <p className={`w-full ${initials.length > 1 ? 'text-sm' : 'text-2xl' } text-main font-semibold`}>{initials}</p>
            }
        </div>
    )
}