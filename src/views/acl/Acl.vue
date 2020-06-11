<template>
   <el-card  class="box-card" shadow="hover">
       <div slot="header" class="header">
           <el-button type="primary" @click="c1">Stage</el-button>
           <el-button type="success" @click="c2">Test</el-button>
           <el-button type="warning" @click="c3">Pop</el-button>
       </div>
       <div>
           <router-view></router-view>
       </div>
   </el-card>
</template>

<script>
    export default {
        name: "Acl",
        methods:{
            c1(){
                if (this.$route.path == '/acl/stage/') {
                }
                else {
                    this.$router.push('/acl/stage/')

                }
            },
            c2(){
                if (this.$route.path == '/acl/test/'){}
                else{this.$router.push('/acl/test/')
                }
            },
            c3(){
                if(this.$route.path == '/acl/pop/'){}
                else { this.$router.push('/acl/pop/')
                }
            }
        }
    }
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
        text-align: center;
    }
</style>
