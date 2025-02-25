import { DashboardLayout } from 'layouts/DashboardLayout'

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return <DashboardLayout>{children}</DashboardLayout>
}
