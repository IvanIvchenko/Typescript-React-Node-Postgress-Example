export default function isPositiveInteger(num: unknown): boolean {
    const number = Number(num)
    if (typeof number === 'number') {
        return number > 0 && number % parseInt(`${number}`) === 0
    } else {
        return false
    }
}