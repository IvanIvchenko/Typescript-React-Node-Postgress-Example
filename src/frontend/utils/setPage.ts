import isPositiveInteger from './isPositiveInteger'

export default function setPage(page: string | number, pagesNumber = 1): number {
    if (page === null || typeof page !== "number" || !isPositiveInteger(page)) {
        return 1
    } else if (page > pagesNumber) {
        return pagesNumber
    } else{
        return page
    }
}