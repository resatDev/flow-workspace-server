
let generatePassword = function(){
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  
let generateId = function(){
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }

  module.exports = {generateId, generatePassword}