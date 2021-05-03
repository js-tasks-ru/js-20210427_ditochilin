/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    let newArrEntries = [];
    for (const [key, value] of Object.entries(obj)) {
      if (!fields.some( fld => key === fld )) {
        newArrEntries.push([key, value]);   
      }
    }
  
    return Object.fromEntries(newArrEntries);
};
