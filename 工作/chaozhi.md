# Echart
map 
```
import "echarts/map/js/china.js";
```
# 样式
全局样式覆盖问题
# 部署
FinalShell SSH工具
## 测试环境
测试服务器地址： 101.201.222.8 
用户名： root 
密码： Dhx51657777 
```
cd /var/www/html/counsel.io
```
## UAT 环境（User acceptance testing）
UAT服务器地址： 101.201.68.57
用户名： root 
密码： Dhx51657777 

![image.png](https://upload-images.jianshu.io/upload_images/7094266-664f533637e301bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
[Vue+Element动态生成新表单并添加验证](https://blog.csdn.net/m0_37036014/article/details/84104903)
[JavaScript 纯JS生成验证码](https://www.jianshu.com/p/0d2e735dbaaa)
[如何用 JavaScript 实现 Popover](https://scarletsky.github.io/2017/02/18/implement-popover-with-javascript/)
```
<el-table-column
          prop="distribute_num"
          sortable="custom"
          min-width="120"
          label="已分配/分配上限"
          
        >
          <template slot-scope="scope" class="progress">
            <el-progress
              :show-text="false"
              :stroke-width="26"
              :percentage="(scope.row.distribute_num*1 / scope.row.first_allot_limit) *100" v-if="(scope.row.distribute_num*1 / scope.row.first_allot_limit) < 1"
            ></el-progress>
            <el-progress
              :show-text="false"
              :stroke-width="26"
              :percentage="(scope.row.distribute_num*1 / scope.row.first_allot_limit) *100" v-if="(scope.row.distribute_num*1 / scope.row.first_allot_limit) < 1"
            ></el-progress>
            <span class="percentage">{{scope.row.distribute_num}}/{{scope.row.first_allot_limit}}</span>
          </template>
        </el-table-column>
```
```
<el-table-column
          prop="unhandled_num"
          sortable="custom"
          min-width="120"
          label="已联系/未联系上限"
          v-if="(formList.unhandled_num / formList.discontact_limit) < 1"
        >
          <template slot-scope="scope" class="progress">
            <el-progress
              :show-text="false"
              :stroke-width="26"
              :percentage="(scope.row.unhandled_num / scope.row.discontact_limit) *100"
            ></el-progress>
            <span class="percentage">{{scope.row.unhandled_num}}/{{scope.row.discontact_limit}}</span>
          </template>
        </el-table-column>
```
```
.table-tab-height .progress {
  position: relative;
}
.table-tab-height .percentage {
  position: absolute;
  top: 10px;
  right: 30px;
  display: inline-block;
  font-size: 12px;
}
```
