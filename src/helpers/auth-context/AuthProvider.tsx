'use client'

import { createContext } from 'react'

import { ModuleType } from 'types/module.types'
import { TenantType } from 'types/tenant.types'
import { UserType } from 'types/user.types'

type Auth = {
    user: UserType
    tenants: TenantType[]
    tenant: TenantType
    modules: ModuleType[]
}

export const AuthContext = createContext<Auth>({
    user: undefined as any,
    tenants: undefined as any,
    tenant: undefined as any,
    modules: []
})

export const AuthProvider = ({ children, user, tenant, tenants, modules }: { children: React.ReactNode } & Auth) => {
    return <AuthContext.Provider value={{ user, tenant, tenants, modules }}>{children}</AuthContext.Provider>
}
