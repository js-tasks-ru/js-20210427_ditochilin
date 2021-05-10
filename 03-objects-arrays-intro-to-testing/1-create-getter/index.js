/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const searchArray = path.split('.');
    
    if (!searchArray) {
        throw new Error('No search fields have been entered!');     
    }

    const getFieldFromObj = (arr, currObj) => {
        const currField = arr.shift();
        const currValue = currObj[currField];
        if(currValue == undefined) {
            return undefined;
        }
        if (!arr.length) {
            return currValue;
        }
        return getFieldFromObj(arr, currValue);
    }

    return (obj) => getFieldFromObj(searchArray, obj);

}
