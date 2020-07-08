[初识Lisp语法](http://www.xumenger.com/lisp-20170215/)

Scheme 是 Lisp 的方言

# 数字和运算

# 命名

# 或且非

# 实现根号

``` js
// js
function root(n) {
  if(n<1) return new Error('need > 1')
  function guess(i, n) {
    if (Math.abs(n - i * i) < 0.001) return i;
    return guess((n / i + i) / 2, n);
  }
  return guess(1, n);
}
```

``` Lisp
// Lisp
(define (root n)
  (guess 1 n))
(define (guess i n)
  (if (and (< (- (* i i) n) 0.001) (> (- (* i i) n) (- 0.001)))
      i
      (guess (/ (+ (/ n i) i) 2) n)))
```

# cond 实现 if

# 线性递归和线性迭代

实现阶乘

!n = n * n-1 ... 1

## 递归

```Lisp
(define (recur n)
  (if (= 1 n)
      1
      (* n (recur (- n 1)))))
```

## 迭代

```Lisp
(define (iter n)
  (getNext 1 1 n))
(define (getNext i r n)
  (if (> i n)
      r
      (getNext (+ i 1) (* r i) n)))
```

# 函数式？

精髓：变量不能重复赋值
