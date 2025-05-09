import { getAuthenticatedUser } from 'services/auth'

import { DashboardLayout } from 'layouts/DashboardLayout'
import { ModalProvider } from '@components/modal/ModalProvider'
import { AuthProvider } from 'helpers/auth-context/AuthProvider'

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const { user, tenant, modules } = await getAuthenticatedUser()

    return (
        <AuthProvider tenant={tenant} user={user} modules={modules}>
            <ModalProvider>
                <DashboardLayout>{children}</DashboardLayout>
            </ModalProvider>
        </AuthProvider>
    )
}
