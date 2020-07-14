<template>
    <el-card  class="box-card" shadow="hover">
        <div slot="header" class="header">
            <span class="title">
            <el-button type="warning" >Pop</el-button>
            </span>
            <el-input style="width: 185px"
                      placeholder="请输入业务IP"
                      v-model="ip"
                      clearable
                      @blur="blur()"
                      @clear="clearData([])">
            </el-input>
            <el-button type="primary">提交</el-button>
        </div>
        <div>
            Go Test
        </div>
    </el-card>

</template>

<script>
    import {getAcl} from "network/acl/acl";
    import  {isValidIP} from 'common/utils'
    import {Message} from 'element-ui'

    export default {
        name: "TestAcl",
        data(){
          return{
              ip:''
          }
        },
        methods:{
            async getacl(){
                let post_data = {
                    mgtIP:"10.9.255.92",
                    GroupID:"3111"
                };
                const {data:ret} =  await getAcl({
                    url:'/acl/',
                    method:'post',
                    data:post_data,
                });
                console.log(ret);

            },
            blur() {
                if (!isValidIP(this.ip)) {
                    Message({
                        message: 'Invalid IP!',
                        type: 'warning'
                    })
                }
            },
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
    .title {
        position: absolute;
        left: 55px;
    }
</style>
