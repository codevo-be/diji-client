import { cookiesNext } from '@digico/utils'

export const createCsv = async (data: { filename: string; head: string[]; items: Record<string, any>[] }) => {
    const cookies = await cookiesNext()

    const response = await fetch(String(process.env.NEXT_PUBLIC_API_URL) + '/api/csv', {
        headers: {
            Accept: 'text/csv',
            'Content-Type': 'application/json',
            'X-Tenant': cookies.get('X-tenant'),
            Authorization: cookies.get('Authorization')
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    document.body.appendChild(a)
    a.download = data.filename
    a.click()
    a.remove()
}
