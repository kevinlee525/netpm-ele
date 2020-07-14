<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="header">
            <span class="title">
            <el-button type="warning">Test</el-button>
            </span>
            <el-input style="width: 185px"
                      placeholder="请输入业务IP"
                      v-model="ip"
                      clearable
                      @blur="blur()"
                      @clear="clearData([])">
            </el-input>
            <el-button type="primary" @click="getacl">提交</el-button>
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
                tableData: []
            }
        },
        methods: {
            async getacl() {
                let post_data = {
                    mgtIP: "10.9.255.92",
                    GroupID: "3000"
                    // GroupID: "3111"
                };
                const {data: ret} = await getAcl({
                    url: '/acl/',
                    method: 'post',
                    data: post_data,
                });
                console.log(ret);
                this.tableData = ret
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
</style>
