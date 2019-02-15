// instanceof 可以正确的判断对象的类型
// 语法 object instanceof constructor
// 实现 instanceof
function Instanceof(obj, constructor) {
    // 获得类型的原型
    let prototype = constructor.prototype
    // 获得对象的原型
    obj = obj.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
        if (obj === null)
        return false
        if (prototype === obj)
        return true
        obj = obj.__proto__
    }
}