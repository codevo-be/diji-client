import { AuthLayout } from '@components/shared/layouts'

type Props = Readonly<{
    children: React.ReactNode
}>

export default function RootLayout({ children }: Props) {
    return <AuthLayout>{children}</AuthLayout>
}
