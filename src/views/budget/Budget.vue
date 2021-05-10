<template>
  <div class="budget">
    <div class="left" ref="left"></div>
    <div class="right">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>预算详情</span>
        </div>
        <div>
          <div class="detail">
            <el-table
              :data="budgetInfo"
              border
              height="200px"
              :cell-style="rowClass"
              :header-cell-style="headClass"
              style="width: 100%"
            >
              <el-table-column prop="department" label="depart"> </el-table-column>
              <el-table-column prop="value" label="value"> </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="querydetail(scope.row)"
                    type="warning"
                    size="small"
                  >
                    查看详细
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from "plugins/echarts";
export default {
  name: "Budget",
  data() {
    return {
      budget_options: {
        title: {
          text: "MC-Budget",
          //   subtext: "最近一周的数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          //   formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter: "{a} <br/>{b} : {d}%",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          //   data: ["Technology", "BigCustomer"],
        },
        series: [
          {
            name: "MC-Budget",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { name: "BigCustomer", value: "46" },
              { name: "Technology", value: "88" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      budget: null,
      budgetInfo: [
        {department:'BigCustomer',value:'46'},
        {department:'Technology',value:'88'}
      ],
    };
  },
  methods: {
    draw() {
      this.budget = echarts.init(this.$refs.left);
      this.budget.setOption(this.budget_options, true);
    },
    headClass() {
      return "text-align: center;background:#FFEC8B;color:red";
    },
    rowClass() {
      return "text-align: center;";
    },
    querydetail(row){
      console.log(row.department)
      console.log(row.value)
      this.$router.push('/budget/'+ row.department + '/')
    }

  },
  mounted() {
    this.draw();
  },
};
</script>


<style scoped>
.budget {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 45px;
  background-color: #ffffff;
}
.left {
  float: left;
  width: 600px;
  height: 600px;
}
.right {
  float: right;
  width: 700px;
  height: 650px;
  /* background-color: lightgreen; */
}
span {
  font-size: 150%;
}
/* .detail {
  height: 500px;
} */
</style>