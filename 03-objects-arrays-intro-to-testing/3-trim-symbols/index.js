/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let result='';
    let prevChar = '';
    let counter = 1;
    if (size === 0) {
        return result;
    }
    for(let element of string) {        
        if(prevChar === element) {
            counter++;
            if (counter > size) {                
                continue;
            }            
        } else {
            counter = 1;
        }
        prevChar = element; 
        result += element;
    };

    return result;
}
