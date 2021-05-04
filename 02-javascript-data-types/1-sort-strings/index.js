import { objectTypeSpreadProperty } from "@babel/types";

/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const arrSorted = [...arr];

  switch (param) {
  case 'asc':
    return arrSorted.sort((a, b) => getLocalCompare(a, b));
  case 'desc':
    return arrSorted.sort((a, b) => -1 * getLocalCompare(a, b));
  default:
    throw new Error(`Param value ${param} for sortStrings was not correct!`);
  }
}

function getLocalCompare(a, b) {
  return a.localeCompare(b,'ru', { caseFirst: 'upper' });
}