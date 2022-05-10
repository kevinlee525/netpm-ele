<template>
    <div>
        <input type="text" v-model="message" />
        <p>
            <input type="button" @click="send" value="发送" />
        </p>
        <p>
            <input type="button" @click="close_socket" value="关闭" />
        </p>
    </div>
</template>

<script>
export default {
    name:"wstest",
    data(){
        return {
            message:"",
            testsocket:"",
        }
    },
    methods:{
        send(){
            this.testsocket.send(this.message)
            this.testsocket.onmessage = (res)=>{
                console.log("ws返回的结果:",res.data)
            }
        },
        close_socket(){
            this.testsocket.close()
        }
    },
    mounted(){
        this.testsocket = new WebSocket("ws://127.0.0.1:8000/webssh/")
        // onopen     定义打开时的函数
        // onclose    定义关闭时的函数
        // onmessage  定义接收数据时候的函数
        this.testsocket.onopen = function(){
            console.log("开始连接socket!")
        }
        this.testsocket.onclose = function(){
            console.log("socket连接已关闭!")
        }
    }

}

</script>


<style scoped>
</style>