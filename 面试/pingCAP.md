### 小作业

PS：作业可用 codepen 链接提交，可以辅助在线文档；选择一到两题即可；

「工程相关」1 使用熟悉的框架（React，Angular & Vue 等）实现简单的电子表格功能的 WebApp，实现 column & row input，sort，cell edit，cell calculate。

「组件设计」2 设计一个高性能的 List 列表组件（可选用任意框架或 Web Components），参考 iOS TableView 或 Andorid RecyclerView 的 API 设计，实现如支持无限滚动渲染，添加删除和重排动画 hook 等

「产品思维」3 设计一个适用于分布式数据库的用户界面，选择你认为重要的信息作为展示。如基本存储信息，机器信息，运行状态和性能指标，表结构等等

「设计还原」4 实现如下形变效果，可以做适当的抽象和可复用性。

1. 链表相关
2. 小作业相关
3. 项目=>useCallback 和 useMeme
4. 深拷贝相关
5. 虚拟 DOM 相关
6. TypeScript 相关（any 和 unknown）（record 实现）

- 1. any 和 unknown 区别
     any 表示全类型，支持所有数据类型及其属性
     unknown 表示未知类型，取第一次设置的类型，且只能用公共属性如 toString
     unknown 是所有类型的联合
- 2. type Record<K extends keyof any, T> = {
     [P in K]: T;
     };
- 3. type 和 interface 区别

  - type 类型别名（不占用名字），interface 声明接口
  - 相同点：

    - 都可以继承，且可以相互继承

      ``` ts
      // type
      type People = {
        name: string
      }
      type Man = People & {
        sex: 'man'
      }

      // interface
      interface Name {
        name: string;
      }
      interface User extends Name {
        age: number;
      }
      ```
  - 不同点
  - interface 只描述对象，type 可描述所有类型
  - interface 是类型声明，type 只是别名
  - interface 能够声明合并（可扩展）

  对外使用 interface，对内可使用 type
