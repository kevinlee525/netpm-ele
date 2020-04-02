<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="header">
            <el-input style="width: 185px"
                      placeholder="请输入业务IP或管理IP"
                      v-model="ip"
                      clearable
                      @blur="blur()"
                      @clear="clearData([])">
            </el-input>
            <el-dropdown>
                <el-button type="primary">
                    提交<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="getarp">获取ARP</el-dropdown-item>
                    <el-dropdown-item @click.native="getInterface">获取Interfaces</el-dropdown-item>
                    <el-dropdown-item @click.native="getChassis">获取Chassis</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-table
                :data="tableData"
                height="500"
                border
                :cell-style="rowClass"
                :header-cell-style="headClass"
                style="width: 100%">
            <el-table-column
                    prop="ipAddr"
                    label="ipAddr"
                    >
            </el-table-column>
            <el-table-column
                    prop="macAddr"
                    label="macAddr"
                    >
            </el-table-column>
            <el-table-column
                    prop="ifName"
                    label="ifName">
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    import {isValidIP} from 'common/utils'
    import {Message} from 'element-ui'
    import {getArp} from "network/netdevice/netdevice";

    import {mapState,mapMutations} from 'vuex'

    export default {
        name: "NetDevice",
        data() {
            return {
                ip: '',
            }
        },
        computed:{
          // tableData(){
          //     return this.$store.state.tableData
          // }
          //   ...mapState({
          //       tableData:state => state.tableData
          //   })
            ...mapState(['tableData'])
        },
        methods: {
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
                        let switchInfo = res.pop();
                        Message({
                            message:switchInfo.hostname + ' ' + switchInfo.ip,
                            type:'success'
                        });

                        this.$store.commit('udtableData',res)
                    }
                } catch (e) {
                    Message({
                        message: '请输入IP',
                        type: 'warning'
                    })
                }

            },
            blur() {
                if (!isValidIP(this.ip)) {
                    Message({
                        message: 'Invalid IP!',
                        type: 'warning'
                    })
                }
            },
            getInterface() {
                Message({
                    message: '暂未上线!',
                    type: 'error'
                })
            },
            getChassis() {
                Message({
                    message: '暂未上线!',
                    type: 'error'
                })
            },
            // 表头样式设置
            headClass() {
                return 'text-align: center;background:#FFEC8B;color:red'
            },
            // 表格样式设置
            rowClass() {
                return 'text-align: center;'
            },
            // clearData(){
            //     this.$store.commit('udtableData',[])
            // },
            ...mapMutations({ //在方法里传递参数，会自动传递
              clearData:'udtableData'
            })
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
        margin: 0 auto;
        width: 400px;
    }
</style>
