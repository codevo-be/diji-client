'use client'

import React, { createContext, ReactNode, useContext } from 'react'

import { TenantType } from 'types/tenant.types'
import { UserType } from 'types/user.types'

const AuthContext = createContext<
    | {
          user: UserType
          tenant: TenantType
      }
    | undefined
>(undefined)

export const AuthProvider = ({ children, user, tenant }: { children: ReactNode; tenant: TenantType; user: UserType }) => {
    return <AuthContext.Provider value={{ user, tenant }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth doit être utilisé dans AuthProvider')
    }
    return context
}
