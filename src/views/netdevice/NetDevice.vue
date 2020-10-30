<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-input
        style="width: 185px"
        placeholder="主机名"
        v-model="hostname"
        clearable
        @clear="getinfo()"
      >
      </el-input>
      <el-input
        style="width: 185px"
        placeholder="管理IP"
        v-model="mgt_ip"
        clearable
        @clear="getinfo()"
      >
      </el-input>
      <el-input
        style="width: 185px"
        placeholder="业务网段"
        v-model="pd_net"
        clearable
        @clear="getinfo()"
      >
      </el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
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
import { Message } from "element-ui";
export default {
  name: "netdevice",
  data() {
    return {
      tableData: [],
      total: null,
      size: null,
      mgt_ip: null,
      hostname: null,
      pd_net: null,
      loading: true,
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
        // setTimeout(()=>{
        // this.loading = false
        // },1500)
        this.loading = false;
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
    async search() {
      const keyword01 = this.mgt_ip;
      const keyword02 = this.hostname;
      const keyword03 = this.pd_net;
      this.loading = true;
      if (keyword01) {
        const { data: res } = await getNetdevice({
          url: "/asset/v1/netdevice/" + `?search=${keyword01}`,
        });
        if (res.count == 0) {
          Message({
            message: "暂无结果，请确认搜索条件!",
            type: "warning",
          });
          this.tableData = [];
          this.loading = false;
        } else {
          this.tableData = res.results;
          this.loading = false;
        }
      }
      if (keyword02) {
        const { data: res } = await getNetdevice({
          url: "/asset/v1/netdevice/" + `?search=${keyword02}`,
        });
        if (res.count == 0) {
          Message({
            message: "暂无结果，请确认搜索条件!",
            type: "warning",
          });
          this.tableData = [];
          this.loading = false;
        } else {
          this.tableData = res.results;
          this.loading = false;
        }
      }
      if (keyword03) {
        const { data: res } = await getNetdevice({
          url: "/asset/v1/netdevice/" + `?search=${keyword03}`,
        });
        if (res.count == 0) {
          Message({
            message: "暂无结果，请确认搜索条件!",
            type: "warning",
          });
          this.tableData = [];
          this.loading = false;
        } else {
          this.tableData = res.results;
          this.loading = false;
        }
      }
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