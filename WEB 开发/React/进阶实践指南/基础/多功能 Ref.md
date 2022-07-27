### ref基本概念和使用

1. Ref 对象创建（两种）

   ```js
   {
       current:null , // current指向ref对象获取到的实际内容，可以是dom元素，组件实例，或者其他。
   }
   ```

   React.createRef 的底层逻辑

   ```js
   export function createRef() {
     const refObject = {
       current: null,
     }
     return refObject;
   }
   ```

   useRef 底层逻辑是和 createRef 差不多，区别是 ref 保存位置不相同，类组件通过实例 instance 维护像 ref 这种信息，但是函数组件每次更新都是一次新的开始，所有变量重新声明，所以 useRef 不能像 createRef 把 ref 对象直接暴露出去。每一次函数组件执行就会重新声明 Ref，因此在函数组件中不能用 createRef 。

   为了解决这个问题，hooks 和函数组件对应的 fiber 对象建立起关联，将 useRef 产生的 ref 对象挂到函数组件对应的 fiber 上，函数组件每次执行，只要组件不被销毁，函数组件对应的 fiber 对象一直存在，ref 等信息就会被保存下来。

2. React 对 Ref 属性的处理-标记 ref（三种获取 ref 方法）

   ref 标记对象：一个 DOM 元素/一个类组件(函数组件没有实例，不能被 Ref 标记)

   

   **①** 用字符串 ref 标记：对于 DOM 元素，把真实 DOM 绑定在组件 this.refs (组件实例下的 refs )属性上；类组件，会把子组件的实例绑定在 this.refs 上<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ca7efcd73fe429aa83bd91f068c5508~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:50%;" />

   

   **②** 函数来标记 Ref：将作为 callback 形式，等到真实 DOM 创建阶段，执行 callback ，获取的 DOM 元素或组件实例，将以回调函数第一个参数形式传入<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74ba71b6c4f5456eaf7cd46e51598fa4~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:50%;" />

   

   **③** 通过 ref 对象方式获取：React.createRef(null)

   <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/796e66d30ee84a62867fe264c5b5eca6~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:50%;" />

### ref 高阶用法

1. forwardRef 转发 Ref

   解决 ref 不能跨层级捕获和传递的问题

   ① 跨层级获取

   ```jsx
   React.forwardRef((props,ref)=> <Father grandRef={ref}  {...props} />)		
   ```

   ② 合并转发 ref

   - 1 通过 useRef 创建一个 ref 对象，通过 forwardRef 将当前 ref 对象传递给子组件。
   - 2 向父组件传递的 ref 对象上，可绑定孙组件实例、子组件实例和 DOM 元素

   ③ 场景三：高阶组件转发

   ```jsx
   function HOC(Component){
     class Wrap extends React.Component{
        render(){
           const { forwardedRef ,...otherprops  } = this.props
           return <Component ref={forwardedRef}  {...otherprops}  />
        }
     }
     return  React.forwardRef((props,ref)=> <Wrap forwardedRef={ref} {...props} /> ) 
   }
   class Index extends React.Component{
     render(){
       return <div>hello,world</div>
     }
   }
   const HocIndex =  HOC(Index)
   export default ()=>{
     const node = useRef(null)
     useEffect(()=>{
       console.log(node.current)  /* Index 组件实例  */ 
     },[])
     return <div><HocIndex ref={node}  /></div>
   }
   ```

2. ref实现组件通信

   ① 类组件 ref：通过 ref 直接获取组件实例，实现组件通信

   ② 函数组件 forwardRef + useImperativeHandle

   useImperativeHandle 接受三个参数：

   - 第一个参数 ref : 接受 forWardRef 传递过来的 ref 。
   - 第二个参数 createHandle ：处理函数，返回值作为暴露给父组件的 ref 对象。
   - 第三个参数 deps :依赖项 deps，依赖项更改形成新的 ref 对象

   <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59238390306849e89069e6a4bb6ded9d~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:50%;" />

3. 函数组件缓存数据

   可以把一些不依赖于视图更新的数据储存到 ref 对象中。这样做的好处有两个：

   - 能够直接修改数据，不会造成函数组件冗余的更新作用。
   - useRef 保存数据，如果有 useEffect ，useMemo 引用 ref 对象中的数据，无须将 ref 对象添加成 dep 依赖项，因为 useRef 始终指向一个内存空间，**所以这样一点好处是可以随时访问到变化后的值。**

### ref 处理逻辑原理

