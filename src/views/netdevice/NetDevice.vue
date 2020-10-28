<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-input
        style="width: 185px"
        placeholder="请输入管理IP"
        v-model="mgt_ip"
        clearable
      >
      </el-input>
      <el-input
        style="width: 185px"
        placeholder="主机名"
        v-model="hostname"
        clearable
      >
      </el-input>
      <el-input
        style="width: 185px"
        placeholder="业务网段"
        v-model="pd_net"
        clearable
      >
      </el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
    </div>
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
    <div class="pagination">
      <el-pagination
        background
        layout="sizes,prev, pager, next,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        :page-sizes="[5, 10, 20, 50]"
      >
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
      total: null,
      size: null,
      mgt_ip: null,
      hostname: null,
      pd_net:null,
    };
  },
  created() {
    this.getinfo();
  },
  methods: {
    async handleSizeChange(val) {
      this.size = val;
      const { data: res } = await getNetdevice({
        url: "/asset/v1/netdevice/" + `?size=${val}`,
      });
      this.tableData = res.results;
    },
    handleCurrentChange(val) {
      getNetdevice({
        url: "/asset/v1/netdevice/" + `?page=${val}` + "&size=" + this.size,
      }).then((res) => {
        this.tableData = res.data.results;
      });
    },
    getinfo() {
      getNetdevice({
        url: "/asset/v1/netdevice/",
      }).then((res) => {
        this.tableData = res.data.results;
        this.total = res.data.count;
      });
    },
    conn(row) {
      console.log(row);
    },
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#FFEC8B;color:red";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    search() {
      console.log(11111);
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
  bottom: 10px;
  right: 15px;
}
.header {
  text-align: center;
}
.el-input {
  margin-right: 25px;
}
</style>