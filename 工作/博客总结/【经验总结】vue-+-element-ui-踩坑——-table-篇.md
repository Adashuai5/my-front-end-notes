工作一年，主要职责是负责公司后台管理平台的开发与维护。此间面对各种业务需求，通过面向谷歌编程等常见方式，积累了一些微不足道的经验。

本篇为总结的第一篇（也许有其他篇）—— table 篇

对于后台管理平台来说，最必不可少的元素就是 table 表格，几乎每个页面都涉及到表格的使用，甚至常作为是页面的主体部分。
因此，如何维护这些 table，并且根据业务需求完善不同解决方案，便是此文所会表达的内容。

主要技术栈如题为 vue 全家桶配合 element-ui（其他技术栈其实思路是类似的），因此主要还是对 el-table 等的再封装等。element-ui 的文档已经非常通俗易懂，本文不涉及一些文档上已有的基本用法。

接下来我会模拟一些简单的数据来展示一些业务问题的解决方案，其目的在展示思路，代码以简易为主。

# 1. 自定义列表项

很多时候我们需要将后端数据作展示优化

```
// mock 数据（跳过直接往下看）
tableData: [
  {
    id: "12987122",
    name1: "王小虎",
    name2: "王小虎",
    name3: "王小虎",
    address1: "上海市普陀区金沙江路 1518 弄",
    address2: "上海市普陀区金沙江路 1518 弄",
    address3: "上海市普陀区金沙江路 1518 弄",
    amount1: "234",
    amount2: "3.2",
    amount3: 10,
    amount4: "4.43",
    amount5: 12
  },
  {
    id: "12987123",
    name1: "王小虎",
    name2: "王小虎",
    name3: "王小虎",
    address1: "上海市普陀区金沙江路 1518 弄",
    address2: "上海市普陀区金沙江路 1518 弄",
    address3: "上海市普陀区金沙江路 1518 弄",
    amount1: "165",
    amount2: "4.43",
    amount3: 12,
    amount4: "4.43",
    amount5: 12
  },
  {
    id: "12987124",
    name1: "王小虎",
    name2: "王小虎",
    name3: "王小虎",
    address1: "上海市普陀区金沙江路 1518 弄",
    address2: "上海市普陀区金沙江路 1518 弄",
    address3: "上海市普陀区金沙江路 1518 弄",
    amount1: "324",
    amount2: "1.9",
    amount3: 9,
    amount4: "4.43",
    amount5: 12
  },
  {
    id: "12987125",
    name1: "王小虎",
    name2: "王小虎",
    name3: "王小虎",
    address1: "上海市普陀区金沙江路 1518 弄",
    address2: "上海市普陀区金沙江路 1518 弄",
    address3: "上海市普陀区金沙江路 1518 弄",
    amount1: "621",
    amount2: "2.2",
    amount3: 17,
    amount4: "4.43",
    amount5: 12
  },
  {
    id: "12987126",
    name1: "王小虎",
    name2: "王小虎",
    name3: "王小虎",
    address1: "上海市普陀区金沙江路 1518 弄",
    address2: "上海市普陀区金沙江路 1518 弄",
    address3: "上海市普陀区金沙江路 1518 弄",
    amount1: "539",
    amount2: "4.1",
    amount3: 15,
    amount4: "4.43",
    amount5: 12
  }
],
```

本次 table 数据以上面数据模拟后端传值。我们除了要展示这些字段，还要将后面 5 个 数据作相除或求百分比等，常规写法如下（不用细看）：

