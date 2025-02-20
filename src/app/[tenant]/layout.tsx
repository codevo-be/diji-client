import { AuthProvider } from 'contexts/AuthContext'

import { getAuthenticatedUser } from 'services/auth/getAuthenticatedUser'

import { DashboardLayout } from 'layouts/DashboardLayout'

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const response = await getAuthenticatedUser()

    return (
        <AuthProvider user={response.data.user} tenant={response.data.tenant}>
            <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
    )
}
