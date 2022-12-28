module.exports.remove_non_ascii = function(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    
    return str.replace(/[^\x20-\x7E]/g, '');
}