```
<el-table
  class="table"
  :data="tableData"
  border
  show-summary
  highlight-current-row
  style="width: 100%"
>
  <el-table-column prop="id" label="ID" width="180"></el-table-column>
  <el-table-column prop="name1" label="姓名1" width="100"></el-table-column>
  <el-table-column prop="name2" label="姓名2" width="100"></el-table-column>
  <el-table-column prop="name3" label="姓名3" width="100"></el-table-column>
  <el-table-column prop="address1" label="地址1" width="180" show-overflow-tooltip></el-table-column>
  <el-table-column prop="address2" label="地址2" width="180" show-overflow-tooltip></el-table-column>
  <el-table-column prop="address3" label="地址3" width="180" show-overflow-tooltip></el-table-column>
  <el-table-column prop="amount1" sortable label="数值1"></el-table-column>
  <el-table-column prop="amount2" sortable label="数值2"></el-table-column>
  <el-table-column prop="amount3" sortable label="数值3"></el-table-column>
  <el-table-column prop="amount4" sortable label="数值4"></el-table-column>
  <el-table-column prop="amount5" sortable label="数值5"></el-table-column>
  <el-table-column prop="amount6" sortable label="数值6">
    <template slot-scope="scope">
      <span>{{toFixedTwo(scope.row.amount1, scope.row.amount2)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount7" sortable label="数值7">
    <template slot-scope="scope">
      <span>{{toFixedTwo(scope.row.amount1, scope.row.amount3)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount8" sortable label="数值8">
    <template slot-scope="scope">
      <span>{{toFixedTwo(scope.row.amount1, scope.row.amount4)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount9" sortable label="数值9">
    <template slot-scope="scope">
      <span>{{toFixedTwo(scope.row.amount1, scope.row.amount5)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount10" sortable label="数值10">
    <template slot-scope="scope">
      <span>{{toPercent(scope.row.amount1, scope.row.amount2)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount11" sortable label="数值11">
    <template slot-scope="scope">
      <span>{{toPercent(scope.row.amount1, scope.row.amount3)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount12" sortable label="数值12">
    <template slot-scope="scope">
      <span>{{toPercent(scope.row.amount1, scope.row.amount4)}}</span>
      <span>
    </template>
  </el-table-column>
  <el-table-column prop="amount13" sortable label="数值13">
    <template slot-scope="scope">
      <span>{{toPercent(scope.row.amount1, scope.row.amount5)}}</span>
      <span>
    </template>
  </el-table-column>
</el-table>
```

