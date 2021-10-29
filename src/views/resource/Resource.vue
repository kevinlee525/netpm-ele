<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="title">
        {{title}}
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
      <el-table-column prop="Sub" label="三级部门"> </el-table-column>
      <el-table-column prop="Phy" label="物理机"> </el-table-column>
      <el-table-column prop="opHost" label="OP宿主机"> </el-table-column>
      <el-table-column prop="dbaHost" label="DBA宿主机"> </el-table-column>
      <el-table-column prop="dbaPhy" label="DBA物理机"> </el-table-column>
       <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="querydetail(scope.row)"
                    type="warning"
                    size="small"
                    >资源明细</el-button>
                </template>
              </el-table-column>
    </el-table>
  </el-card>
 
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.params.tier1,
      loading:false,
      tableData:[
          {
              "Sub":"前端及测试部",
              "Phy":3,
              "opHost":10,
              "dbaHost":4,
              "dbaPhy":5
          },
          {
              "Sub":"WMS技术部",
              "Phy":2,
              "opHost":5,
              "dbaHost":6,
              "dbaPhy":3
          },
          {
              "Sub":"计划分拣技术部",
              "Phy":4,
              "opHost":11,
              "dbaHost":5,
              "dbaPhy":6
          },
          {
              "Sub":"配送开放技术部",
              "Phy":1,
              "opHost":11,
              "dbaHost":2,
              "dbaPhy":7
          },
          {
              "Sub":"自营技术部",
              "Phy":6,
              "opHost":12,
              "dbaHost":8,
              "dbaPhy":6
          },
      ]
    };
  },
  methods: {
    headClass() {
      return "text-align: center;background:#FFEC8B;color:red";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    querydetail(row){
        // console.log(row)
        this.$router.push("/resource/" + this.title + "/" + row.Sub + "/");
    }
  },
};
</script>

<style scoped>
.box-card {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 45px;
}
.title {
  /* background-color:rgb(255, 196, 0); */
  text-align: center;
  font-size: 280%;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: rgb(0, 89, 255);
}
</style>