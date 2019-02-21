// 兼容性最好：双层循环
var array = [1, 2, 1, '1', 4, 2, '2']

function unique() {
    // res 用来储存结果
    var res = []
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < res.length; j++) {
            if (array[i] === res[j]) {
                break;
            }
        }
        // 如果 array[i] 是唯一的，那么执行完循环，j 等于 res.length
        if (j === res.length) {
            res.push(array[i])
        }
    }
    return res
}

console.log(unique(array));

// indexOf IE9+
var array = [1, 2, 1, '1', 4, 2, '2']

function unique(array) {
    var res = []
    for (var i = 0; i < array.length; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res
}

console.log(unique(array));