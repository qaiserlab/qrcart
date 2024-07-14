export default function convertCurrency(num: number): string {
  if (!num) return ''
  return parseInt(num.toString()).toLocaleString('id-ID')
}