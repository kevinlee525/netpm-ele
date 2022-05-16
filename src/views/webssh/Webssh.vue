<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="header">
            <el-input style="width:150px" placeholder="请输入用户名" 
            v-model="username" clearable></el-input>
            <el-input style="width:150px" placeholder="请输入密码" 
            v-model="pwd" clearable show-password ></el-input>
            <el-button type="primary" @click="connect">连接</el-button>
        </div>
        <div class="console" id="terminal"> </div>
        </el-card>
</template>

<script>
import { Terminal } from 'xterm'
import * as attach from 'xterm/lib/addons/attach/attach'
import * as fit from 'xterm/lib/addons/fit/fit'

import { getMgtIP } from '../../common/utils'
import { Message } from 'element-ui'

export default {
    name: "webssh",
    data() {
        return {
            term: null,
            terminalSocket: null,
            username: "",
            pwd: "",
            ret: null,
        }
    },
    methods: {
        get_term_size() {
            var init_width = 9.5;
            var init_height = 20;

            var windows_width = window.innerWidth;
            var windows_height = window.innerHeight;

            return {
                cols: Math.floor(windows_width / init_width),
                rows: Math.floor(windows_height / init_height)
            }
        },
        connect() {
            const connetInfo = "host=" + getMgtIP(this.$route.params.hostname) + "&user=" + this.username + "&password=" + window.btoa(this.pwd)
            const cols = this.get_term_size().cols
            const rows = this.get_term_size().rows
            const socketurl = "ws://127.0.0.1:8000/webssh/?" + connetInfo + "&width=" + cols + "&height=" + rows;
            const terminalContainer = document.getElementById('terminal')
            this.term = new Terminal(
                {
                    cols: cols,
                    rows: rows,
                    useStyle: true,
                    cursorBlink: true
                }
            )

            // console.log(socketurl)
            this.terminalSocket = new WebSocket(socketurl)
            // 打开 websocket 连接, 打开 web 终端
            this.terminalSocket.onopen = () => {
                this.term.open(terminalContainer)
            }
            // 读取服务器端发送的数据并写入 web 终端
            this.terminalSocket.onmessage = (recv) => {
                var data = JSON.parse(recv.data);
                var message = data.message;
                var status = data.status;
                // console.log(data);
                if (status === 0) {
                    this.term.write(message)
                } else if (status === 2) {
                    Message({
                        message:"Invalid Username or Password!",
                        type:"warning",
                    })
                    setTimeout(function () {
                        window.location.reload()
                    }, 1500)

                } else if (status === 1) {
                    console.log('Quit!');
                    this.$router.push("/netdevice/")
                    // $('#django-webssh-terminal').addClass('hide');
                    // setTimeout(function () { this.$router.push("/netdevice/") }, 2000)
                    // setTimeout(function () { window.location.reload() }, 2000)

                }
            };
            /*
            * status 为 0 时, 将用户输入的数据通过 websocket 传递给后台, data 为传递的数据, 忽略 cols 和 rows 参数
            * status 为 1 时, resize pty ssh 终端大小, cols 为每行显示的最大字数, rows 为每列显示的最大字数, 忽略 data 参数
            */
            var message = { 'status': 0, 'data': null, 'cols': null, 'rows': null };

            // 向服务器端发送数据  注意作用域的  this 的指向问题 ，使用箭头函数！！
            this.term.on('data', (data) => {
                message['status'] = 0;
                message['data'] = data;
                var send_data = JSON.stringify(message);
                this.terminalSocket.send(send_data)
            });

            // 监听浏览器窗口, 根据浏览器窗口大小修改终端大小
            // window.onresize(function () {
            //     var cols = get_term_size().cols;
            //     var rows = get_term_size().rows;
            //     message['status'] = 1;
            //     message['cols'] = cols;
            //     message['rows'] = rows;
            //     var send_data = JSON.stringify(message);
            //     this.terminalSocket.send(send_data);
            //     this.term.resize(cols, rows)
            // })
        },
    },
    mounted() {
        // this.ret = this.get_term_size()
    }
}

</script>


<style scoped>

.box-card {
    position:absolute;
    top:15px;
    left:15px;
    right: 15px;
    height: 650px;
    background-color: #fff;
}

.header {
    margin: 0 auto;
    width: 700px;
}

.console {
    height: 300px;
    width: 200px;
    margin-top: 10px;
    /* background-color: skyblue; */
}
.el-input {
    margin-right: 40px;
    margin-left: 40px;
}
</style>