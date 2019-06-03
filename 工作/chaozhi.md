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
分页
```
<div class="pagination-container t-right">
        <el-pagination
            @current-change="jumpPage"
            @size-change="changeSizes"
            :current-page="params.page"
            :page-size="params.per_page"
            :page-sizes="pageSizeType"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
```
[Vue+Element动态生成新表单并添加验证](https://blog.csdn.net/m0_37036014/article/details/84104903)
edit-source 添加标签提示
```
<el-tooltip class="item" effect="light" content="新建名片或导入名片，名片默认归属部门" placement="bottom">
          <span style="margin-left: 10px;"><i class="iconfont iconwenhao bg-yellow"></i></span>
        </el-tooltip>
```
提交按钮
```
<el-button @click="$emit('close')" class="submit">取消</el-button>
      <el-button type="primary" @click="doSubmit" class="submit">提交</el-button>
```
地域
```
<span>{{ scope.row.province }}<span v-if="scope.row.province">-</span>{{ scope.row.city || '未知' }}</span>
```
姓名
```
<el-table-column prop="name"
                         label="姓名"
                         min-width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.name" placement="bottom">
              <span class="txt-hide">{{ scope.row.name }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
```
最后备注
```
<el-table-column prop="counsel_remark"
                         label="最后咨询备注"
                         fixed="right"
                         min-width="140">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.counsel_remark" placement="bottom">
              <span class="txt-hide">{{ scope.row.counsel_remark }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
```
