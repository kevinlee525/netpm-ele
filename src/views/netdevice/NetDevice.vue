<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="header">
            <el-input style="width: 185px"
                    placeholder="请输入业务IP或管理IP"
                    v-model="input"
                    clearable>
            </el-input>
            <el-dropdown>
                <el-button type="primary">
                    提交<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>获取ARP</el-dropdown-item>
                    <el-dropdown-item>获取Interfaces</el-dropdown-item>
                    <el-dropdown-item>获取Chassis</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
            table
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "NetDevice",
        data(){
            return {
                input:''
            }
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
