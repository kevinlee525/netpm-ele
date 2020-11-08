<template>
  <div class="mainbox">
    <div class="left">
      <div class="panel bar">
        <h2>DC01-BGP-PD</h2>
        <div style="color: white; text-align: center">
          <el-date-picker
            v-model="bwbgpDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width: 230px"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="bgpclear()"
          >
          </el-date-picker>
          <el-button
            size="mini"
            type="danger"
            :disabled="buttonbgp"
            @click="getbgpData"
            style="margin-left: 3px"
            >提交
          </el-button>
        </div>
        <div class="chart" ref="leftBar"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel line">
        <h2>DC01-CU-PD</h2>
        <div style="color: white; text-align: center">
          <el-date-picker
            v-model="bwcuDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width: 230px"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="cuclear()"
          >
          </el-date-picker>
          <el-button
            size="mini"
            type="danger"
            :disabled="buttoncu"
            @click="getcuData"
            style="margin-left: 3px"
            >提交
          </el-button>
        </div>
        <div class="chart" ref="leftLine"></div>
        <div class="panel-footer"></div>
      </div>
    </div>
    <div class="center">
      <div class="showtime"></div>
      <div class="map">
        <div class="map1"></div>
        <div class="map2"></div>
        <div class="map3"></div>
        <div class="chart"></div>
      </div>
    </div>
    <div class="right">
      <div class="panel bar">
        <h2>DC01-TEL-PD</h2>
        <div style="color: white; text-align: center">
          <el-date-picker
            v-model="bwtelDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width: 230px"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="telclear()"
          >
          </el-date-picker>
          <el-button
            size="mini"
            type="danger"
            :disabled="buttontel"
            @click="gettelData"
            style="margin-left: 3px"
            >提交
          </el-button>
        </div>
        <div class="chart" ref="rightBar"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel line">
        <h2>DC01-BGP-EXIT</h2>
        <div style="color: white; text-align: center">
          <el-date-picker
            v-model="bwbgpeDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width: 230px"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="bgpeclear()"
          >
          </el-date-picker>
          <el-button
            size="mini"
            type="danger"
            :disabled="buttonbgpe"
            @click="getbgpeData"
            style="margin-left: 3px"
            >提交
          </el-button>
        </div>
        <div class="chart" ref="rightLine"></div>
        <div class="panel-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
var t = null;

function time() {
  clearTimeout(t); //清除定时器
  let timeDiv = document.querySelector(".showtime");
  let dt = new Date();
  var y = dt.getFullYear();
  var mt = dt.getMonth() + 1 + "";
  var day = dt.getDate() + "";
  var h = dt.getHours() + ""; //获取时
  var m = dt.getMinutes() + ""; //获取分
  var s = dt.getSeconds() + ""; //获取秒
  timeDiv.innerHTML =
    "当前时间：" +
    y +
    "年" +
    mt.padStart(2, "0") +
    "月" +
    day.padStart(2, "0") +
    "日" +
    "-" +
    h.padStart(2, "0") +
    ":" +
    m.padStart(2, "0") +
    ":" +
    s.padStart(2, "0");
  t = setTimeout(time, 1000); //设定定时器，循环运行
}

import echarts from "plugins/echarts";
import { getBW } from "network/dashboard/dashboard";

