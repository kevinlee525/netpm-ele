<template>
    <el-card  class="box-card" shadow="hover">
        <div slot="header" class="header">
            <el-button type="primary">Stage</el-button>

        </div>
        <div>
            Go Stage
        </div>
    </el-card>

</template>

<script>
    export default {
        name: "StageAcl"
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
