import { cookiesNext } from '@digico/utils'

interface downloadBatchInvoicesProps {
    ids: number[]
}

export default async function downloadBatchInvoices(data: downloadBatchInvoicesProps) {
    const cookies = await cookiesNext()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoices/batch/pdf`, {
        method: 'POST',
        headers: {
            Accept: 'application/zip',
            'Content-Type': 'application/json',
            'X-Tenant': cookies.get('X-tenant'),
            Authorization: cookies.get('Authorization')
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error: {
            message: string
            errors: any[]
        } = await response.json()

        throw error
    }

    const blob = await response.blob()

    const date = new Date().toISOString().split('T')[0]
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `factures-${date}.zip`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
}
