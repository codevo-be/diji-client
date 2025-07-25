export const PEPPOL_ELIGIBLE_COUNTRY_CODES = [
    'AD', 'AL', 'BA', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'EE',
    'GB', 'GR', 'HR', 'IE', 'LI', 'LT', 'LU', 'LV', 'MC', 'ME',
    'MK', 'MT', 'NL', 'PO', 'PT', 'RO', 'RS', 'SI', 'SK', 'SM',
    'TR', 'VA', 'SE', 'FR'
]

export const isPeppolEligible = (vatNumber: string) => {
    const countryCode = vatNumber?.substring(0, 2).toUpperCase()
    return PEPPOL_ELIGIBLE_COUNTRY_CODES.includes(countryCode)
}
