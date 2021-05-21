<template>
  <div class="detail">
    <div class="title">Budget of {{ info }}</div>
    <div class="bar" ref="bar"></div><!-- 注意要给高度 -->
  </div>
</template>

<script>
import echarts from "plugins/echarts";
export default {
  name: "BudgetDetail",
  data() {
    return {
      info: this.$route.params.tier1,
      detail_options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          data: [
            "OP",
            "Arch",
            "IT",
            "Sec",
          ],
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
          data: ["IDC","AliCloud","KSCloud","TencentCloud","BaishanCloud"],
        },
        series: [
          {
            name: "OP",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [32, 12, 45, 0, 0],
          },
          {
            name: "Arch",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [12, 13, 28, 0, 35],
          },
          {
            name: "IT",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [22, 18, 19, 0, 29],
          },
          {
            name: "Sec",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [15, 21, 20, 0, 19],
          },
        ],
      },
      detail:null
    };
  },
  methods:{
      draw(){
          this.detail =  echarts.init(this.$refs.bar);
          this.detail.setOption(this.detail_options, true);
        // console.log(1111)
      }
  },
  mounted(){
      this.draw()
  }
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