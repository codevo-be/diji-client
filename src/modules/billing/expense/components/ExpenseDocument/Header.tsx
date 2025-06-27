import { ExpenseType } from '@billing/expense/type/expense'

import { DocumentInfo } from './DocumentInfo'

type Props = {
    data: ExpenseType
}

export const Header = ({ data }: Props) => {
    const senderInfo = formatInfoFromPeppol(data.sender, data.sender_address)
    const recipientInfo = formatInfoFromPeppol(data.recipient, data.recipient_address)

    return (
        <div className="flex justify-between mb-12">
            <DocumentInfo {...senderInfo} />
            <DocumentInfo {...recipientInfo} />
        </div>
    )
}

const formatInfoFromPeppol = (
    party: ExpenseType['sender'] | ExpenseType['recipient'],
    address: ExpenseType['sender_address'] | ExpenseType['recipient_address'],
    iban?: string
) => ({
    name: party.name,
    vat_number: party.vatNumber,
    street: address.line1,
    street_number: '',
    zipcode: address.zipCode,
    city: address.city,
    country: address.country,
    iban: iban
})