1. ref 执行时机和处理逻辑

   整个 Ref 的处理，都是在 commit 阶段发生

   React 底层用两个方法处理：**commitDetachRef** 和 **commitAttachRef**

   - 一次更新中，在 commit 的 mutation 阶段, 执行commitDetachRef，commitDetachRef 会清空之前ref值，使其重置为 null

     ```jsx
     // react-reconciler/src/ReactFiberCommitWork.js
     function commitDetachRef(current: Fiber) {
       const currentRef = current.ref;
       if (currentRef !== null) {
         if (typeof currentRef === 'function') { /* function 和 字符串获取方式。 */
           currentRef(null); 
         } else {   /* Ref对象获取方式 */
           currentRef.current = null;
         }
       }
     }
     ```

   - DOM 更新阶段，这个阶段会根据不同的 effect 标签，真实的操作 DOM

   - layout 阶段，在更新真实元素节点之后，此时需要更新 ref 

     ```jsx
     // react-reconciler/src/ReactFiberCommitWork.js
     function commitAttachRef(finishedWork: Fiber) {
       const ref = finishedWork.ref;
       if (ref !== null) {
         const instance = finishedWork.stateNode;
         let instanceToUse;
         switch (finishedWork.tag) {
           case HostComponent: // 元素节点 获取元素
             instanceToUse = getPublicInstance(instance);
             break;
           default:  // 类组件直接使用实例
             instanceToUse = instance;
         }
         if (typeof ref === 'function') {
           ref(instanceToUse);  //* function 和 字符串获取方式。 */
         } else {
           ref.current = instanceToUse; /* ref对象方式 */
         }
       }
     }
     ```

     为什么字符串获取方式，会按照函数方式处理呢？

     因为当 ref 属性是一个字符串的时候，React 会自动绑定一个函数，用来处理 ref 逻辑

     ```jsx
     // react-reconciler/src/ReactChildFiber.js
     const ref = function(value) {
         let refs = inst.refs;
         if (refs === emptyRefsObject) {
             refs = inst.refs = {};
         }
         if (value === null) {
             delete refs[stringRef];
         } else {
             refs[stringRef] = value;
         }
     };
     ```

2. Ref 的处理特性

   2.1. 只有在 ref 更新的时候，才会调用  **commitDetachRef** 和 **commitAttachRef** 更新 Ref 

   **`commitDetachRef` 调用时机**

   ```js
   // react-reconciler/src/ReactFiberWorkLoop.js
   function commitMutationEffects(){
        if (effectTag & Ref) {
         const current = nextEffect.alternate;
         if (current !== null) {
           commitDetachRef(current);
         }
       }
   }
   ```

   **`commitAttachRef` 调用时机**

   ```js
   function commitLayoutEffects(){
        if (effectTag & Ref) {
         commitAttachRef(nextEffect);
       }
   }
   ```

   可以看到，只有 effectTag Ref tag 时候才会更新 ref，effectTag 在 **markRef** 执行时标记

   ```jsx
   // react-reconciler/src/ReactFiberBeginWork.js
   function markRef(current: Fiber | null, workInProgress: Fiber) {
     const ref = workInProgress.ref;
     if (
       (current === null && ref !== null) ||      // fiber 初始化的时候
       (current !== null && current.ref !== ref)  // fiber 更新的时候，ref 指向发生改变
     ) {
       workInProgress.effectTag |= Ref;
     }
   }
   ```

   `markRef` 方法执行在两种情况下：

   - 第一种就是类组件的更新过程中。
   - 第二种就是更新 `HostComponent` （DOm 元素）的时候。

   <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08a2393077634beaad2b91f971ab381f~tplv-k3u1fbpfcp-watermark.awebp" style="zoom:50%;" />

   

   2.2. 当组件或者元素卸载的时候，ref 的处理逻辑

   被卸载的 fiber 会被打成 `Deletion` effect tag ，然后在 commit 阶段会进行 commitDeletion 流程。对于有 ref 标记的 ClassComponent （类组件） 和 HostComponent （元素），会统一走 `safelyDetachRef` 流程，来卸载 ref

   ```jsx
   // react-reconciler/src/ReactFiberWorkLoop.js
   function safelyDetachRef(current) {
     const ref = current.ref;
     if (ref !== null) {
       if (typeof ref === 'function') {  // 函数式 ｜ 字符串
           ref(null)
       } else {
         ref.current = null;  // ref 对象
       }
     }
   }
   ```

   

