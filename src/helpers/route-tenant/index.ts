'use client'

import { useRouter } from 'next/navigation'

import { useAuth } from 'helpers/auth-context/useAuth'

export function useRouteTenant() {
    const router = useRouter()
    const { tenant } = useAuth()

    return {
        get: (href: string) => `/${tenant.id}${href}`,
        push: (href: string) => router.push(`/${tenant.id}${href}`)
    }
}
