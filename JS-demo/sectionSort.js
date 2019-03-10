// 选择排序
function sectionSort(arr){
    for(let i = 0;i<arr.length;i++){
        let min = i
        for(let j = i+1;j<arr.length;j++){
            if(arr[min]>arr[j]){
                min = j
            }
        }
        [arr[i],arr[min]] = [arr[min],arr[i]]
    }
}
var arr = [1, 1234, 23, 2, 5, 63, 35]
sectionSort(arr);