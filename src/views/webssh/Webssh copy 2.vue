<template>
<div>
    主机ip:<input v-model="ip" type="text" placeholder="主机IP" >
    用户名：<input v-model="username" type="text" placeholder="用户名">
    密码: <input v-model="pwd" type="password" placeholder="密码">
    <button>提交</button>
    <div class="console" id="terminal">  </div>
    </div>
</template>

<script>
import { Terminal } from 'xterm'
import * as attach from 'xterm/lib/addons/attach/attach'
import * as fit from 'xterm/lib/addons/fit/fit'
export default {
    name: "webssh",
    data() {
        return {
            term: null,
            terminalSocket: null,
            ip:"",
            username:"",
            pwd:"",
        }
    },
    methods: {
    },
    mounted() {
        //实例化一个websocket，用于和django江湖
        this.terminalSocket = new WebSocket("ws://127.0.0.1:8000/webssh/")
        // onopen     定义打开时的函数
        // onclose    定义关闭时的函数
        // onmessage  定义接收数据时候的函数
        //获取到后端传回的信息
        this.terminalSocket.onmessage = (res) => {
            console.log(res.data);
            // var message = JSON.parse(res.data);
            //将传回来的数据显示在xterm里
            this.term.writeln("\r\n" + res.data);
            //重置要发送的信息
            this.order = ""
            //换行，显示下一个开头
            this.term.write("\r\n$ ");
        }
        //ws连接的时候
        // this.terminalSocket.onopen = function(){
        //     console.log('websocket is Connected...')
        // }
        //ws关闭的时候
        // this.terminalSocket.onclose = function(){
        //     console.log('websocket is Closed...')
        // }
        //ws错误的时候
        // this.terminalSocket.onerror = function(){
        //     console.log('damn Websocket is broken!')
        // }
        // this.term.attach(this.terminalSocket)
        // 绑定xterm到ws流中 },
        let terminalContainer = document.getElementById('terminal')
        //创建xterm实例
        this.term = new Terminal({
            cursorBlink: true, // 显示光标
            cursorStyle: "underline" // 光标样式
        })                     // 创建一个新的Terminal对象

        this.term.open(terminalContainer)              // 将term挂载到dom节点上

        //在xterm上显示命令行提示
        this.term.write('$ ')
        //监听xterm的键盘事件
        this.term.on('key', (key, ev) => {
            // key是输入的字符 ev是键盘按键事件
            console.log("key==========", ev.keyCode);
            this.term.write(key) // 将输入的字符打印到黑板中
            if (ev.keyCode == 13) { // 输入回车
                // console.log("输入回车")
                // this.term.write('$ ')
                // console.log(this.order)

                //使用webscoket将数据发送到django
                this.terminalSocket.send(this.order)
                // this.order=''
                console.log("里面的order", this.order)
            } else if (ev.keyCode == 8) {//删除按钮
                //截取字符串[0,lenth-1]
                this.order = this.order.substr(0, this.order.length - 1)
                //清空当前一条的命令
                this.term.write("\x1b[2K\r")
                //简化当前的新的命令显示上
                this.term.write("$ " + this.order)

                console.log("截取的字符串" + this.order)
                typeof this.order
            } else {// 将每次输入的字符拼凑起来
                this.order += key
                console.log("外面的order", this.order)
            }
        })

    }
}
        
</script>


<style scoped>
</style>