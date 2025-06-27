import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from 'services/auth'

type Props = Readonly<{
    children: React.ReactNode
}>

export default async function RootLayout({ children }: Props) {
    let data

    try {
        data = await getAuthenticatedUser()
    } catch {
        return <>{children}</>
    }

    return redirect(`/${data.tenant.id}`)
}
