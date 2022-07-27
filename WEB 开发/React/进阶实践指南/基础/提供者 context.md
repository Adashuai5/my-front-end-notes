老版本 context

在`v16.3.0`之前，React 用 PropTypes 来声明 context 类型，提供者需要 getChildContext 来返回需要提供的 context ，并且用静态属性 childContextTypes 声明需要提供的 context 数据类型

### 新版本 context 基本使用

```jsx
const Context = React.createContext(null) //
const Provider = Context.Provider  //提供者
const Consumer = Context.Consumer // 订阅消费者
```

获取 context 的三种方式

1. 类组件 contextType 方式

   ```jsx
   const ThemeContext = React.createContext(null)
   // 类组件 - contextType 方式
   class ConsumerDemo extends React.Component{
      render(){
          const { color,background } = this.context
          return <div style={{ color,background } } >消费者</div> 
      }
   }
   ConsumerDemo.contextType = ThemeContext
   
   const Son = ()=> <ConsumerDemo />
   ```

   

2. 函数组件之 useContext 方式

   ```jsx
   const ThemeContext = React.createContext(null)
   // 函数组件 - useContext方式
   function ConsumerDemo(){
       const  contextValue = React.useContext(ThemeContext)
       const { color,background } = contextValue
       return <div style={{ color,background } } >消费者</div> 
   }
   const Son = ()=> <ConsumerDemo />
   ```

3. 订阅者之 Consumer 方式

   ```jsx
   const ThemeConsumer = ThemeContext.Consumer // 订阅消费者
   
   function ConsumerDemo(props){
       const { color,background } = props
       return <div style={{ color,background } } >消费者</div> 
   }
   const Son = () => (
       <ThemeConsumer>
          { /* 将 context 内容转化成 props  */ }
          { (contextValue)=> <ConsumerDemo  {...contextValue}  /> }
       </ThemeConsumer>
   ) 
   ```

#### 动态 context

**在 Provider 里 value 的改变，会使引用`contextType`、`useContext` 消费该 context 的组件重新 render ，同样会使 Consumer 的 children 函数重新执行，与前两种方式不同的是 Consumer 方式，当 context 内容改变的时候，不会让引用 Consumer 的父组件重新更新。**

#### displayName

```jsx
const MyContext = React.createContext(/* 初始化内容 */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```

### context 高阶用法

嵌套 Provider

多个 Provider 之间可以相互嵌套，来保存/切换一些全局数据

逐层传递 Provider

一个 context 可以用多个 Provder 传递，下一层级的 Provder 会覆盖上一层级的 Provder

