<template>
    <el-card  class="box-card" shadow="hover">
        <div slot="header" class="header">
            <el-button type="primary" @click="getacl">Test</el-button>

        </div>
        <div>
            Go Test
        </div>
    </el-card>

</template>

<script>
    import {getAcl} from "network/acl/acl";

    export default {
        name: "TestAcl",
        methods:{
            getacl(){
                console.log(111);
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
