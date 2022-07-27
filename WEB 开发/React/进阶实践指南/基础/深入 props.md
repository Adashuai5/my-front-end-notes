props 可以是什么？

- ① props 作为一个子组件渲染数据源。
- ② props 作为一个通知父组件的回调函数。
- ③ props 作为一个单纯的组件传递。
- ④ props 作为渲染函数。
- ⑤ render props ， 和④的区别是放在了 children 属性上。
- ⑥ render component 插槽组件

**隐式注入 props**

通过 `React.cloneElement` 对 props.chidren 克隆再混入新的 props

```jsx
function Father(prop){
    return React.cloneElement(prop.children,{  mes:'let us learn React !' })
}
```

[demo](https://codesandbox.io/s/funny-feather-u3215?file=/src/FormItem.jsx)

