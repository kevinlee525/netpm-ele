<template>
    <el-card  class="box-card" shadow="hover">
        <div slot="header" class="header">
            <el-button type="primary">Pop</el-button>

        </div>
        <div>
            Go Pop
        </div>
    </el-card>

</template>

<script>
    export default {
        name: "PopAcl"
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
