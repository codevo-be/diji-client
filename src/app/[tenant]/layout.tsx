import { getAuthenticatedUser } from 'services/auth'

import { DashboardLayout } from 'layouts/DashboardLayout'
import { AuthProvider } from 'helpers/auth-context/AuthProvider'

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const authenticatedUser = await getAuthenticatedUser()

    return (
        <AuthProvider { ...authenticatedUser }>
            <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
    )
}
