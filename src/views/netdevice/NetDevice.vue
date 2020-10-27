<template>
  <el-card class="box-card" shadow="hover">
    <el-table
      :data="tableData"
      height="500"
      border
      :cell-style="rowClass"
      :header-cell-style="headClass"
      style="width: 100%"
    >
      <el-table-column prop="hostname" label="主机名"> </el-table-column>
      <el-table-column prop="mgt_ip" label="管理IP"> </el-table-column>
      <el-table-column prop="p_net" label="业务网段"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="conn(scope.row)"
            type="warning"
            size="small"
          >
            连接
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class=pagination>
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </el-card>
</template>
<script>
import { getNetdevice } from "network/netdevice/netdevice";
export default {
  name: "netdevice",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      getNetdevice({
        url: "/asset/v1/netdevice/",
      }).then((res) => {
        this.tableData = res.data.results;
        //  console.log(res.data.results)
      });
    },
    conn(row){
        console.log(row)
    },
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#FFEC8B;color:red";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
  },
};
</script>
<style scoped>
.box-card {
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  height: 650px;
}
.pagination {
    position: absolute;
    bottom: 50px;
    right: 15px;
}
</style>