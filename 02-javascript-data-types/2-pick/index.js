/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const newArrEntries = [];
  for (const [key, value] of Object.entries(obj)) {
    if (fields.includes(key)) {
      newArrEntries.push([key, value]);   
    }
  }

  return Object.fromEntries(newArrEntries);
};