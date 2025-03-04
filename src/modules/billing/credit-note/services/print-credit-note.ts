import { cookiesNext } from '@digico/utils'

export const printCreditNote = async (id: number) => {
    const cookies = await cookiesNext()
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/credit-notes/${id}/pdf`, {
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
            const blobUrl = URL.createObjectURL(result)

            const iframe = document.createElement('iframe')
            iframe.style.visibility = 'hidden'
            iframe.src = blobUrl
            document.body.appendChild(iframe)

            iframe.onload = function () {
                iframe.contentWindow?.focus()
                iframe.contentWindow?.print()
            }
        })
}
