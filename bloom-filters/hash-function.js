const crypto = require('crypto');

function simpleCryptoHash(str, seed = '') {
    const hash = crypto.createHash('sha256');
    hash.update(seed + str);
    const digest = hash.digest();

    return digest.readUInt32BE(0);
}

module.exports = { simpleCryptoHash };
