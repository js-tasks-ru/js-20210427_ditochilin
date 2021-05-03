/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const arrSorted = arr.slice();
  let n = arrSorted.length;
  
  while (n > 1) {
    let newn = 0;
    let index = 1;
    while (index <= n - 1) {
      const compareResult = getLocalCompare(arrSorted, index);
      if (compareResult > 0 && param === 'asc'
        || compareResult < 0 && param === 'desc') {
        // swap
        const bufferStr = arrSorted[index - 1];
        arrSorted[index - 1] = arrSorted[index];
        arrSorted[index] = bufferStr;
        newn = index;
      }
      index++;
    }
    n = newn;
  }
  return arrSorted;
}

function getLocalCompare(arrSorted, index) {
  return arrSorted[index - 1].localeCompare(arrSorted[index],'ru', { caseFirst: 'upper' });
}