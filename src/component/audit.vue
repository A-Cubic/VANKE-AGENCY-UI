<template>
    <section class="audit">
        <el-row class="audit-template" :gutter="0">
            <el-col class="audit-content" :span="24">
                <div class="search-header">
                    <span>类型: </span>
                    <el-select v-model="searchForm.type" placeholder="请选择类型">
                        <el-option
                                v-for="item in searchForm.typeOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <span>状态: </span>
                    <el-select v-model="searchForm.status" placeholder="请选择状态">
                        <el-option
                                v-for="item in searchForm.statusOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <span>结果: </span>
                    <el-select v-model="searchForm.result" placeholder="请选择结果">
                        <el-option
                                v-for="item in searchForm.resultOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="search">查询</el-button>
                </div>
                <div class="table-template">
                    <el-table :data="tableForm.tableData" border>
                        <el-table-column prop="name" label="发起人"></el-table-column>
                        <el-table-column prop="date" label="发起日期"></el-table-column>
                        <el-table-column prop="type" label="类型"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                        <el-table-column label="结果">
                            <template scope="scope">
                                <el-popover placement="bottom" width="300" trigger="click">
                                    <div>
                                        <div>原因: </div>
                                        <div style="padding: 20px">
                                            多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false
                                        </div>
                                    </div>
                                    <el-button slot="reference" size="mini" type="text">{{ scope.row.result }}</el-button>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini" type="text" @click="putPass(scope.row)">通过</el-button>
                                <el-button size="mini" type="text" @click="unPassHandel(scope.row)">不通过
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table-pagination">
                    <el-pagination
                            layout="prev, pager, next, jumper, total"
                            :page-size="tableForm.pageSize"
                            :current-page.sync="tableForm.pageCurrent"
                            :total ="tableForm.total"
                            @current-change="handleCurrentChangeSearch">
                    </el-pagination>
                </div>
            </el-col>

            <el-dialog title="原因: " :visible.sync="unPassForm.unPassVisible" width="40%">
                <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入原因"
                        v-model="unPassForm.unPassResult">
                </el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="putUnPass">确 定</el-button>
                </span>
            </el-dialog>
        </el-row>
    </section>
</template>
<script>
export default {
    data() {
        return {
            searchForm: {
                type: '',
                typeOption: [
                    {
                        value: 0,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '特殊房源'
                    },
                    {
                        value: 2,
                        label: '无效房源'
                    },
                    {
                        value: 3,
                        label: '无效客源'
                    },
                ],
                status: '',
                statusOption: [
                    {
                        value: 0,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '未审核'
                    },
                    {
                        value: 2,
                        label: '已审核'
                    }
                ],
                result: '',
                resultOption: [
                    {
                        value: 0,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '已通过'
                    },
                    {
                        value: 2,
                        label: '未通过'
                    }
                ],
            },

            tableForm: {
                tableData: [
                    {
                        id: 0,
                        date: '2016-05-02',
                        name: '王小虎',
                        type: 1,
                        status: 1,
                        result: 2
                    },
                    {
                        id: 1,
                        date: '2016-05-02',
                        name: '王大虎',
                        type: 1,
                        status: 1,
                        result: 2
                    },
                    {
                        id: 2,
                        date: '2016-05-02',
                        name: '王小龙',
                        type: 1,
                        status: 1,
                        result: 2
                    }
                ],
                pageSize: 10,
                total: 0,
                pageCurrent: 1,

            },

            unPassForm:{
                submitId: '',
                unPassVisible: false,
                unPassResult: '',
            }
        };
    },
    created(){
        this.doSearch();
    },
    methods: {
        doSearch(){
            var postData = {
                type: this.searchForm.type,
                status: this.searchForm.status,
                result: this.searchForm.result,
            };
            console.log(postData)
        },
        search(){
            this.tableForm.pageCurrent = 1;
            this.doSearch();
        },  //搜索

        handleCurrentChangeSearch(val){
            this.tableForm.pageCurrent = val;
            this.doSearch();
        },

        unPassHandel(item){
            this.unPassForm.submitId = item.id;
            this.unPassForm.unPassResult = '';
            this.unPassForm.unPassVisible = true;
        },  //不通过原因
        putUnPass(){
            if(this.unPassForm.unPassResult == ''){
                this.$message({type: 'error', message: '请填写完毕后再提交!'});
                return;
            }
            var postData = {
                id: this.unPassForm.submitId,
                res: this.unPassForm.unPassResult
            };
            console.log(postData);
            this.unPassForm.unPassVisible = false;

        },  //提交未通过原因
        putPass(item){
            var postData = {
                id: item.id,
            };
            console.log(postData);
            this.$message({type: 'success', message: '通过成功!'});
        },

    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.audit {
	/*border:1px solid red;*/
    .audit-template{
        width: 100%;
        padding: 25px 50px;
        .audit-content{
            min-height: 200px;
            box-shadow: 0px 0px 10px #e3e3e3;
            .search-header{
                border-bottom: 1px solid #f2f2f2;
                padding: 20px;
                span{
                    margin-left: 10px;
                    &:first-child {
                        margin-left: 0;
                    }
                }
                .el-button{
                    margin-left: 10px;
                }
            }
            .table-template{
                margin: 20px;
                /*box-shadow: 0px 0px 10px #e3e3e3;*/
                min-height: 100px;
            }
            .table-pagination{
                padding: 0 20px 20px;
                text-align: right;
            }
        }
    }
}
</style>
