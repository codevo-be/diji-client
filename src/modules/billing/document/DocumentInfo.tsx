type Props = {
    name: string
    street: string
    street_number: string
    zipcode: string
    city: string
    country: string
    vat_number?: string
    address?: string
    iban?: string
}

export const DocumentInfo = ({ name, address, iban, street, street_number, zipcode, city, vat_number, country }: Props) => {
    return (
        <div className="flex-1 text-xs">
            <h1 className="font-bold">{name}</h1>

            {address ? (
                <p>{address}</p>
            ) : (
                <>
                    <p>
                        {street} {street_number}
                    </p>
                    <p>
                        {zipcode} {city}
                    </p>
                    <p>{country}</p>
                </>
            )}

            {vat_number && <p className="mt-4">{vat_number}</p>}

            {iban && <p className="mt-4">{iban}</p>}
        </div>
    )
}
