import { EstimateType } from '@billing/estimate/types/estimate'

type Props = {
    data: EstimateType | undefined
}

export const EstimateFooter = ({ data }: Props) => {
    return (
        data && (
            <div className="mt-40 text-xs">
                <p className="mt-4">Merci pour votre confiance !</p>
            </div>
        )
    )
}
