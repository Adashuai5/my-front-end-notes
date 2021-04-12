原文地址：[How to Implement a Linked List in JavaScript](https://www.freecodecamp.org/news/implementing-a-linked-list-in-javascript/)

野生前端如我，对链表相关的知识了解较少，今天找到了篇通俗易懂的英文文章，从它开始入门相信是个不错的选择。

---

如果你正在学习数据结构，那么你应该了解下链表。如果你不是真正理解它或不知道如何用 JavaScript 生成一个链表，这篇文章将为你提供帮助。

本文我们将讨论什么是链表，它与数组有何不同，以及如何用 JavaScript 实现它。让我们开始吧！

### 链表是什么

链表是一种与数组类似的线性数据结构，然而与数组的元素存储在特定的内存位置或索引中不同，链表的每个元素都是一个单独的对象，它包含一个指向该列表中下一个对象的指针或链接。

每个元素（通常称为节点）包含两项：存储的数据和到下一个节点的链接，数据可以是任何有效的数据类型。如下图所示：



![Image of a linked list](https://res.cloudinary.com/dvj2hbywq/image/upload/v1590572188/Group_14_5_bvpwu0.png)



我们通常使用 “head” 作为链表入口，这个 “head” 是对链表中第一个节点的引用，而链表的最后一个节点指向 null。如果是空链表，则 head 的引用就是 null。

在 JavaScript 中，链表长这样：

```javascript
const list = {
    head: {
        value: 6
        next: {
            value: 10                                             
            next: {
                value: 12
                next: {
                    value: 3
                    next: null	
                    }
                }
            }
        }
    }
};
```

### 链表的优点

- 可以很容易地从链表中删除或添加节点，而无需重组整个数据结构。这是它相对于数组的一个优势。

### 链表的缺点

- 链表的搜索操作很慢，与数组不同，不允许随机访问数据元素，必须从第一个节点开始按顺序访问节点。
- 由于需要储存指针，相较于数组需要更多内存。

### 链表的类型

链表有以下三种类型：

- **单向链表**：每个节点只包含一个指向下一个节点的指针。也就是我们到上面一直在讨论的。
- **双向链表**：每个节点包含两个指针，一个指向下一个节点，另一个指向前一个节点。
- **循形链表**：循环链表是链表的一种变体，它的最后一个节点指向第一个节点或它之前的任何其他节点，从而形成一个循环。

### 用 JavaScript 实现一个表节点

前面我们讲到，列表节点包含两项：数据和指向下一个节点的指针。我们可以用 JavaScript 实现如下所示的列表节点：

```javascript
class ListNode {
    constructor(data) {
        this.data = data
        this.next = null                
    }
}
```

### 用 JavaScript 实现一个链表

下面的代码展示了使用构造函数实现链表类的方法。注意，如果未传递 “head” 节点，则它将初始化为 null：

```javascript
class LinkedList {
    constructor(head = null) {
        this.head = head
    }
}
```

### 将它们合在一起

让我们用刚刚创建的类创建一个链表。 首先，我们创建两个表节点，*node1* 和 *node2*，以及他们之间的指针：

```javascript
let node1 = new ListNode(2)
let node2 = new ListNode(5)
node1.next = node2
```

接着，我们使用 *node1* 创建一个链表：

```javascript
let list = new LinkedList(node1)		
```

让我们尝试访问刚刚创建的列表中的节点：

```javascript
console.log(list.head.next.data) //returns 5	
```

### 一些链表方法：

接下来，我们将为链表实现四个 helper 方法：

1. size()
2. clear()
3. getList()
4. getFirst()

###### 1. size()

该方法返回链表中存在的节点数：

```javascript
size() {
    let count = 0; 
    let node = this.head;
    while (node) {
        count++;
        node = node.next
    }
    return count;
}
```

###### 2. clear()

该方法清空链表：

```javascript
clear() {
	this.head = null
}
```

###### 3. getList()

该方法返回链表的最后一个节点：

```javascript
getLast() {
    let lastNode = this.head;
    if (lastNode) {
        while (lastNode.next) {
            lastNode = lastNode.next
        }
    }
    return lastNode
}
```

###### 4. getFirst()

该方法返回链表第一个节点：

```javascript
getFirst() {
    return this.head;
}
```

### 总结

本文讨论了什么是链表以及如何在 JavaScript 中实现链表。 我们还讨论了链表的不同类型，以及它们的整体优缺点。



完