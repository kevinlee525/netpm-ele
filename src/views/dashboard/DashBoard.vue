<template>
    <div class="mainbox">
        <div class="showTime"></div>
        <div class="left">
            <div class="panel bar">
                <h2>DC01-BGP-PD</h2>
                <div style="color: white;text-align: center">
                    <el-date-picker
                            v-model="bwbgpDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="mini"
                            style="width:230px"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button size="mini" type="danger" :disabled="buttonbgp" @click="getbgpDate"
                               style="margin-left: 3px">提交
                    </el-button>
                </div>
                <div class="chart" ref="leftBar"></div>
                <div class="panel-footer"></div>
            </div>
            <div class="panel line">
                <h2>DC01-CU-PD</h2>
                <div style="color: white;text-align: center">
                    <el-date-picker
                            v-model="bwcuDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="mini"
                            style="width:230px"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button size="mini" type="danger" :disabled="buttoncu" @click="getcuDate"
                               style="margin-left: 3px">提交
                    </el-button>
                </div>
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
        document.querySelector(".showTime").innerHTML = '当前时间：' + y + "年" + mt.padStart(2, '0') + "月" + day.padStart(2, '0') + "日" + "-" + h.padStart(2, '0') + ":" + m.padStart(2, '0') + ":" + s.padStart(2, '0');
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }

    import echarts from 'plugins/echarts'
    import {getBW} from "network/dashboard/dashboard";

    export default {
        name: "DashBoard",
        computed: {
            buttonbgp() {
                if (!this.bwbgpDate) {
                    return true
                } else false
            },
            buttoncu() {
                if (!this.bwcuDate) {
                    return true
                } else false
            }
        },
        data() {
            return {
                bwbgpDate: '',
                bwcuDate: '',
                bwtelDate: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                bgp_pd_option: {
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
                            data: [],
                            // data: this.$store.state.bgp_pd_xAxis,
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
                            axisLine: {
                                lineStyle: {
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
                            // data: this.$store.state.dc01_bgp_pd,
                            data: [],
                            itemStyle: {
                                // 修改柱子圆角
                                barBorderRadius: 5
                            }
                        }
                    ]
                },
                bgp_pd: null,
                cu_pd_option: {
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
                            data: [],
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
                            axisLine: {
                                lineStyle: {
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
                            data: [],
                            itemStyle: {
                                // 修改柱子圆角
                                barBorderRadius: 5
                            }
                        }
                    ]
                },
                cu_pd: null,
            }
        },
        mounted() {
            t = setTimeout(time, 1000);//開始运行
            this.draw()
        },
        methods: {
            draw() {
                this.bgp_pd = echarts.init(this.$refs.leftBar)
                this.bgp_pd.setOption(this.bgp_pd_option, true);
                this.cu_pd = echarts.init(this.$refs.leftLine)
                this.cu_pd.setOption(this.cu_pd_option, true)

            },
            async getbgpDate() {
                let Datebj = {
                    start: this.bwbgpDate[0],
                    stop: this.bwbgpDate[1],
                    isp: 'bgp',
                };
                const {data: ret} = await getBW({
                    url: '/bw/',
                    method: 'post',
                    data: Datebj,
                });
                let date_arr = [];
                let bw_arr = [];
                ret.forEach((item) => {
                    date_arr.push(item['day']);
                    bw_arr.push(item['value'] * 2)
                    // bw_arr.push(item['value'])
                });
                this.bgp_pd_option.xAxis[0].data = date_arr;
                this.bgp_pd_option.series[0].data = bw_arr;
                // this.$store.commit('udXaxis',tmp_arr)
                // console.log(ret);
            },
            async getcuDate() {
                let Datebj = {
                    start: this.bwcuDate[0],
                    stop: this.bwcuDate[1],
                    isp: 'cu',
                };
                const {data: ret} = await getBW({
                    url: '/bw/',
                    method: 'post',
                    data: Datebj,
                });
                let date_arr = [];
                let bw_arr = [];
                ret.forEach((item) => {
                    date_arr.push(item['day']);
                    bw_arr.push(item['value'])
                    // bw_arr.push(item['value'])
                });
                this.cu_pd_option.xAxis[0].data = date_arr;
                this.cu_pd_option.series[0].data = bw_arr;
                // this.$store.commit('udXaxis',tmp_arr)
                // console.log(ret);
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
                deep: true
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
                deep: true
            },

        },

    }
</script>

<style scoped>
    @import "../../assets/css/dashboard/dashboard.css";
</style>
