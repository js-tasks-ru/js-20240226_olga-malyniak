/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const resObj = new Map(Object.entries(obj));
    for (const key of resObj.keys()){
        if (fields.includes(key)){
           resObj.delete(key); 
        }
    }
    return Object.fromEntries(resObj);
};
