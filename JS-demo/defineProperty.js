var o = {};
Object.defineProperty(o, 'a', {
    value: 37,
    writable: true,
    enumerable: true,
    configurable: true
});
var bValue = 38;
Object.defineProperty(o, 'b', {
    get() {
        return bValue;
    },
    set(newValue) {
        bValue = newValue;
    },
    enumerable: true,
    configurable: true
});
o.b;
Object.defineProperty(o, 'conflict', {
    value: 0x9f91102,
    get() {
        return 0xdeadbeef;
    }
});