import { cookiesNext } from '@digico/utils'

export const downloadInvoice = async (id: number) => {
    const cookies = await cookiesNext()
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoices/${id}/pdf`, {
        method: 'GET',
        headers: {
            Accept: 'application/pdf',
            'Content-Type': 'application/json',
            'X-Tenant': cookies.get('X-tenant'),
            Authorization: cookies.get('Authorization')
        }
    })
        .then((result) => result.blob())
        .then((result) => {
            const url = window.URL.createObjectURL(result)
            const a = document.createElement('a')
            a.href = url
            a.download = `invoice-${id}.pdf`
            document.body.appendChild(a)
            a.click()
            a.remove()
        })
}
