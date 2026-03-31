function getSortedCopy(numbers, direction = 'asc') {
    const copy = [...numbers]

    if (direction === 'asc') {
        return copy.sort((a, b) => a - b)
    }

    return copy.sort((a, b) => b - a)
}

function isSorted(numbers, direction = 'asc') {
    const sorted = getSortedCopy(numbers, direction)
    return JSON.stringify(numbers) === JSON.stringify(sorted)
}

module.exports = {
    getSortedCopy,
    isSorted
}