<template>
<div>
    Welcome to {{info}}
</div>
    
</template>

<script>
export default {
    name:'BudgetDetail',
    data(){
        return {
            info:this.$route.params.tier1
        }
    }
    
}
</script>


<style scoped>

</style>