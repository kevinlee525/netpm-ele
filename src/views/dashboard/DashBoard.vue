<template>
    <div class="mainbox">
        <div class="showTime"></div>
        <div class="left">
            <div class="panel bar">
                <h2>柱形图-就业行情</h2>
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
                        <li>前端需求人数</li>
                        <li>市场供应人数</li>
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
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours();//获取时
        var m = dt.getMinutes();//获取分
        var s = dt.getSeconds();//获取秒
        document.querySelector(".showTime").innerHTML = '当前时间：' + y + "年" + mt + "月" + day + "日" + "-" + h + ":" + m + ":" + s;
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }
    import echarts from 'plugins/echarts'
    export default {
        name: "DashBoard",
        mounted() {
            t = setTimeout(time, 1000);//開始运行
            this.draw()
        },
        methods: {
            draw() {
                let myChart01 = echarts.init(this.$refs.leftBar)
                myChart01.setOption({
                    tooltip:{
                        show:true,
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['裤子', '鞋子'],
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
                            name: '裤子',
                            type: 'bar',
                            data: [120, 100, 440,500]
                        },
                        {
                            name: '鞋子',
                            type: 'bar',
                            data: [200, 120, 240, 330]
                        }
                    ]
                })
                let myChart02 = echarts.init(this.$refs.leftLine)
                myChart02.setOption({
                    tooltip:{
                        show:true
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

            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/dashboard/dashboard.css";
</style>
