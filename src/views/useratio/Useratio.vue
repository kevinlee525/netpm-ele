<template>
  <div class="resource">
    <div class="Left">
      <div class="month">
        <el-select
          v-model="value"
          clearable
          placeholder="请选择查看月份"
          @clear="rmdata"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="getmonthUseratio">提交</el-button>
      </div>
      <div class="left" ref="left"></div>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>分布详情</span>
        </div>
        <div>
          <div class="detail">
            <el-table
              :data="resourceInfo"
              border
              :cell-style="rowClass"
              :header-cell-style="headClass"
              style="width: 100%"
              height="500px"
            >
              <el-table-column prop="name" label="二级部门"> </el-table-column>
              <el-table-column prop="value" label="物理机"> </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="queryresource(scope.row)"
                    type="success"
                    size="small"
                    >资源明细</el-button>
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
import { getUseratio } from "network/useratio/useratio";
import { Message } from "element-ui";
export default {
  name: "Resource",
  data() {
    return {
      resource_options: {
        // title: {
        // text: "美菜成本分布",
        //   subtext: "最近一周的数据",
        // left: "center",
        // },
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter: "{b} : {d}%",
        },
        // legend: {
        // type: "scroll",
        // orient: "vertical",
        // right: 0,
        // left: "left",
        // top: 20,
        // bottom: 20,
        //   data: ["Technology", "BigCustomer"],
        // },
        series: [
          {
            name: "MC-Resource",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
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
      resource: null,
      resourceInfo: [],
      options: [
        { value: "202107", label: "202107" },
        { value: "202108", label: "202108" },
        { value: "202109", label: "202109" },
        // {value:'202110',label:'202110'},
        // {value:'202111',label:'202111'},
        // {value:'202112',label:'202112'},
        // {value:'202201',label:'202201'},
      ],
      value: "",
      currentMonth: "",
    };
  },
  methods: {
    draw() {
      this.resource = echarts.init(this.$refs.left);
      this.resource.setOption(this.resource_options, true);
    },
    headClass() {
      return "text-align: center;background:#FFEC8B;color:red";
    },
    rowClass() {
      return "text-align: center;";
    },
    async getmonthUseratio() {
      // Message({
      // message: "开发中...待上线",
      // type: "warning",
      // });
      const { data: ret } = await getUseratio({
        url: "/resource/",
        method: "post",
        data: {
          month: this.value,
        },
      });
      this.resource_options.series[0].data = ret;
      this.resourceInfo = ret;
      // this.currentMonth = this.value;
      this.draw();
    },
    // async getlatestmonthbudget() {
    //   const { data: ret } = await getBudget({
    //     url: "/budget/",
    //     method: "post",
    //     data: {
    //       month: this.currentMonth,
    //     },
    //   });
    //   this.budget_options.series[0].data = ret;
    //   this.budgetInfo = ret;
    //   this.draw();
    // },
    rmdata() {
      this.resource_options.series[0].data = [];
      this.resourceInfo = [];
      this.currentMonth = "";
    },
    queryresource(row) {
      console.log(row.code);
      // this.$router.push("/resource/" + row.code + "/" + this.value + "/");
      // this.$router.push("/resource/" + row.code);
    },
  },
  mounted() {
    this.getmonthUseratio()
  },
  created() {
    // let dt = new Date();
    // var y = dt.getFullYear();
    // var mt = dt.getMonth() + "";
    // this.currentMonth = y + mt.padStart(2, "0");
    // this.value = this.currentMonth;
    // this.getlatestmonthbudget();
  },
  watch: {
    resource_options: {
      handler(newVal, oldVal) {
        if (this.resource) {
          if (newVal) {
            this.resource.setOption(newVal);
          } else {
            this.resource.setOption(oldVal);
          }
        } else {
          this.draw();
        }
      },
      deep: true,
    },
  },
};
</script>


<style scoped>
.resource {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 45px;
  background-color: #ffffff;
}
.Left {
  float: left;
  width: 650px;
  height: 650px;
  /* text-align: center; */
}
.month {
  z-index: 1000;
  position: absolute;
  left: 220px;
}
.left {
  position: absolute;
  left: 0;
  top: -50px;
  width: 650px;
  height: 600px;
}
.right {
  float: right;
  width: 650px;
  height: 650px;
  /* background-color: lightgreen; */
}
span {
  font-size: 150%;
}
</style>