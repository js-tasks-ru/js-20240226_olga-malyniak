/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const revers = (param == 'desc') ? true : false;
    let arrSorted = arr.slice().sort((a,b) => a.localeCompare(b, 'ru-en', { caseFirst: 'upper' }));
    if (revers) arrSorted.reverse();
    return arrSorted;
}
