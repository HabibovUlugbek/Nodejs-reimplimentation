const { simpleCryptoHash } = require('./hash-function');

class BloomFilter {
    constructor(expectedItems, falsePositiveRate) {
        this.n = expectedItems;
        this.p = falsePositiveRate;
        this.m = this._optimalSize();
        this.k = this._optimalHashCount();
        this.bitArray = new Array(this.m).fill(0); 
    }

    _optimalSize() {
        return Math.ceil(-(this.n * Math.log(this.p)) / (Math.log(2) ** 2));
    }

    _optimalHashCount() {
        return Math.ceil((this.m / this.n) * Math.log(2));
    }

    _setBit(pos) {
        this.bitArray[pos] = 1;
    }

    _getBit(pos) {
        return this.bitArray[pos] === 1;
    }

    _getHashes(item) {
        const hashes = [];
        for (let i = 0; i < this.k; i++) {
            const hashVal = simpleCryptoHash(item, i.toString());
            hashes.push(hashVal % this.m);
        }
        return hashes;
    }

    add(item) {
        const positions = this._getHashes(item);
        positions.forEach(pos => {
            this._setBit(pos);
        });
    }

    contains(item) {
        const hashes = this._getHashes(item);
        for (let pos of hashes) {
            if (!this._getBit(pos)) {
                return false;
            }
        }
        return true;
    }
}

module.exports = { BloomFilter };
