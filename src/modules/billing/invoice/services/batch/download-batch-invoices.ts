import { cookiesNext } from '@digico/utils'

interface downloadBatchInvoicesProps {
    ids: number[];
}

export default async function downloadBatchInvoices(data: downloadBatchInvoicesProps) {
    const cookies = await cookiesNext();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoices/batch/pdf`, {
        method: 'POST',
        headers: {
            Accept: 'application/zip',
            'Content-Type': 'application/json',
            'X-Tenant': cookies.get('X-tenant'),
            Authorization: cookies.get('Authorization')
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'factures.zip'
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        })

}