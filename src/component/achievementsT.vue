<template>
    <section  class="achievementsT" >
        <div class="achievements-template">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-tabs type="border-card" >
                            <el-tab-pane label="总业绩统计">
                                <el-row class="achievements-template" :gutter="0">
                                    <el-col class="achievements-content" :span="24">
                                        <div class="search-header">
                                            <span>选择起始日期: </span>
                                            <el-date-picker
                                                    v-model="searchFormTotal.startDate"
                                                    type="date"
                                                    placeholder="选择开始日期">
                                            </el-date-picker> —
                                            <el-date-picker
                                                    v-model="searchFormTotal.endDate"
                                                    type="date"
                                                    placeholder="选择结束日期">
                                            </el-date-picker>
                                            <el-button type="primary" icon="el-icon-search" @click="searchTotal">查询</el-button>
                                        </div>
                                        <div class="table-template">
                                            <el-table :data="tableFormTotal.list" border>
                                                <el-table-column prop="storeName" label="门店名称"></el-table-column>
                                                <el-table-column prop="price" label="门店总业绩"></el-table-column>
                                            </el-table>
                                        </div>
                                        <div class="table-pagination">
                                            <el-pagination
                                                    layout="prev, pager, next, jumper, total"
                                                    :page-size="tableFormTotal.pageSize"
                                                    :current-page.sync="tableFormTotal.pageNum"
                                                    :total ="tableFormTotal.total"
                                                    @current-change="handleCurrentTotalChangeSearch">
                                            </el-pagination>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="门店业绩统计">
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
                                            <span style="margin-left: 20px"> 门店: </span>
                                            <el-select v-model="searchForm.storeId" placeholder="请选择门店">
                                                <el-option
                                                        v-for="item in searchForm.storesList"
                                                        :key="item.id"
                                                        :label="item.storeName"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
                                            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                                        </div>

                                        <div class="table-template">
                                            <el-table :data="tableForm.list" border>
                                                <el-table-column prop="storeName" label="门店名称"></el-table-column>
                                                <el-table-column prop="userrelname" label="人员名称"></el-table-column>
                                                <el-table-column prop="dealNum" label="成交编号"></el-table-column>
                                                <el-table-column prop="contractNum" label="合同编号"></el-table-column>
                                                <el-table-column prop="createTime" label="成交日期"></el-table-column>
                                                <el-table-column prop="xiaoquName" label="小区名称"></el-table-column>
                                                <el-table-column prop="roleName" label="角色"></el-table-column>
                                                <el-table-column prop="proportion" label="占比(%)"></el-table-column>
                                                <el-table-column prop="sumprice" label="业绩"></el-table-column>
                                            </el-table>
                                        </div>
                                        <div class="table-pagination">
                                            <el-pagination
                                                    layout="prev, pager, next, jumper, total"
                                                    :page-size="tableForm.pageSize"
                                                    :current-page.sync="tableForm.pageNum"
                                                    :total ="tableForm.total"
                                                    @current-change="handleCurrentChangeSearch">
                                            </el-pagination>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </div>

    </section>
</template>
<script>
    import AchTApi from '../api/api_achievementsT';
export default {
    data() {
        return {
            searchForm: {
                startDate: '',
                endDate: '',
                storeId:'',
                storesList: [
                    {
                        id: '',
                        storeName: '',
                    }
                ],
            },
            tableForm: {
                list: [

                ],
                pageSize: 10,
                total: 0,
                pageNum: 1,
            },
            searchFormTotal: {
                startDate: '',
                endDate: '',
            },
            tableFormTotal: {
                list: [

                ],
                pageSize: 10,
                total: 0,
                pageNum: 1,
            },
        };
    },
    created(){
        this.doStoreSearch();
        this.doSearchTotal();
    },
    methods: {
        doStoreSearch(){
            var that = this;
            var postData = {

            };
            AchTApi.storelist(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.searchForm.storesList=result.data;
                that.searchForm.storeId = that.searchForm.storesList[0].id;
                that.doSearch();
            }).catch(error => {
                console.log('storelist_error');
            });
        },
        doSearch(){
            var that = this;
            var postData = {
                createTimeStart: this.searchForm.startDate,
                createTimeEnd: this.searchForm.endDate,
                storeId:this.searchForm.storeId,
                page: this.tableForm.pageNum,
                size: this.tableForm.pageSize
            };
            AchTApi.listAchievementTow(postData).then(function (result) {
                console.log(result)
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.tableForm=result.data;
            }).catch(error => {
                console.log('searchAchievenments_error');
            });

        },
        search(){
            this.tableForm.pageNum = 1;
            this.doSearch();
        },  //搜索
        handleCurrentChangeSearch(val){
            this.tableForm.pageNum = val;
            this.doSearch();
        },
        doSearchTotal(){
            var that = this;
            var postData = {
                createTimeStart: this.searchFormTotal.startDate,
                createTimeEnd: this.searchFormTotal.endDate,
                page: this.tableFormTotal.pageNum,
                size: this.tableFormTotal.pageSize
            };
            AchTApi.listStoreAllAchievement(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.tableFormTotal=result.data;
            }).catch(error => {
                console.log('listStoreAllAchievement_error');
            });

        },
        searchTotal(){
            this.tableFormTotal.pageNum = 1;
            this.doSearchTotal();
        },  //搜索
        handleCurrentTotalChangeSearch(val){
            this.tableFormTotal.pageNum = val;
            this.doSearchTotal();
        },

    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.achievementsT {
	/*border:1px solid red;*/
    .achievements-template{
        width: 100%;
        padding: 25px 50px;
        background: #fff;
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
