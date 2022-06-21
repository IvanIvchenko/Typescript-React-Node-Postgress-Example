const isInteger =  (num: string) => {
        const n = Number(num)
        return n>0 && n % parseInt(num as string) === 0
}

export default isInteger