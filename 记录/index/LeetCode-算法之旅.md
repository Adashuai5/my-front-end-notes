算法是每个程序员应该重视的技能之一，即使是对算法要求不那么高的前端。但是如果能够不时抽空练习，对逻辑与能力的提升一定会有极大帮助。
于是，作为前端新人的我，注册了大名鼎鼎的 LeetCode，开始练习之旅。本文记录每道题目的记录，便于不时查阅及更新。

## [1\. 两数之和](https://leetcode-cn.com/problems/two-sum/)

### 暴力解法 O(n2)

```
var twoSum = function (nums, target) {
    let newArr = []
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                newArr.push(i, j)
            }
        }
    }
    return newArr
}
```

### 优化解法 O(n)

```
var twoSum = function (nums, target) {
    let arr = []
    let dif
    let index
    nums.forEach((item, key) => {
        dif = target - item
        if (arr[dif] !== undefined) {
            index = [arr[dif], key]
        }
        arr[item] = key
    })
    return index
};
```

![](https://upload-images.jianshu.io/upload_images/7094266-9b43759731fad11e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## [2\. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

```
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @param {ListNode} k = 0
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2, k = 0) {
    let list = new ListNode()
    let n = (l1 && l1.val ? l1.val : 0) + (l2 && l2.val ? l2.val : 0) + k
    k = (n >= 10) ? 1 : 0
    n = (n >= 10) ? n - 10 : n
    list.val = n
    if (l1.next && l2.next) { list.next = addTwoNumbers(l1.next, l2.next, k) }
    else if (l1.next) { list.next = addTwoNumbers(l1.next, new ListNode(k)) }
    else if (l2.next) { list.next = addTwoNumbers(l2.next, new ListNode(k)) }
    else { list.next = k ? new ListNode(k) : null }
    return list
};
```

## [3\. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

### 暴力解法 O(n2)

```
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let a = []
    let n = 0
    for (let i = 0; i < s.length; i++) {
        let x = s[i]
        if (!a.includes(x)) {
            a.push(x)
        } else {
            a = [x]
        }
        n = a.length > n ? a.length : n
        if (n === 95) return n
    }
    s = s.slice(1)
    if (s.length > 0) {
        const n1 = lengthOfLongestSubstring(s)
        n = n1 > n ? n1 : n
    }
    return n
};
```

### 优化解法 O(n)

发现出现重复就可跳出原循环进行新循环避免重复遍历

```
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let a = []
    let n = 0
    let n1 = 0
    for (let i = 0; i < s.length; i++) {
        let x = s[i]
        if (!a.includes(x)) {
            a.push(x)
            n = a.length > n ? a.length : n
            if (n === 95) return n
        } else {
            a = [x]
            break;
        }
    }
    s = s.slice(1)
    if (s.length > 0) {
        n1 = lengthOfLongestSubstring(s)
        n = n1 > n ? n1 : n
    }
    return n
};
```

![](https://upload-images.jianshu.io/upload_images/7094266-85846e387359ec86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 解决爆栈

```
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (!s.length) return 0
    let a = {}
    let n = 1
    for (let i = 0; i < s.length - 1; i++) {
        a[s[i]] = 1
        let n1 = 1
        for (let j = i + 1; j < s.length; j++) {
            if (a[s[j]]) {
                a = {}
                break;
            } else {
                a[s[j]] = 1
                n1++
            }
            n = Math.max(n1, n)
        }
    }
    return n
};
```

## [4\. 寻找两个有序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

```
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    let array = nums1.concat(nums2)
    array.sort((a, b) => {
        return a - b
    })
    let index = array.length / 2
    if (array.length % 2 === 0) {
        return (array[index] + array[index - 1]) / 2
    } else {
        return array[(array.length - 1) / 2]
    }
};
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

## [32\. 最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses/)

```
function longestValidParentheses(s: string): number {
  const stack = [-1]
  let maxLength = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i)
      console.log(stack,'1',i,maxLength)
      continue;
    }
    stack.pop()
      console.log(stack,'2',i,maxLength)

    if (stack.length === 0) {
      console.log(stack,'3',i,maxLength)
      stack.push(i)
    } else {
      maxLength = Math.max(maxLength, i - stack[stack.length - 1])
      console.log(stack,'4',i,maxLength)
    }
  }
  return maxLength
};
```

![思路](https://upload-images.jianshu.io/upload_images/7094266-1efae228cc6d2e75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
