<template>
  <div class="detail">
    <div class="title">{{ title }}</div>
    <div class="box">
      <div class="idc" ref="idc"></div>
      <div class="ali" ref="ali"></div>
      <div class="ks" ref="ks"></div>
      <div class="tx" ref="tx"></div>
      <div class="baishan" ref="baishan"></div>
    </div>
    <!-- 注意要给高度 -->
  </div>
</template>

<script>
import echarts from "plugins/echarts";
import { getBudget } from "network/budget/budget";
export default {
  name: "BudgetDetail",
  data() {
    return {
      title: "",
      idc_options: {
        title: {
          text: "IDC",
          //   subtext: "最近一周的数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter: "{b} : {d}%",
        },
        legend: {
          type: "scroll",
          // orient: "horizontal",
          orient: "vertical",
          // right: 0,
          left: "left",
          top: 20,
        },
        series: [
          {
            name: "MC-Budget",
            type: "pie",
            radius: "55%",
            center: ["50%", "70%"],
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
      idc: null,
      ali_options: {
        title: {
          text: "Ali",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter: "{b} : {d}%",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "left",
          top: 20,
        },
        series: [
          {
            name: "MC-Budget",
            type: "pie",
            radius: "55%",
            center: ["50%", "70%"],
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
      ali: null,
      ks_options: {
        title: {
          text: "KS",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter: "{b} : {d}%",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "left",
          top: 20,
          bottom: 20,
        },
        series: [
          {
            name: "MC-Budget",
            type: "pie",
            radius: "55%",
            center: ["50%", "70%"],
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
      ks: null,
      tx_options: {
        title: {
          text: "TX",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter: "{b} : {d}%",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "left",
          top: 20,
        },
        series: [
          {
            name: "MC-Budget",
            type: "pie",
            radius: "55%",
            center: ["50%", "70%"],
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
      tx: null,
      baishan_options: {
        title: {
          text: "Baishan",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter: "{b} : {d}%",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "left",
          top: 20,
        },
        series: [
          {
            name: "MC-Budget",
            type: "pie",
            radius: "55%",
            center: ["50%", "70%"],
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
      baishan: null,
    };
  },
  methods: {
    draw() {
      this.idc = echarts.init(this.$refs.idc);
      this.idc.setOption(this.idc_options, true);
      this.ali = echarts.init(this.$refs.ali);
      this.ali.setOption(this.ali_options, true);
      this.ks = echarts.init(this.$refs.ks);
      this.ks.setOption(this.ks_options, true);
      this.tx = echarts.init(this.$refs.tx);
      this.tx.setOption(this.tx_options, true);
      this.baishan = echarts.init(this.$refs.baishan);
      this.baishan.setOption(this.baishan_options, true);
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
      this.title = info.title;
      this.idc_options.series[0].data = info.idc;
      this.ali_options.series[0].data = info.ali;
      this.ks_options.series[0].data = info.ks;
      this.tx_options.series[0].data = info.tx;
      this.baishan_options.series[0].data = info.baishan;
      // const result = initSeries(info);
      // this.detail_options.series = result;
      this.draw();
    },
  },
  created() {
    this.getdetailbudget();
  },
};
</script>
<style scoped>
.body-show {
  height: 1400px;
}
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
.box {
  height: 550px;
  width: 100%;
  margin-top: 10px;
  /* background-color:rgb(228, 231, 36); */
}
.idc {
  float: left;
  width: 260px;
  height: 550px;
}
.ali {
  float: left;
  width: 260px;
  height: 550px;
}
.ks {
  float: left;
  width: 260px;
  height: 550px;
}
.tx {
  float: left;
  width: 260px;
  height: 550px;
}
.baishan {
  float: left;
  width: 265px;
  height: 550px;
}
</style>