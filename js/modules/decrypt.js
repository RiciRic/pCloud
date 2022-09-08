const decrypt = (message, key) => {
    var decrypted = CryptoJS.AES.decrypt(message, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
};

module.exports = decrypt;