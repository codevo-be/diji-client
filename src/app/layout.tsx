import type { Metadata } from 'next'
import '@/scss/main.scss'

export const metadata: Metadata = {
    title: 'Diji'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    )
}
