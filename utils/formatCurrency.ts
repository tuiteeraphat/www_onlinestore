export default function formatCurrency(currency: number) {
    return currency.toLocaleString('th-TH', {
        currency: 'THB',
    })
}
