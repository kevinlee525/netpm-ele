<template>
  <div class="detail">
    <div class="title">{{ title }}</div>
    <div class="bar" ref="bar"></div>
    <!-- 注意要给高度 -->
  </div>
</template>

<script>
import echarts from "plugins/echarts";
import { getBudget } from "network/budget/budget";
import { initSeries } from "common/utils";
export default {
  name: "BudgetDetail",
  data() {
    return {
      title: '',
      detail_options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
          // formatter:function(params){
          //   var relVal = params[0].name;
          //   var value = 0;
          //   for (var i = 0, l = params.length; i < l; i++) {
          //     value += params[i].value;
          //   }
          //   for (var i = 0, l = params.length; i < l; i++) {
          //     relVal += '' + params[i].seriesName + ' : ' + (100 *parseFloat(params[i].value) / parseFloat(value)).toFixed(2) + "%";
          //   }
          //   return relVal;
          // }
        },
        legend: {
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["IDC", "AliCloud", "KSCloud", "TencentCloud", "BaishanCloud"],
        },
        series: [],
      },
      detail: null,
    };
  },
  methods: {
    draw() {
      this.detail = echarts.init(this.$refs.bar);
      this.detail.setOption(this.detail_options, true);
    },
    async getdetailbudget() {
      const { data: ret } = await getBudget({
        url: "/budget/",
        method: "get",
        params: {
          department: this.$route.params.tier1,
        },
      });
      const info = ret.info;
      // console.log(info)
      this.detail_options.legend.data = info.subdepart
      this.title = info.title
      const result = initSeries(info);
      this.detail_options.series = result
      this.draw()
    },
  },
  mounted() {
    // this.draw();
  },
  created() {
    this.getdetailbudget();
  },
};
</script>


<style scoped>
.detail {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 45px;
  background-color: #ffffff;
}
.title {
  /* background-color:rgb(255, 196, 0); */
  text-align: center;
  font-size: 280%;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: rgb(0, 89, 255);
}
.bar {
  height: 550px;
  width: 1200px;
  margin-top: 10px;
}
</style>