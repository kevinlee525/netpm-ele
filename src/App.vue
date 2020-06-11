<template>
  <div id="app">
    <Header/>
    <div class="body-show">
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/header/Header'
import Footer from 'components/content/footer/Footer'
  export default {
     name:'App',
     components:{
       Header,
       Footer
     }
  }
</script>

<style>
  @import "assets/css/base.css";
  .body-show {
    position: relative;
    background-color: #eeeeee;
    height: 710px;
  }

</style>
