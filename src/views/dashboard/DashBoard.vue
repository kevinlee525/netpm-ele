<template>
  <div class="mainbox">
    <div class="left">
      <div class="panel bar">
        <h2>DC01-BGP-PD</h2>
        <div style="color: white; text-align: center">
        </div>
        <div class="chart" ref="leftBar"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel line">
        <h2>DC01-CU-PD</h2>
        <div style="color: white; text-align: center">
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
  
        </div>
        <div class="chart" ref="rightBar"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel line">
        <h2>DC01-BGP-EXIT</h2>
        <div style="color: white; text-align: center">

        </div>
        <div class="chart" ref="rightline"></div>
        <div class="panel-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
    var t = null;

    function time() {
        clearTimeout(t);//清除定时器
        let timeDiv = document.querySelector('.showtime')
        let dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1 + '';
        var day = dt.getDate() + '';
        var h = dt.getHours() + '';//获取时
        var m = dt.getMinutes() + '';//获取分
        var s = dt.getSeconds() + '';//获取秒
        timeDiv.innerHTML = '当前时间：' + y + "年" + mt.padStart(2, '0') + "月" + day.padStart(2, '0') + "日" + "-" + h.padStart(2, '0') + ":" + m.padStart(2, '0') + ":" + s.padStart(2, '0');
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }
    export default {
        mounted(){
            t = setTimeout(time,1000)
        }
    }

</script>
<style scoped>
@import "../../assets/css/dashboard/dashboard.css";
</style>