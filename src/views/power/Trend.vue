<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="header">
      <div>
        <el-input
          style="width: 185px"
          placeholder="请输入机柜号 eg A01"
          v-model="rack"
          clearable
          @clear="clearData"
        >
        </el-input>
        <el-button type="primary" @click="getpower">提交</el-button>
        <el-upload class="upload" :action="url" :limit="1"
        name="power.xlsx">
          <el-button size="big" type="warning">点击上传</el-button>
        </el-upload>
      </div>
    </div>
    <div class="power" ref="power"></div>
  </el-card>
</template>

<script>
import { Message } from "element-ui";
import echarts from "plugins/echarts";
import { getPower } from "network/power/power";
export default {
  name: "trend",
  data() {
    return {
      url: "http://netpm.yunshanmeicai.com/be/upload/",
      rack: "",
      power_option: {
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
          // 通过坐标轴来触发
          trigger: "axis",
        },
        legend: {
          // 距离容器10%
          // right: "10%",
          top: "5%",
          left: "center",
          // 修饰图例文字的颜色
          textStyle: {
            color: "#4c9bfd",
          },
          // // 如果series 里面设置了name，此时图例组件的data可以省略
          // data: ["A01"],
        },
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
          data: ["20-11-26", "20-12-03", "20-12-10"],
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
            name: "",
            type: "line",
            // stack: "总量",
            // 是否让线条圆滑显示
            smooth: true,
            data: [],
          },
        ],
      },
      power: null,
    };
  },
  mounted() {
    // this.draw();
  },

  methods: {
    clearData() {
      // this.$router.go(0);
      // this.$forceUpdate()
      if(!this.rack){
        this.power_option.xAxis.data = [];
        this.power_option.series[0].data = [];
        this.power_option.series[0].name = '';
        this.draw()
      }

    },
    draw() {
      this.power = echarts.init(this.$refs.power);
      this.power.setOption(this.power_option, true);
    },
    async getpower() {
      let post_data = {
        rack: this.rack,
      };
      const { data: ret } = await getPower({
        url: "/power/",
        method: "post",
        data: post_data,
      });
      if (ret.code === 1111) {
        Message({
          message: ret.msg,
          type: "warning",
        });
      } else {
        this.power_option.series[0].name = this.rack + "电量峰值";
        // this.power_option.xAxis.data = Object.keys(ret[this.rack])
        this.power_option.xAxis.data = [];
        this.power_option.series[0].data = [];
        for (const [key, value] of Object.entries(ret[this.rack])) {
          // console.log(`${key}: ${value}`)
          this.power_option.series[0].data.push(`${value}`);
          this.power_option.xAxis.data.push(`${key}`);
        }
        this.draw();
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
.header {
  margin: 0 auto;
  width: 500px;
}
.power {
  height: 530px;
  width: 100%;
  background-color: darkcyan;
}
.upload {
  float: right;
}
</style>