<template>
    <div class="mainbox">
        <div class="showTime"></div>
        <div class="left">
            <div class="panel bar">
                <h2>DC01-BGP-PD</h2>
                <div style="color: white;text-align: center">
                    <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="mini"
                            style="width:230px"
                            value-format="yyyy-MM-dd"
                            @change="getDate">
                    </el-date-picker>
                </div>
                <div class="chart" ref="leftBar"></div>
                <div class="panel-footer"></div>
            </div>
            <div class="panel line">
                <h2>线形图-就业行情</h2>
                <div class="chart" ref="leftLine"></div>
                <div class="panel-footer"></div>
            </div>
        </div>
        <div class="center">
            <div class="no">
                <div class="no-hd">
                    <ul>
                        <li class="line">125811</li>
                        <li>104563</li>
                    </ul>
                </div>
                <div class="no-bd">
                    <ul>
                        <li>公网总带宽</li>
                        <li>专线总带宽</li>
                    </ul>
                </div>
            </div>
            <div class="map">
                <div class="map1"></div>
                <div class="map2"></div>
                <div class="map3"></div>
                <div class="chart"></div>
            </div>
        </div>
        <div class="right">
            <div class="panel bar">
                <h2>柱形图-就业行情</h2>
                <div class="chart">图表</div>
                <div class="panel-footer"></div>
            </div>
            <div class="panel line">
                <h2>柱形图-就业行情</h2>
                <div class="chart">图表</div>
                <div class="panel-footer"></div>
            </div>

        </div>

    </div>
</template>

<script>
    var t = null;

    function time() {
        clearTimeout(t);//清除定时器
        let dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1 + '';
        var day = dt.getDate() + '';
        var h = dt.getHours() + '';//获取时
        var m = dt.getMinutes() + '';//获取分
        var s = dt.getSeconds() + '';//获取秒
        document.querySelector(".showTime").innerHTML = '当前时间：' + y + "年" + mt.padStart(2,'0') + "月" + day.padStart(2,'0') + "日" + "-" + h.padStart(2,'0') + ":" + m.padStart(2,'0') + ":" + s.padStart(2,'0');
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }

    import echarts from 'plugins/echarts'

    export default {
        name: "DashBoard",
        data(){
          return {
              value1:''
          }
        },
        mounted() {
            t = setTimeout(time, 1000);//開始运行
            this.draw()
        },
        methods: {
            draw() {
                let myChart01 = echarts.init(this.$refs.leftBar)
                myChart01.setOption({
                    color: ['#2f89cf'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: '10%',
                        left: '0%',
                        right: '0%',
                        bottom: '4%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Sat','Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri' ],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                color: "rgba(255,255,255,.6)",
                                fontSize: "12"
                            },
                            axisLine: {
                                show: false
                                // 如果想要设置单独的线条样式
                                // lineStyle: {
                                //     color: "rgba(255,255,255,.1)",
                                //     width: 1,
                                //     type: "solid"
                                // }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    color: "rgba(255,255,255,.6)",
                                    fontSize: 12
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color: "rgba(255,255,255,.1)",
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,.1)"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '峰值带宽',
                            type: 'bar',
                            barWidth: '35%',
                            data: this.$store.state.dc01_bgp_pd,
                            itemStyle: {
                                // 修改柱子圆角
                                barBorderRadius: 5
                            }
                        }
                    ]
                });
                let myChart02 = echarts.init(this.$refs.leftLine)
                myChart02.setOption({
                    color: ['red', 'yellow', 'green'],
                    tooltip: {
                        show: true
                    },
                    legend: {
                        data: ['衣服', '帽子'],
                        top: 15
                    },
                    // X轴
                    xAxis: {
                        data: [
                            '一月', '二月', '三月', '四月'
                        ]
                    },
                    // Y轴
                    yAxis: {},
                    // 数据
                    series: [
                        {
                            name: '衣服',
                            type: 'line',
                            data: [120, 100, 440, 500]
                        },
                        {
                            name: '帽子',
                            type: 'line',
                            data: [200, 120, 240, 330]
                        },
                    ]
                })

            },
            getDate(){
                console.log(this.value1);
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/dashboard/dashboard.css";
</style>
