import { cookiesNext } from '@digico/utils'

interface downloadBatchInvoicesProps {
    email: string;
    ids: number[];
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

    return await response.json();
}
