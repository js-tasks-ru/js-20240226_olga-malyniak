/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
   /** Первое решение
      let result = [];
      for (let field of fields){
      Array.prototype.push.apply(result, Object.entries(obj).filter(item => item[0] === field))    
      }
      return Object.fromEntries(result);
   */
   /** Второй способ */
   const resObj = Object.entries(obj).filter( ([key, value]) => {
      if (fields.includes(key)){
         return [key, value];
      }
   });
   return Object.fromEntries(resObj); 
};
