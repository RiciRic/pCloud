const encrypt = (message, key) => {
    var encrypted = CryptoJS.AES.encrypt(message, key); 
    return encrypted.toString();
};

module.exports = encrypt;