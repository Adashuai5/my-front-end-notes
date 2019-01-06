function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let leftArr = []
    let rightArr = []
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= arr[0]) {
            rightArr.push(arr[i])
        }else{
            leftArr.push(arr[i])
        }
    }
    return quickSort(leftArr).concat(arr[0]).concat(quickSort(rightArr))
}
var arr = [1, 1234, 23, 2, 5, 63, 35]
quickSort(arr)