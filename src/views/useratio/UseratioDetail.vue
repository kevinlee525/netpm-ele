<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="title">
      {{ title }}
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
      <el-table-column prop="Container" label="容器"> </el-table-column>
      <el-table-column prop="Mysql" label="数据库"> </el-table-column>
      <el-table-column prop="ES" label="ES"> </el-table-column>
      <el-table-column prop="Redis" label="Redis"> </el-table-column>
      <el-table-column prop="MongoDB" label="MongoDB"> </el-table-column>
      <!-- <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="querydetail(scope.row)"
            type="warning"
            size="small"
            >资源明细</el-button
          >
        </template> -->
      <!-- </el-table-column> -->
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.params.tier2,
      loading: false,
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