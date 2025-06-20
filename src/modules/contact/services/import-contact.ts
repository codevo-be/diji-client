import { FieldValues } from 'react-hook-form'
import { cookiesNext } from '@digico/utils'

export const importContact = async (data: FieldValues) => {
    const cookies = await cookiesNext()
    const formData = new FormData()

    if (data.file[0]) {
        formData.append('file', data.file[0])
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts/import`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'X-Tenant': cookies.get('X-tenant'),
            Authorization: cookies.get('Authorization')
        },
        body: formData
    })

    if (!response.ok) {
        const error: {
            message: string
            errors: any[]
        } = await response.json()

        throw error
    }

    if (response.status === 204) {
        return {}
    }

    return await response.json()
}
