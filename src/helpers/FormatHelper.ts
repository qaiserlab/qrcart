export default function convertCurrency(num: Number): String {
  return parseInt(num.toString()).toLocaleString('id-ID')
}