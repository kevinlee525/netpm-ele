<template>
  <div id="app">
    <Header/>
    <div class="body-show">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/header/Header'
  export default {
     name:'App',
     components:{
       Header
     }
  }
</script>

<style>
  @import "assets/css/base.css";
  .body-show {
    /*margin-top: 60px;*/
  }

</style>
