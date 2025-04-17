import { cookiesNext } from '@digico/utils'

interface downloadBatchCreditNotesProps {
    ids: number[];
}

export default async function downloadBatchCreditNotes(data: downloadBatchCreditNotesProps) {
    const cookies = await cookiesNext();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/credit-notes/batch/pdf`, {
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
            const date = new Date().toISOString().split('T')[0];
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `credit-notes-${date}.zip`
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        })

}