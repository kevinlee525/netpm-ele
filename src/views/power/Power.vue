<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="header">
        <div>
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary">提交</el-button>
        </div>
    </div>
  </el-card>
</template>

<script>
export default {
    name: 'power',
    data(){
        return {
            value:'',
            options:[
                {
                    value:'A',
                    label:'A'
                },
                {
                    value:'B',
                    label:'B'
                },
                {
                    value:'C',
                    label:'C'
                },
                {
                    value:'D',
                    label:'D'
                },
                {
                    value:'E',
                    label:'E'
                },
            ]       
        }
    }
};
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