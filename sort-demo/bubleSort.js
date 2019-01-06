function bubleSort(arr) {
    for (let i = 0; i < arr.length; i++ /*i代表轮数*/ ) {
        for (let j = 0; j < arr.length - i; j++ /*j代表当前轮选中元素*/ ) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[J + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
}
var arr = [1, 1234, 23, 2, 5, 63, 35]
bubleSort(arr);

  