import { cookiesNext } from '@digico/utils'

export const downloadEstimate = async (id: number) => {
    const cookies = await cookiesNext()
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estimates/${id}/pdf`, {
        method: 'GET',
        headers: {
            Accept: 'application/pdf',
            'Content-Type': 'application/json',
            'X-Tenant': cookies.get('X-tenant'),
            Authorization: cookies.get('Authorization')
        }
    })
        .then((response) => {
            const disposition = response.headers.get('Content-Disposition')
            let filename = 'document.pdf'

            if (disposition && disposition.includes('filename=')) {
                filename = disposition.split('filename=')[1].replace(/["']/g, '')
            }

            return response.blob().then((blob) => ({ blob, filename }))
        })
        .then(({ blob, filename }) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            a.remove()
        })
}
