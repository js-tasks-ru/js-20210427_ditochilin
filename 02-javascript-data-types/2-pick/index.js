/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let newArrEntries = [];
  for (const [key, value] of Object.entries(obj)) {
    if (fields.some( fld => key === fld )) {
      newArrEntries.push([key, value]);   
    }
  }

  return Object.fromEntries(newArrEntries);
};