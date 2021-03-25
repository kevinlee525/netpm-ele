<template>
  <div class="pie">
    <div class="left" ref="pie"></div>
    <div class="right">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>分布详情</span>
        </div>
        <div>
          <div class="overpower">
            <span>Overpower</span>
            <hr />
            <el-table
              :data="overpower"
              border
              height="200px"
              :cell-style="rowClass"
              :header-cell-style="headClass"
              style="width: 100%"
            >
              <el-table-column prop="rack" label="rack"> </el-table-column>
              <el-table-column prop="value" label="value"> </el-table-column>
            </el-table>
          </div>
          <div class="spare">
            <span>Spare</span>
            <hr />
            <el-table
              :data="spare"
              border
              height="200px"
              :cell-style="rowClass"
              :header-cell-style="headClass"
              style="width: 100%"
            >
              <el-table-column prop="rack" label="rack"> </el-table-column>
              <el-table-column prop="value" label="value"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from "plugins/echarts";
import { getPower } from "network/power/power";
export default {
  name: "pie",
  data() {
    return {
      pie_options: {
        title: {
          text: "IDC-rack-power",
          subtext: "最近一周的数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: ["Overpower", "Normal", "Spare"],
        },
        series: [
          {
            name: "IDC-Power",
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
      pie: null,
      overpower: [],
      spare: [],
    };
  },
  methods: {
    draw() {
      this.pie = echarts.init(this.$refs.pie);
      this.pie.setOption(this.pie_options, true);
    },
    headClass() {
      return "text-align: center;background:#FFEC8B;color:red";
    },
    rowClass() {
      return "text-align: center;";
    },
    async getlatest() {
      const { data: ret } = await getPower({
        url: "/latest/",
        method: "get",
      });
      const { Overpower_list, Spare_list, Rack_num } = ret;
      this.overpower = Overpower_list;
      this.spare = Spare_list;
      const data = [
        { name: "Overpower", value: Overpower_list.length },
        {
          name: "Normal",
          value:
            Rack_num * 1 - Overpower_list.length * 1 - Spare_list.length * 1,
        },
        { name: "Spare", value: Spare_list.length },
      ];
      this.pie_options.series[0].data = data;
      this.draw();
    },
  },
  created() {
    this.getlatest();
  },
  mounted() {
    // this.draw();
  },
};
</script>

<style scoped>
.pie {
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
  /* background-color: lightgreen */
}
span {
  font-size: 150%;
}
.spare {
  margin-top: 10px;
}
.normal {
  margin-top: 10px;
}
</style>