<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="header">
            <span class="title">
            <el-button type="success" v-show="info">{{info}}
            </el-button>
            </span>
            <el-input style="width: 185px"
                      placeholder="请输入业务IP"
                      v-model="ip"
                      clearable
                      @blur="blur()"
                      @clear="clearData([])">
            </el-input>
            <el-button type="primary" @click="getacl">提交</el-button>
            <span class="add">
                <el-button type="warning"  icon="el-icon-edit" @click="dialogFormVisible = true">
                        添加
                </el-button>
            </span>
            <el-dialog title="五元组信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="GroupID" :label-width="formLabelWidth">
                        <el-input  v-model="form.GroupID" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="RuleID" :label-width="formLabelWidth">
                        <el-input v-model="form.RuleID" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="Action" :label-width="formLabelWidth">
                        <el-select v-model="form.Action" placeholder="请选择动作" style="width: 560px">
                            <el-option label="permit" value="permit"></el-option>
                            <el-option label="deny" value="deny"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Protocol" :label-width="formLabelWidth">
                        <el-select v-model="form.ProtocolType" placeholder="请选择协议" style="width:560px">
                            <el-option label="ip" value="ip"></el-option>
                            <el-option label="tcp" value="tcp"></el-option>
                            <el-option label="udp" value="udp"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="SrcIPv4" :label-width="formLabelWidth">
                        <el-input v-model="form.SrcIPv4" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="SrcPort" :label-width="formLabelWidth">
                        <el-input v-model="form.SrcPort" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="DstIPv4" :label-width="formLabelWidth">
                        <el-input v-model="form.DstIPv4" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="DstPort" :label-width="formLabelWidth">
                        <el-input v-model="form.DstPort" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="subbmit()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table
                :data="tableData"
                height="500"
                border
                :cell-style="rowClass"
                :header-cell-style="headClass"
                style="width: 100%">
            <el-table-column
                    prop="GroupID"
                    label="GroupID"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="RuleID"
                    label="RuleID"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="Action"
                    label="Action"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="ProtocolType"
                    label="Protocol"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="SrcIPv4"
                    label="SrcIPv4"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="SrcPort"
                    label="SrcPort"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="DstIPv4"
                    label="DstIPv4"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="DstPort"
                    label="DstPort"
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    >
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

</template>

<script>
    import {getAcl} from "network/acl/acl";
    import {isValidIP} from 'common/utils'
    import {Message} from 'element-ui'

    export default {
        name: "TestAcl",
        data() {
            return {
                ip: '',
                tableData: [],
                info:'test',
                dialogFormVisible: false,
                form: {
                    GroupID: '',
                    RuleID: '',
                    Action: '',
                    ProtocolType: '',
                    SrcIPv4: '',
                    SrcPort:'',
                    DstIPv4:'',
                    DstPort:'',
                },
                formLabelWidth: '70px',
            }
        },
        methods: {
            clearData(){
                this.tableData = []
            },
            subbmit(){
              this.dialogFormVisible = false;
              let info = this.form;
              console.log(info);
            },
            async getacl() {
                try {
                    let post_data = {
                        pd_ip: this.ip
                    };
                    const {data: ret} = await getAcl({
                        url: '/acl/',
                        method: 'post',
                        data: post_data,
                    });
                    if (typeof (ret.msg) == 'string'){
                        Message({
                            message : '该IP无ACL限制，畅通无阻',
                            type:'success'
                        })
                    }
                    else {
                        this.tableData = ret
                    }
                } catch (e) {
                    Message({
                        message : 'Sth. Wrong!',
                        type: 'warning'
                    })
                }
            },
            // 表头样式设置
            headClass() {
                return 'text-align: center;background:#FFEC8B;color:red'
            },
            // 表格样式设置
            rowClass() {
                return 'text-align: center;'
            },
            blur() {
                if (!isValidIP(this.ip)) {
                    Message({
                        message: 'Invalid IP!',
                        type: 'warning'
                    })
                }
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
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

    .title {
        position: absolute;
        left: 55px;
    }
    .add {
        position: absolute;
        right: 55px;
    }
</style>