export default {
  name: "DashBoard",
  computed: {
    buttonbgp() {
      if (!this.bwbgpDate) {
        return true;
      } else false;
    },
    buttoncu() {
      if (!this.bwcuDate) {
        return true;
      } else false;
    },
    buttontel() {
      if (!this.bwtelDate) {
        return true;
      } else false;
    },
    buttonbgpe() {
      if (!this.bwbgpeDate) {
        return true;
      } else false;
    },
  },
  data() {
    return {
      bwbgpDate: "",
      bwcuDate: "",
      bwtelDate: "",
      bwbgpeDate: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      bgp_pd_option: {
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: "10%",
          left: "0%",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            // data: this.$store.state.bgp_pd_xAxis,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            axisLine: {
              show: false,
              // 如果想要设置单独的线条样式
              // lineStyle: {
              //     color: "rgba(255,255,255,.1)",
              //     width: 1,
              //     type: "solid"
              // }
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "峰值带宽",
            type: "bar",
            barWidth: "35%",
            // data: this.$store.state.dc01_bgp_pd,
            data: [],
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: 5,
            },
          },
        ],
      },
      bgp_pd: null,
      cu_pd_option: {
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
          // 通过坐标轴来触发
          trigger: "axis",
        },
        // legend: {
        // 距离容器10%
        // right: "10%",
        // 修饰图例文字的颜色
        // textStyle: {
        //     color: "#4c9bfd"
        // }
        // 如果series 里面设置了name，此时图例组件的data可以省略
        // data: ["邮件营销", "联盟广告"]
        // },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          show: true,
          borderColor: "#012f4a",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          // 去除刻度
          axisTick: {
            show: false,
          },
          // 修饰刻度标签的颜色
          axisLabel: {
            color: "rgba(255,255,255,.7)",
          },
          // 去除x坐标轴的颜色
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          // 去除刻度
          axisTick: {
            show: false,
          },
          // 修饰刻度标签的颜色
          axisLabel: {
            color: "rgba(255,255,255,.7)",
          },
          // 修改y轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: "#012f4a",
            },
          },
        },
        series: [
          {
            name: "峰值带宽",
            type: "line",
            // stack: "总量",
            // 是否让线条圆滑显示
            smooth: true,
            data: [],
          },
        ],
      },
      cu_pd: null,
      tel_pd_option: {
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: "10%",
          left: "0%",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            axisLine: {
              show: false,
              // 如果想要设置单独的线条样式
              // lineStyle: {
              //     color: "rgba(255,255,255,.1)",
              //     width: 1,
              //     type: "solid"
              // }
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "峰值带宽",
            type: "bar",
            barWidth: "35%",
            // data: this.$store.state.dc01_bgp_pd,
            data: [],
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: 5,
            },
          },
        ],
      },
      tel_pd: null,
      bgpe_option: {
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
          // 通过坐标轴来触发
          trigger: "axis",
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          show: true,
          borderColor: "#012f4a",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          // 去除刻度
          axisTick: {
            show: false,
          },
          // 修饰刻度标签的颜色
          axisLabel: {
            color: "rgba(255,255,255,.7)",
          },
          // 去除x坐标轴的颜色
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          // 去除刻度
          axisTick: {
            show: false,
          },
          // 修饰刻度标签的颜色
          axisLabel: {
            color: "rgba(255,255,255,.7)",
          },
          // 修改y轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: "#012f4a",
            },
          },
        },
        series: [
          {
            name: "峰值带宽",
            type: "line",
            // stack: "总量",
            // 是否让线条圆滑显示
            smooth: true,
            data: [],
          },
        ],
      },
      bgpe: null,
    };
  },
  mounted() {
    t = setTimeout(time, 1000); //開始运行
    this.draw();
  },
  methods: {
    draw() {
      this.bgp_pd = echarts.init(this.$refs.leftBar);
      this.bgp_pd.setOption(this.bgp_pd_option, true);
      this.cu_pd = echarts.init(this.$refs.leftLine);
      this.cu_pd.setOption(this.cu_pd_option, true);
      this.tel_pd = echarts.init(this.$refs.rightBar);
      this.tel_pd.setOption(this.tel_pd_option);
      this.bgpe = echarts.init(this.$refs.rightline);
      this.bgpe.setOption(this.bgpe_option);
    },
    async getbgpData() {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中,请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.4)",
        target: this.$refs.leftBar,
      });
      let Datebj = {
        start: this.bwbgpDate[0],
        stop: this.bwbgpDate[1],
        isp: "bgp",
      };
      const { data: ret } = await getBW({
        url: "/bw/",
        method: "post",
        data: Datebj,
      });
      let date_arr = [];
      let bw_arr = [];
      ret.forEach((item) => {
        date_arr.push(item["day"]);
        bw_arr.push(item["value"] * 2);
        // bw_arr.push(item['value'])
      });
      this.bgp_pd_option.xAxis[0].data = date_arr;
      this.bgp_pd_option.series[0].data = bw_arr;
      if (bw_arr.length > 0) {
        loading.close();
      }
      // this.$store.commit('udXaxis',tmp_arr)
      // console.log(ret);
    },
    async getcuData() {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中,请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.4)",
        target: this.$refs.leftLine,
      });
      let Datebj = {
        start: this.bwcuDate[0],
        stop: this.bwcuDate[1],
        isp: "cu",
      };
      const { data: ret } = await getBW({
        url: "/bw/",
        method: "post",
        data: Datebj,
      });
      let date_arr = [];
      let bw_arr = [];
      ret.forEach((item) => {
        date_arr.push(item["day"]);
        bw_arr.push(item["value"]);
        // bw_arr.push(item['value'])
      });
      this.cu_pd_option.xAxis.data = date_arr;
      this.cu_pd_option.series[0].data = bw_arr;
      // this.$store.commit('udXaxis',tmp_arr)
      if(bw_arr.length > 0){
        loading.close()
      }
    },
    async gettelData() {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中,请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.4)",
        target: this.$refs.rightBar,
      });

      let Datebj = {
        start: this.bwtelDate[0],
        stop: this.bwtelDate[1],
        isp: "tel",
      };
      const { data: ret } = await getBW({
        url: "/bw/",
        method: "post",
        data: Datebj,
      });
      let date_arr = [];
      let bw_arr = [];
      ret.forEach((item) => {
        date_arr.push(item["day"]);
        bw_arr.push(item["value"] * 2);
      });
      this.tel_pd_option.xAxis[0].data = date_arr;
      this.tel_pd_option.series[0].data = bw_arr;
      if(bw_arr.length > 0 ){
        loading.close()
      }
    },
    async getbgpeData() {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中,请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.4)",
        target: this.$refs.rightLine,
      });
      let Datebj = {
        start: this.bwbgpeDate[0],
        stop: this.bwbgpeDate[1],
        isp: "bgp-e",
      };
      const { data: ret } = await getBW({
        url: "/bw/",
        method: "post",
        data: Datebj,
      });
      let date_arr = [];
      let bw_arr = [];
      ret.forEach((item) => {
        date_arr.push(item["day"]);
        bw_arr.push(item["value"]);
      });
      this.bgpe_option.xAxis.data = date_arr;
      this.bgpe_option.series[0].data = bw_arr;
      if(bw_arr.length > 0){
        loading.close()
      }
    },
    bgpclear() {
      if (!this.bwbgpDate) {
        this.bgp_pd_option.xAxis[0].data = [];
        this.bgp_pd_option.series[0].data = [];
      }
    },
    cuclear() {
      if (!this.bwcuDate) {
        this.cu_pd_option.xAxis.data = [];
        this.cu_pd_option.series[0].data = [];
      }
    },
    telclear() {
      if (!this.bwtelDate) {
        this.tel_pd_option.xAxis[0].data = [];
        this.tel_pd_option.series[0].data = [];
      }
    },
    bgpeclear(){
      if(!this.bwbgpeDate){
      this.bgpe_option.xAxis.data = [];
      this.bgpe_option.series[0].data = [];
      }
    }
  },
  watch: {
    bgp_pd_option: {
      handler(newVal, oldVal) {
        if (this.bgp_pd) {
          if (newVal) {
            this.bgp_pd.setOption(newVal);
          } else {
            this.bgp_pd.setOption(oldVal);
          }
        } else {
          this.draw();
        }
      },
      deep: true,
    },
    cu_pd_option: {
      handler(newVal, oldVal) {
        if (this.cu_pd) {
          if (newVal) {
            this.cu_pd.setOption(newVal);
          } else {
            this.cu_pd.setOption(oldVal);
          }
        } else {
          this.draw();
        }
      },
      deep: true,
    },
    tel_pd_option: {
      handler(newVal, oldVal) {
        if (this.tel_pd) {
          if (newVal) {
            this.tel_pd.setOption(newVal);
          } else {
            this.tel_pd.setOption(oldVal);
          }
        } else {
          this.draw();
        }
      },
      deep: true,
    },
    bgpe_option: {
      handler(newVal, oldVal) {
        if (this.bgpe) {
          if (newVal) {
            this.bgpe.setOption(newVal);
          } else {
            this.bgpe.setOption(oldVal);
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
@import "../../assets/css/dashboard/dashboard.css";
</style>