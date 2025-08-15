import { getAuthenticatedUser } from 'services/auth'

import { DashboardLayout } from 'layouts/DashboardLayout'
import { AuthProvider } from 'helpers/auth-context/AuthProvider'

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const { user, tenant, tenants, modules } = await getAuthenticatedUser()

    return (
        <AuthProvider tenants={tenants} tenant={tenant} user={user} modules={modules}>
            <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
    )
}
