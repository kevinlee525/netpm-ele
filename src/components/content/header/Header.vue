<template>
  <el-menu
    :default-active="currentPath"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#323A40"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item>NetPM</el-menu-item>
    <el-menu-item index="/arp/">arp</el-menu-item>
    <el-menu-item index="/acl/">acl</el-menu-item>
    <el-menu-item index="/dashboard/">dashboard</el-menu-item>
    <!-- <el-menu-item index="/budget/">capex</el-menu-item> -->
    <!-- <el-menu-item index="/useratio/">useratio</el-menu-item> -->
    <el-menu-item index="/netdevice/">netdevice</el-menu-item>
    <!-- <el-menu-item index="/webssh/">webssh</el-menu-item> -->
    <el-submenu index="1">
      <template slot="title">power</template>
      <el-menu-item index="/trend/">单机柜趋势图</el-menu-item>
      <el-menu-item index="/pie/">整机房机柜饼图</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">友情链接</template>
      <el-menu-item index="" @click="See01">流量气象图</el-menu-item>
      <el-menu-item index="" @click="See02">流量分析平台</el-menu-item>
      <el-menu-item index="" @click="See03">3A平台</el-menu-item>
      <el-menu-item index="" @click="See04">网络监控</el-menu-item>
      <el-menu-item index="" @click="See05">网络备份</el-menu-item>
      <el-menu-item index="" @click="See06">网络日志查询</el-menu-item>
      <el-menu-item index="" @click="See07">链路质量</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "Header",
  data() {
    return {
      currentPath: "/arp/",
      paths: [
        { name: "dashboard", path: "/dashboard/" },
        { name: "arp", path: "/arp/" },
        { name: "acl", path: "/acl/" },
        { name: "netdevice", path: "/netdevice/" },
        { name: "power", path: "/power/" },
        // { name: "webssh", path: "/webssh/" },
        // { name: "capex", path: "/budget/" },
        // { name: "useratio", path: "/useratio/" },
      ],
    };
  },
  created() {
    this.paths.forEach((item) => {
      if (this.$route.path == item.path) {
        this.currentPath = item.path;
      }
    });
  },
  methods: {
    handleSelect(key, keyPath) {
      // this.$router.push('/' + keyPath)
      // console.log(key, keyPath);
    },
    See01() {
      window.open(
        "http://10.9.60.106/plugins/weathermap/weathermap-cacti-plugin.php"
      );
    },
    See02() {
      window.open("http://10.9.60.109/nfsen/nfsen.php");
    },
    See03() {
      window.open("http://10.9.60.100/?module=main");
    },
    See04() {
      window.open("http://10.9.60.102/zabbix/zabbix.php?action=dashboard.view");
    },
    See05() {
      window.open("http://10.9.60.106:8000/");
    },
    See06() {
      window.open("http://10.9.60.115:5601/app/kibana");
    },
    See07() {
      window.open("http://10.9.60.108/smokeping");
    },
  },
};
</script>

<style scoped>
.el-menu-item {
  font-size: 16px;
}
</style>
