import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { QueryProvider } from '@digico/utils'
import { Toaster } from 'sonner'

import '../css/index.css'

export const metadata: Metadata = {
    title: 'Digico'
}

type Props = Readonly<{
    children: React.ReactNode
}>

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-inter'
})

export default function RootLayout({ children }: Props) {
    return (
        <html lang="fr" className={inter.variable}>
            <body>
                <QueryProvider>{children}</QueryProvider>
                <Toaster richColors position="bottom-right" />
            </body>
        </html>
    )
}
