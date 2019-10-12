算法是每个程序员应该重视的技能之一，即使是对算法要求不那么高的前端。但是如果能够不时抽空练习，对逻辑与能力的提升一定会有极大帮助。
于是，作为前端新人的我，注册了大名鼎鼎的 LeetCode，开始练习之旅。本文记录每道题目的记录，便于不时查阅及更新。

## [1\. 两数之和](https://leetcode-cn.com/problems/two-sum/)

```
var twoSum = function (nums, target) {
    let newArr = []
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                newArr.push(i, j)
                return newArr
            }
        }
    }
    return newArr
}
```
## [26\. 删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)
```
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i + 1]) {
            nums.splice(i, 1)
            i--
        }
    }
    return nums.length
}
```
