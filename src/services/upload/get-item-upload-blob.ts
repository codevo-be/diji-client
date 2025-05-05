import Cookies from 'js-cookie'

export default async function getItemUploadBlob(url: string) {
    const token = Cookies.get('Authorization')

    const response = await fetch('http://localhost:8000/api/uploads/expense/2025/5/097dd2593abfaec6f37fad885e90a084d7afe941.png', {
        headers: {
            'X-tenant': 'maskedera',
            Authorization: token!
        }
    })

    const blob = await response.blob()
    return URL.createObjectURL(blob)
}