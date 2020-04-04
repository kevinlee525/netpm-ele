<template>
    <div class="mainbox">
        <div class="showTime"></div>
        <div class="left">
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
        document.querySelector(".showTime").innerHTML = '当前时间：' + y + "年" + mt + "月" + day + "日" +"-" + h + ":" + m + ":" + s;
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }
    export default {
        name: "DashBoard",
        mounted() {
            t = setTimeout(time, 1000);//開始运行
        }
    }
</script>

<style scoped>
   @import "../../assets/css/dashboard/dashboard.css";
</style>
