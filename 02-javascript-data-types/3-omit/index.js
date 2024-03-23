/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const arrFromObj = Object.entries(obj);
    for (let field of fields){
     let key = arrFromObj.findIndex(item => item[0] === field);
     if (~key) arrFromObj.splice(key, 1);    
    }
    return Object.fromEntries(arrFromObj);
};
