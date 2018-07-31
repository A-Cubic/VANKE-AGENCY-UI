<template>
    <section class="clinch-deal">
        <el-row class="clinch-template" :gutter="0">
            <el-col class="clinch-content" :span="24">
                <div class="search-header">
                    <span>名称或编号: </span>
                    <el-input v-model="searchForm.searchCode" placeholder="请输入内容"></el-input>
                    <span>缴费类型: </span>
                    <el-select v-model="searchForm.payStatus" placeholder="请选择缴费类型">
                        <el-option
                                v-for="item in searchForm.payOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <span>成交状态: </span>
                    <el-select v-model="searchForm.dealStatus" placeholder="请选择成交状态">
                        <el-option
                                v-for="item in searchForm.dealOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="search">查询</el-button>
                </div>
                <div class="table-template">
                    <el-table :data="tableForm.tableData" border>
                        <el-table-column prop="code" label="编号"></el-table-column>
                        <el-table-column prop="title" label="标题"></el-table-column>
                        <el-table-column prop="payStatus" label="缴费类型"></el-table-column>
                        <el-table-column prop="dealStatus" label="成交状态"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini" type="text" @click="compileIt(scope.row)">编辑</el-button>
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

            <el-dialog title="成交信息" :visible.sync="dialogForm.statusForm1.statusVisible1" width="60%">
                <el-form :model="dialogForm.statusForm1"
                         status-icon ref="statusForm1"
                         label-width="120px"
                         label-position="left"
                         class="demo-ruleForm">
                    <el-form-item label="成交编号:">{{dialogForm.statusForm1.dealCode}}</el-form-item>
                    <el-form-item label="合同编号:">
                        <el-input v-model="dialogForm.statusForm1.contractCode" placeholder="请输入内容"></el-input>
                    </el-form-item>

                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="买家服务费:">
                                <el-input v-model="dialogForm.statusForm1.buyerCost" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="买家服务费实缴:">
                                <el-input v-model="dialogForm.statusForm1.buyerRealCost" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="">差:0元</el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="买家贷款:">
                                <el-input v-model="dialogForm.statusForm1.buyerLoans" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="买家贷款实缴:">
                                <el-input v-model="dialogForm.statusForm1.buyerRealLoans" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="">差:0元</el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="卖家服务费:">
                                <el-input v-model="dialogForm.statusForm1.sellerCost" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="卖家服务费实缴:">
                                <el-input v-model="dialogForm.statusForm1.sellerRealCost" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="">差:0元</el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="房源:">{{dialogForm.statusForm1.phone}}</el-form-item>
                    <el-form-item label="客源:">{{dialogForm.statusForm1.phone}}</el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="信息上传" :visible.sync="dialogForm.statusForm2.statusVisible2" width="60%">
                <el-form :model="dialogForm.statusForm2"
                         status-icon ref="statusForm2"
                         label-width="120px"
                         label-position="left"
                         class="demo-ruleForm">
                    <el-form-item label="合同照片:">
                        <div>a</div>
                    </el-form-item>
                    <el-form-item label="补充协议:">
                        <div></div>
                    </el-form-item>
                    <el-form-item label="收拾:">
                        <div></div>
                    </el-form-item>
                    <el-form-item label="产权证:">
                        <div></div>
                    </el-form-item>
                    <el-form-item label="身份证:">
                        <div></div>
                    </el-form-item>
                    <el-form-item label="贷款合同:">
                        <div></div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="业绩分配" :visible.sync="dialogForm.statusForm3.statusVisible3" width="60%">
                <el-form :model="dialogForm.statusForm3"
                         status-icon ref="statusForm3"
                         label-width="120px"
                         label-position="left"
                         class="demo-ruleForm">
                    <el-form-item label="录入人:">
                        <div>{{dialogForm.statusForm3.enteringName}}</div>
                    </el-form-item>
                    <el-form-item label="维护人:">
                        <div>{{dialogForm.statusForm3.maintainName}}</div>
                    </el-form-item>
                    <el-form-item label="实勘人:">
                        <div>{{dialogForm.statusForm3.examineName}}</div>
                    </el-form-item>
                    <el-form-item label="钥匙人:">
                        <div>{{dialogForm.statusForm3.keyName}}</div>
                    </el-form-item>
                    <el-form-item label="促成人:">
                        <div>{{dialogForm.statusForm3.facilitateName}}</div>
                    </el-form-item>
                    <el-form-item label="业绩分配:">
                        <el-button type="primary" icon="el-icon-plus" @click="addPerformance"></el-button>
                    </el-form-item>

                    <el-form-item label="">
                        <div v-for="(item, index) in dialogForm.addPerformanceForm.showPerformanceList">
                            {{ item.name }}
                        </div>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="添加业绩" :visible.sync="dialogForm.addPerformanceForm.addPerformanceVisible" width="50%">
                <div class="performance-header">
                    <span>名称或编号: </span>
                    <el-input v-model="dialogForm.addPerformanceForm.searchMes" placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="searchPerformance">查询</el-button>
                </div>
                <div class="performance-table">

                    <el-table :data="dialogForm.addPerformanceForm.performanceList" border>
                        <el-table-column prop="code" label="编号"></el-table-column>
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-checkbox v-model="scope.row.checked"
                                             :disabled="scope.row.disabled"
                                             @change="checkIt(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="putPerformance">确 定</el-button>
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
                searchCode: '',
                payStatus: '',
                payOption: [
                    {
                        value: 0,
                        label: '续缴'
                    },
                    {
                        value: 1,
                        label: '已缴清'
                    }
                ],
                dealStatus: '',
                dealOption: [
                    {
                        value: 0,
                        label: '成交未完成'
                    },
                    {
                        value: 1,
                        label: '成交完成'
                    },
                ]
            },

            tableForm: {
                tableData: [
                    {
                        code: 0,
                        title: '成交记录1',
                        payStatus: 1,
                        dealStatus: 1,
                        status: 2, //编辑状态
                    }
                ],
                pageSize: 10,
                total: 0,
                pageCurrent: 1,
            },

            dialogForm:{
                statusForm1:{
                    statusVisible1: false,
                    dealCode: 'C232112',  //成交编号
                    contractCode: 'H232112',  //合同编号
                    buyerCost: '',  //买家服务费
                    buyerRealCost: '',  //买家服务费实缴
                    buyerLoans: '',  //买家贷款
                    buyerRealLoans: '',  //买家贷款实缴
                    sellerCost: '',  //卖家服务费
                    sellerRealCost: '',  //卖家服务费实缴
                    houseResource: [],
                    guestResource: [],
                },

                statusForm2:{
                    statusVisible2: false,
                },

                statusForm3:{
                    statusVisible3: false,
                    enteringName: '王小虎',  //录入人
                    maintainName: '王小虎',  //维护人
                    examineName: '王小虎',  //实勘人
                    keyName: '王小虎',  //钥匙人
                    facilitateName: '王小虎',  //促成人
                },

                addPerformanceForm: {
                    addPerformanceVisible: false,
                    searchMes: '',
                    performanceList: [],  //查询条件  列表
                    performanceCheckList: [],   //check选择 列表
                    showPerformanceList: []  //确定后  展示列表
                }
            }
        };
    },
    methods: {
        doSearch(){
            var postData = {
                searchCode: this.searchForm.searchCode,
                payStatus: this.searchForm.payStatus,
                dealStatus: this.searchForm.dealStatus,
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
        },  //分页change

        compileIt(item){
            var that = this;
            var postData = {
                code: item.code
            };
            console.log(postData);
            switch(item.status) {
                case 0:
                    that.dialogForm.statusForm1.statusVisible1 = true;
                    break;
                case 1:
                    that.dialogForm.statusForm2.statusVisible2 = true;
                    break;
                case 2:
                    that.dialogForm.statusForm3.statusVisible3 = true;
                    break;
                default:;
            }
        },  //编辑
        addPerformance(){
            this.dialogForm.addPerformanceForm.addPerformanceVisible = true;
            this.dialogForm.addPerformanceForm.performanceList = [];
            this.dialogForm.addPerformanceForm.performanceCheckList = [];
        },  //添加业绩

        searchPerformance(){
            this.dialogForm.addPerformanceForm.performanceList.push({
                code: '123',
                name: '王小虎',
                checked: false,
                disabled: false,
            });
            this.dialogForm.addPerformanceForm.showPerformanceList.forEach((item) => {
                this.dialogForm.addPerformanceForm.performanceList.forEach((item2) => {
                    if(item.code == item2.code){
                        item2.checked = true;
                        item2.disabled = true;
                    }
                });
            });
        },  //搜索业绩

        checkIt(item){
            console.log(item)
            if(item.checked == false){
                return;
            }
            else{
                var performanceCheckList = this.dialogForm.addPerformanceForm.performanceCheckList;
                performanceCheckList.forEach((item2) => {
                    if(item.code == item2.code) {
                        performanceCheckList.splice(performanceCheckList.indexOf(item2), 1)
                        return;
                    }
                });
                performanceCheckList.push(item);
                this.dialogForm.addPerformanceForm.performanceCheckList = performanceCheckList;
            }
        },  //选择业绩人

        putPerformance(){
            this.dialogForm.addPerformanceForm.performanceCheckList.forEach((item) => {
                this.dialogForm.addPerformanceForm.showPerformanceList.push(item)
            });
            this.dialogForm.addPerformanceForm.addPerformanceVisible = false;
        },  //确定选择业绩人
    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.clinch-deal {
	/*border:1px solid red;*/
    .clinch-template{
        width: 100%;
        padding: 25px 50px;
        background: #fff;
        .clinch-content{
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
                .el-input, .el-select{
                    width: 180px;
                }
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
        .el-dialog{
            .performance-header{
                .el-input{
                    width: 190px;
                }
            }
            .performance-table{
                margin-top: 20px;
            }

        }
    }
}
</style>
