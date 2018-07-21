<template>
    <section class="achievements">
        <el-row class="achievements-template" :gutter="0">
            <el-col class="achievements-content" :span="24">
                <div class="search-header">
                    <span>选择起始日期: </span>
                    <el-date-picker
                            v-model="searchForm.startDate"
                            type="date"
                            placeholder="选择开始日期">
                    </el-date-picker> —
                    <el-date-picker
                            v-model="searchForm.endDate"
                            type="date"
                            placeholder="选择结束日期">
                    </el-date-picker>
                    <el-button type="primary" @click="search">查询</el-button>
                </div>
                <div class="total-performance">
                    <span>当前总业绩: </span><span>{{ tableForm.totalPerformance }}</span>
                </div>
                <div class="table-template">
                    <el-table :data="tableForm.tableData" border>
                        <el-table-column prop="dealCode" label="成交编号"></el-table-column>
                        <el-table-column prop="contractCode" label="合同编号"></el-table-column>
                        <el-table-column prop="houseName" label="小区名称"></el-table-column>
                        <el-table-column prop="role" label="角色"></el-table-column>
                        <el-table-column prop="proportion" label="占比"></el-table-column>
                        <el-table-column prop="performance" label="业绩"></el-table-column>
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
        </el-row>
    </section>
</template>
<script>
export default {
    data() {
        return {
            searchForm: {
                startDate: '',
                endDate: '',
            },

            tableForm: {
                tableData: [
                    {
                        dealCode: 'C232112',
                        contractCode: 'H232112',
                        houseName: '万科翡翠花园',
                        role: '经理人',
                        proportion: '30%',
                        performance: '230,8900',
                    }
                ],
                totalPerformance: '99.9999.9999',  //总业绩
                pageSize: 10,
                total: 0,
                pageCurrent: 1,
            },
        };
    },
    created(){
        this.doSearch();
    },
    methods: {
        doSearch(){
            var postData = {
                startDate: this.searchForm.startDate,
                endDate: this.searchForm.endDate,
            };
            console.log(postData);
        },
        search(){
            this.tableForm.pageCurrent = 1;
            this.doSearch();
        },  //搜索

        handleCurrentChangeSearch(val){
            this.tableForm.pageCurrent = val;
            this.doSearch();
        },

    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.achievements {
	/*border:1px solid red;*/
    .achievements-template{
        width: 100%;
        padding: 25px 50px;
        .achievements-content{
            min-height: 200px;
            box-shadow: 0px 0px 10px #e3e3e3;
            .search-header{
                border-bottom: 1px solid #f2f2f2;
                padding: 20px;
                .el-button{
                    margin-left: 10px;
                }
            }
            .total-performance{
                margin: 20px 20px 0 0;
                text-align: right;
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
