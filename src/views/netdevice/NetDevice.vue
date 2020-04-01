<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="header">
            <el-input style="width: 185px"
                    placeholder="请输入业务IP或管理IP"
                    v-model="ip"
                    clearable
                    @blur="blur()">
            </el-input>
            <el-dropdown>
                <el-button type="primary">
                    提交<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="getarp" >获取ARP</el-dropdown-item>
                    <el-dropdown-item @click.native="getInterface">获取Interfaces</el-dropdown-item>
                    <el-dropdown-item @click.native="getChassis">获取Chassis</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
            table
        </div>
    </el-card>
</template>

<script>
    import {isValidIP} from 'common/utils'
    import {Message} from 'element-ui'
    import {getArp} from "network/netdevice/netdevice";

    export default {
        name: "NetDevice",
        data(){
            return {
                ip:''
            }
        },
        methods:{
           async getarp() {
               try {
                   const {data: res} = await getArp({
                       url: '/switch/arp/' + this.ip,
                   });
                   if (typeof (res) == 'string') {
                       Message({
                           message: 'No p_net found!',
                           type: 'warning'
                       })
                   } else {
                       console.log(res)
                   }
               }catch (e) {
                   Message({
                       message:'请输入IP',
                       type:'warning'
                   })
               }

           },
            blur(){
                if (!isValidIP(this.ip)) {
                    Message({
                        message:'Invalid IP!',
                        type:'warning'
                    })
                }
            },
            getInterface(){
                Message({
                    message:'暂未上线!',
                    type:'error'
                })
            },
            getChassis(){
                Message({
                    message:'暂未上线!',
                    type:'error'
                })
            },
        }
    }
</script>

<style scoped>
    .box-card{
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        height: 650px;
        /*background-color: darkcyan;*/
    }
    .header {
        margin: 0 auto;
        width: 400px;
        /*height: 35px;*/
    }

</style>