![image](https://upload-images.jianshu.io/upload_images/7094266-f61e03deca5b00a3?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，仅仅是这十来个字段，就让页面显得非常臃肿，而且很多重复，可想而知如果字段增致几十上百，展示方式更加繁琐，开发维护不易。

## 用表驱动编程进行优化

表驱动法是《代码大全》里面提到编程方法，适用于多个 if-else 这样形式的代码，这里自然十分适用。

demo 代码的目录结构

![image](https://upload-images.jianshu.io/upload_images/7094266-42cc6104f08880a9?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### tableData.js

将要展示的字段按顺序，以一定参数形式的数组结构放在 `TABLE_DATA_MAP` 对象内，如目前仅有的 tableDemo 即表示为我们上面代码的表结构数组。

```
/**
 *  参数作用说明：
 *      key: 展示字段
 *      label: 列头名称
 *      width: 列宽
 *      sortable: 是否可筛选
 *      hidden: 隐藏默认展示字段
 *      Dict: 展示用字典
 *      isFixedTwo: 保留两位（可配合分子/分母使用）
 *      isPercent: 百分号展示（配合分子/分母使用）
 *      molecule: 分子
 *      denominator: 分母
 **/

export const TABLE_DATA_MAP = {
  tableDemo: [
    {
      key: "name1",
      label: "姓名1",
      width: 100,
    },
    {
      key: "name2",
      label: "姓名2",
      width: 100,
    },
    {
      key: "name3",
      label: "姓名3",
      width: 100,
    },
    {
      key: "address1",
      label: "地址1",
      width: 180,
    },
    {
      key: "address2",
      label: "地址2",
      width: 180,
    },
    {
      key: "address3",
      label: "地址3",
      width: 180,
    },
    {
      key: "amount1",
      label: "数值1",
      width: 100,
      sortable: true,
    },
    {
      key: "amount2",
      label: "数值2",
      width: 100,
      sortable: true,
    },
    {
      key: "amount3",
      label: "数值3",
      width: 100,
      sortable: true,
    },
    {
      key: "amount4",
      label: "数值4",
      width: 100,
      sortable: true,
    },
    {
      key: "amount5",
      label: "数值5",
      width: 100,
      sortable: true,
    },
    {
      key: "amount6",
      molecule: "amount1",
      denominator: "amount2",
      label: "数值6",
      width: 100,
      sortable: true,
      isFixedTwo: true,
      hidden: true,
    },
    {
      key: "amount7",
      molecule: "amount1",
      denominator: "amount3",
      label: "数值7",
      width: 100,
      sortable: true,
      isFixedTwo: true,
      hidden: true,
    },
    {
      key: "amount8",
      molecule: "amount1",
      denominator: "amount4",
      label: "数值8",
      width: 100,
      sortable: true,
      isFixedTwo: true,
      hidden: true,
    },
    {
      key: "amount9",
      molecule: "amount1",
      denominator: "amount5",
      label: "数值9",
      width: 100,
      sortable: true,
      isFixedTwo: true,
      hidden: true,
    },
    {
      key: "amount10",
      molecule: "amount1",
      denominator: "amount2",
      label: "数值10",
      width: 100,
      sortable: true,
      isPercent: true,
      hidden: true,
    },
    {
      key: "amount11",
      molecule: "amount1",
      denominator: "amount3",
      label: "数值11",
      width: 100,
      sortable: true,
      isPercent: true,
      hidden: true,
    },
    {
      key: "amount12",
      molecule: "amount1",
      denominator: "amount4",
      label: "数值12",
      width: 100,
      sortable: true,
      isPercent: true,
      hidden: true,
    },
    {
      key: "amount13",
      molecule: "amount1",
      denominator: "amount5",
      label: "数值13",
      width: 100,
      sortable: true,
      isPercent: true,
      hidden: true,
    },
  ]
}
```

### tableColumn.vue

用于对 el-table-colum 的二次封装，配合上面表结构使用（直接看代码，其中 toFixedTwo，toPercent 函数在 mixin 混入）

```
<template>
  <div>
    <div v-for="(item, index) in TABLE_DATA_MAP[tableName]" :key="index + item">
      <el-table-column
        :label="item.label"
        :key="index + item"
        :min-width="item.width"
        :sortable="item.sortable"
        :prop="item.key"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="!item.hidden">{{ scope.row[item.key] }}</span>
          <span v-if="item.Dict">{{ item.Dict[scope.row[item.key]] }}</span>
          <span
            v-if="item.isFixedTwo"
          >{{toFixedTwo(scope.row[item.molecule], scope.row[item.denominator])}}</span>
          <span
            v-if="item.isPercent"
          >{{toPercent(scope.row[item.molecule], scope.row[item.denominator])}}</span>
        </template>
      </el-table-column>
    </div>
  </div>
</template>

<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";

export default {
  name: "table-column",
  props: {
    tableName: String
  },
  data() {
    return {
      TABLE_DATA_MAP
    };
  }
};
</script>
```

### Table.vue

优化后的页面如下，与之前相比是不是简洁了不少

```
<template>
  <div>
    <el-table
      class="table"
      :data="tableData"
      border
      show-summary
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="120" fixed="left"></el-table-column>
      <table-column tableName="tableDemo"></table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        ...
      ],
    };
  },
  components: {
    "table-column": () => import("@/components/tableColumn")
  },
  methods: {
    getSummaries(param) {
     ...
    }
  }
};
</script>
```

除了一些必要参数（如 key label）外，你可以在 tableData.js 中自定义任何参数，配合 tableColumn.vue 使用。与此同时，你可以在 tableColumn.vue 上对一些单独字段进行特殊处理

```
// 对 xxx 字段进行自定义
<template slot-scope="scope">
    <div v-if="item.key === 'xxx'">
        <span>{{(scope.row['xxx'] + scope.row['xxx1']+ scope.row['xxx2']).toFixed(2)}}</span>
     </div>
</template>
```

## 合计列

此时如果需求要求合计值，也能够通过 `TABLE_DATA_MAP` 内数据快速实现（表驱动法经典场景，你可以想象不用现在的方法需要几个 if-else）

```
<template>
  <div>
    <el-table
      class="table"
      :data="tableData"
      border
      show-summary
      :summary-method="getSummaries"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="120" fixed="left"></el-table-column>
      <table-column tableName="tableDemo"></table-column>
    </el-table>
  </div>
</template>
<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";
export default {
  data() {
    return {
      TABLE_DATA_MAP,
      tableData: [
        ...
      ],
      // totalData 模拟 amount 初始合计值（很可能合计值非简单的叠加，一般由后端传递）
      totalData: {
        amount1: 1883,
        amount2: 15.83,
        amount3: 63,
        amount4: 22.15,
        amount5: 60
      }
    };
  },
  ...
  methods: {
    getSummaries({ columns }) {
      let sums = [];
      columns.forEach((column, index) => {
        if (column.property === "id") {
          sums[index] = "合计";
          return;
        } else {
          this.TABLE_DATA_MAP.tableDemo.forEach(keyObject => {
            if (keyObject.key === column.property) {
              if (keyObject.isPercent && keyObject.isPercent === true) {
                sums[index] = this.toPercent(
                  this.totalData[keyObject.molecule],
                  this.totalData[keyObject.denominator]
                );
              } else if (
                keyObject.isFixedTwo &&
                keyObject.isFixedTwo === true
              ) {
                sums[index] = this.toFixedTwo(
                  this.totalData[keyObject.molecule],
                  this.totalData[keyObject.denominator]
                );
              } else {
                sums[index] = this.totalData[column.property];
              }
            }
          });
        }
      });
      return sums;
    }
  }
};
</script>
```

![image](https://upload-images.jianshu.io/upload_images/7094266-c3386d88c026e3bc?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 动态列表配置

对于一些列表字段较多的 table 页面，实现列表字段的动态配置的需求就自然而然产生了。
也是得益于我们的表驱动法，我们能够很简单得做到这一点。

更新的目录结构:

![image](https://upload-images.jianshu.io/upload_images/7094266-a05f793f66c49d15?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Table.vue

```
<template>
  <div>
    <el-button style="margin-bottom:10px;" type="primary" @click="dialogs.configuration.show=true">列表配置</el-button>
    <el-table
      ...
    </el-table>
    <el-dialog
      :title="dialogs.configuration.title"
      :visible.sync="dialogs.configuration.show"
      :close-on-click-modal="false"
      width="700px"
    >
      <transfer
        :model="dialogs.configuration.data"
        :tableName="'tableDemo'"
        @close="dialogs.configuration.show=false"
        @editSuc="editSuc('configuration')"
      ></transfer>
    </el-dialog>
  </div>
</template>
<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";
const tableData = [
  ...
];
export default {
  data() {
    return {
      TABLE_DATA_MAP,
      tableData: [],
      totalData: {
        ...
      },
      dialogs: {
        configuration: {
          title: "动态列表配置",
          data: "",
          show: false
        }
      }
    };
  },
  components: {...},
  mounted(){
    this.getList()
  },
  methods: {
    getList() {
      // 模拟数据获取
      setTimeout(() => {
        this.tableData = tableData;
      }, 1000);
    },
    getSummaries({ columns }) {
      ...
    },
    editSuc(obj) {
      this.dialogs[obj].show = false;
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.tableData = []
      this.getList()
    }
  }
};
</script>
```

### transfer.vue

```
<template>
  <div>
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入表头名"
      v-model="value"
      :data="data"
    ></el-transfer>
    <el-button type="primary" @click="doSubmit()">提交</el-button>
  </div>
</template>

<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";
export default {
  props: {
    tableName: String
  },
  data() {
    return {
      TABLE_DATA_MAP,
      data: TABLE_DATA_MAP[this.tableName], // 当前页默认值
      value: [], // 现在在 transfer 右测的值
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      }
    };
  },
  computed: {
    currentTableData() {
      return this.$store.state.currentTableData;
    }
  },
  methods: {
    doSubmit() {
      let sData = [];
      this.value.map(items => {
        this.TABLE_DATA_MAP[this.tableName].forEach(item => {
          if (item.key === items) {
            sData.push(item);
          }
        });
      });
      // 这里如果是实际项目应该会给后端接口传值来保存当前用户该页面的设置
      this.$store.commit("SET_TABLE_DATA", {
        type: this.tableName,
        data: sData
      });
      this.$emit("editSuc");
    }
  },
  mounted() {
    this.value = [];
    // 这里如果是实际项目 currentTableData 应该是后端获取数据，而不是 vuex 获取
    if (this.currentTableData && this.currentTableData[this.tableName]) {
      this.currentTableData[this.tableName].forEach(item => {
        if (this.TABLE_DATA_MAP[this.tableName].includes(item.key)) {
          this.value.push(item.key);
        }
      });
    }
  }
};
</script>
```

### tableColumn.vue

```
<template>
  <div>
    <div
      v-for="(item, index) in ((currentTableData && currentTableData[tableName])? currentTableData[tableName]: TABLE_DATA_MAP[tableName])"
      :key="index + item"
    >
      <el-table-column>
        ...
      </el-table-column>
    </div>
  </div>
</template>

<script>
import { TABLE_DATA_MAP } from "@/utils/tableData";

export default {
  name: "table-column",
  props: {
    tableName: String
  },
  data() {
    return {
      TABLE_DATA_MAP
    };
  },
  computed: {
    // currentTableData 实际工作中应该是保存在后端的值
    currentTableData() {
      return this.$store.state.currentTableData;
    }
  }
};
</script>
```

### store/index.js

这里使用 vuex 存储 currentTableData（现在所配置的列表字段），如果是实际工作中，该数据应该存储于后端数据（后端保存当前用户对该页面的设置，而后在 tableColumn.vue 页获取）

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTableData: {}
  },
  mutations: {
    SET_TABLE_DATA(state, { type, data }) {
      state.currentTableData[type] = data
    }
  },
  actions: {
  },
  modules: {
  }
})
```

![image](https://upload-images.jianshu.io/upload_images/7094266-9f63140d164667ab?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image](https://upload-images.jianshu.io/upload_images/7094266-d4872f06ee2b2150?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

思路十分简单，本质就是在后端保存一份当前页面用户表格的私人定制 `TABLE_DATA_MAP` 文件。

# 2. 前端导出 table

导出 table 表格是很常见的需求，基本上一些统计页面必备。

导出有多种方式：

## 1. 后端实现数据

主要是后端将生成的 table 数据流给到前端，然后前端生成下载链接，模拟点击效果。

```
downloadFile(data) {
  if (!data) {
    return
  }
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', '导出数据.csv');
  document.body.appendChild(link);
  link.click()
}
```

此种方法适用于有分页且分页量十分大，还有页面数据的展示和导出与后端传递数据（与上面我们需要对数据进行百分比等变化的数据不同）的情况。

## 2. 前端导出

需要引入 xlsx 和 file-saver

```
yarn add slsx file-saver -S
```

前端实现导出常见的又有两种方法：

### 2.1. 通过页面 Dom 元素获取数据导出

```
/* eslint-disable */
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

/**
* 导出表格为 excel 格式
* param { Dom } id            // document.getElementById('table')
* param { string } fileName    // test.xlsx
  * param { Boolean } rawBool 纯文本解析将不会解析值
*/

export function exportExcelByDom(id, fileName, rawBool = true) {
  /**
  * element-ui fixed 是生成两个 table，一个仅用于固定
  * 判断要导出的节点中是否有 fixed 的表格
  * 如果有，转换 excel 时先将该 dom 移除，然后 append 回去
  */
  const fix = document.querySelector('.el-table__fixed') || document.querySelector('.el-table__fixed-right');
  let wb;
  /**
  * 从表生成工作簿对象
  */
  if (fix) {
    wb = XLSX.utils.table_to_book(document.getElementById(id).removeChild(fix), { raw: rawBool });
    document.getElementById(id).appendChild(fix);
  } else {
    wb = XLSX.utils.table_to_book(document.getElementById(id), { raw: rawBool });
  }

  /* 获取二进制字符串作为输出 */
  const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
  try {
    /**
    * Blob 对象表示一个不可变、原始数据的类文件对象。
    * Blob 表示的不一定是JavaScript原生格式的数据。
    * File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    * 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
    * 设置导出文件名称
    */
    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName)
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}
```

此种方法适用于无分页、导出数据即为页面看到的样子的情况。

### 2.2 通过 Export2Excel.js

```
/* eslint-disable */
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

/**
* Export2Excel.js
* param { Array } th            // ['姓名']
* param { Array } keyArray      // ['name']
  * param { Array } jsonData    // 处理好的所有数据
*/

export function export_json_to_excel(th, keyArray, jsonData, defaultTitle) {

  /* original data */
  let data = jsonData.map(v => keyArray.map(j => v[j]));
  data.unshift(th);
  let ws_name = "SheetJS";

  let wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
  let title = defaultTitle || '导出数据'
  FileSaver(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), title + ".xlsx")
};
...
// 其他部分省略
```

Export2Excel.js 网上有很多版本，大同小异。我对其 `export_json_to_excel` 函数作了封装，Export2Excel.js 里面也有通过 DOM 导出的方法，但使用时会崩溃，因此通过 DOM 导出推荐 2.1 方法

又得益于我们之前的 `TABLE_DATA_MAP` 文件，2.2 方法导出基本没有工作量的问题，节省了很大时间（相信看到这里，你能够体会到表驱动法对 table 的意义）

```
doExport2Excel() {
  const tHeader = ["ID"];
  const keyArray = ["id"];
  this.TABLE_DATA_MAP.tableDemo.forEach(item => {
    tHeader.push(item.label);
    keyArray.push(item.key);
  });
  // 这里 jsonData 应该是所要导出的所有数据，可让后端传值
  const jsonData = this.tableData;
  jsonData.forEach(list => {
    this.TABLE_DATA_MAP.tableDemo.forEach(keyObject => {
      if (keyObject.isPercent && keyObject.isPercent === true) {
        list[keyObject.key] = this.toPercent(
          list[keyObject.molecule],
          list[keyObject.denominator]
        );
      } else if (keyObject.isFixedTwo && keyObject.isFixedTwo === true) {
        list[keyObject.key] = this.toFixedTwo(
          list[keyObject.molecule],
          list[keyObject.denominator]
        );
      }
    });
  });
  export_json_to_excel(tHeader, keyArray, jsonData, "数据导出");
},
```

这种方法比 2.1 好在：很多时候导出的 table 列与展示的是不一致的（如通过列表配置，展示字段少于导出字段情况），我们甚至可以在导出时对某些字段作不同于页面展示的数据处理。

与此同时其解决了后端导出数据会与展示数据不一致的问题，在主动性和灵活性上更胜一筹。

---

花了快一天时间写 demo + 整理，暂时先写这么多

不定时更新。。。

以上完整代码看 [这里](https://github.com/Adashuai5/vue-element-plus)

整理不易，别忘了点个赞 😄！
