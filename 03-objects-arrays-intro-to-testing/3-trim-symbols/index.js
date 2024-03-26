/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (string === '' || size === 0) return '';
    if (!size) return string;
    let count = 0, result = '';
    for(const char of string){
        if(result[result.length-1] != char){
            count=0;
        }
        if((result[result.length-1] == char && count < size) 
            || result[result.length-1] != char){
                result = result + char;
                count++;           
        }        
    }
    return result;
}
