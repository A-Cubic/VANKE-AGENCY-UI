<template>
    <section class="clinch-deal">
        <el-row class="clinch-template" :gutter="0">
            <el-col class="clinch-content" :span="24">
                <div class="search-header">
                    <span>合同编号: </span>
                    <el-input v-model="searchForm.contractnumber" placeholder="请输入合同编号"></el-input>
                    <span>缴费类型: </span>
                    <el-select v-model="searchForm.type" placeholder="请选择缴费状态">
                        <el-option
                                v-for="item in searchForm.payOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <span>成交状态: </span>
                    <el-select v-model="searchForm.state" placeholder="请选择成交状态">
                        <el-option
                                v-for="item in searchForm.dealOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary" @click="addForm.addFormVisible=true">新增成交项</el-button>
                </div>
                <div class="table-template">
                    <el-table :data="tableForm.list" border>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item prop="buyIntermediaryPrice" label="买方服务费（应缴）">
                                        <span>{{ props.row.buyIntermediaryPrice }}</span>
                                    </el-form-item>
                                    <el-form-item prop="sellIntermediaryPrice" label="卖方服务费（应缴）">
                                        <span>{{ props.row.sellIntermediaryPrice }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyLoanPrice" label="买方贷款费（应缴）">
                                        <span>{{ props.row.buyLoanPrice }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyIntermediaryPayment" label="买方服务费（实缴）">
                                        <span>{{ props.row.buyIntermediaryPayment }}</span>
                                    </el-form-item>
                                    <el-form-item prop="sellIntermediaryPayment" label="卖方服务费（实缴）">
                                        <span>{{ props.row.sellIntermediaryPayment }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyLoanPayment" label="买方贷款费（实缴）">
                                        <span>{{ props.row.buyLoanPayment }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyIntermediaryLack" label="买方服务费（欠缴）">
                                        <span>{{ props.row.buyIntermediaryLack }}</span>
                                    </el-form-item>
                                    <el-form-item prop="sellIntermediaryLack" label="卖方服务费（欠缴）">
                                        <span>{{ props.row.sellIntermediaryLack }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyLoanLack" label="买方贷款费（欠缴）">
                                        <span>{{ props.row.buyLoanLack }}</span>
                                    </el-form-item>
                                    <el-form-item prop="code" label="证明（点击跳转详情）">
                                        <span> <el-button size="mini" type="text" @click="compileIt(props.row)">查看证明照片</el-button></span>
                                    </el-form-item>
                                    <el-form-item prop="code" label="房源（点击跳转详情）">
                                        <span> <el-button size="mini" type="text" @click="compileIt(props.row)">查看房源</el-button></span>
                                    </el-form-item>
                                    <el-form-item prop="code" label="客源（点击跳转详情）">
                                        <span> <el-button size="mini" type="text" @click="compileIt(props.row)">查看客源</el-button></span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" label="成交编号"></el-table-column>
                        <el-table-column prop="contractnumber" label="合同编号"></el-table-column>
                        <el-table-column prop="createTime" label="创建日期"></el-table-column>
                        <el-table-column prop="createrelName" label="创建人"></el-table-column>
                        <el-table-column prop="type" label="缴费状态"></el-table-column>
                        <el-table-column prop="state" label="成交状态"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini" type="text" @click="compileIt(scope.row)">业绩分配</el-button>
                            </template>
                        </el-table-column>
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

            <el-dialog title="新增成交" :visible.sync="addForm.addFormVisible" width="60%">
                <el-collapse v-model="activeName" accordion>
                    <el-form :model="addForm.addFormData"
                             status-icon ref="addFormData"
                             label-width="120px"
                             label-position="left"
                             class="demo-ruleForm">
                    <el-collapse-item title="基本信息" name="1" style="font-size: 22px">
                            <el-form-item label="合同编号:" style="margin-top: 10px">
                                <el-input v-model="addForm.addFormData.contractnumber" placeholder="请输入内容"></el-input>
                            </el-form-item>

                            <el-row :gutter="10">
                                <el-col :span="8">
                                    <el-form-item label="买家服务费:">
                                        <el-input v-model="addForm.addFormData.buyIntermediaryPrice" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="买家服务费实缴:">
                                        <el-input v-model="addForm.addFormData.buyIntermediaryPayment" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="">差:{{addForm.addFormData.buyIntermediaryLack}}￥</el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="10">
                                <el-col :span="8">
                                    <el-form-item label="买家贷款费:">
                                        <el-input v-model="addForm.addFormData.buyLoanPrice" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="买家贷款费实缴:">
                                        <el-input v-model="addForm.addFormData.buyLoanPayment" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="">差:{{addForm.addFormData.buyLoanLack}}￥</el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="10">
                                <el-col :span="8">
                                    <el-form-item label="卖家服务费:">
                                        <el-input v-model="addForm.addFormData.sellIntermediaryPrice" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="卖家服务费实缴:">
                                        <el-input v-model="addForm.addFormData.sellIntermediaryPayment" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="">差:{{addForm.addFormData.sellIntermediaryLack}}￥</el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="房源:">{{addForm.addFormData.houseId}}</el-form-item>
                            <el-form-item label="客源:">{{addForm.addFormData.guestId}}</el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="证明上传" name="2">
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
                    </el-collapse-item>
                    </el-form>
                </el-collapse>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addForm.addFormVisible = false;resetForm('ruleForm')">取消</el-button>
                    <el-button type="primary" @click="submitAdd('ruleForm')">保存</el-button>
                </span>
            </el-dialog>


            <el-dialog title="业绩分配" :visible.sync="allotForm.allotFormVisible" width="60%">
                <el-form :model="allotForm.allotFormData"
                         status-icon ref="allotFormData"
                         label-width="120px"
                         label-position="left"
                         class="demo-ruleForm">
                    <el-form-item label="录入人:">
                        <div>{{allotForm.allotFormData}}</div>
                    </el-form-item>
                    <el-form-item label="维护人:">
                        <div>{{allotForm.allotFormData}}</div>
                    </el-form-item>
                    <el-form-item label="实勘人:">
                        <div>{{allotForm.allotFormData}}</div>
                    </el-form-item>
                    <el-form-item label="钥匙人:">
                        <div>{{allotForm.allotFormData}}</div>
                    </el-form-item>
                    <el-form-item label="促成人:">
                        <div>{{allotForm.allotFormData}}</div>
                    </el-form-item>
                    <el-form-item label="业绩分配:">
                        <el-button type="primary" icon="el-icon-plus" @click="addPerformance"></el-button>
                    </el-form-item>

                    <el-form-item label="">
                        <div v-for="(item, index) in allotForm.addUserForm.showPerformanceList">
                            {{ item.name }}
                        </div>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitAllot">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="添加业绩" :visible.sync="allotForm.addUserForm.addUserFormVisible" width="50%">
                <div class="performance-header">
                    <span>名称或编号: </span>
                    <el-input v-model="allotForm.addUserForm.searchMes" placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="searchPerformance">查询</el-button>
                </div>
                <div class="performance-table">

                    <el-table :data="allotForm.addUserForm.performanceList" border>
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
            activeName: '1',
            searchForm: {
                contractnumber: '',
                type: '',
                payOption: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '0',
                        label: '欠缴'
                    },
                    {
                        value: '1',
                        label: '已缴清'
                    }
                ],
                state: '',
                dealOption: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '创建完成'
                    },
                    {
                        value: '2',
                        label: '等待审核'
                    },
                    {
                        value: '3',
                        label: '成交完成'
                    }
                ]
            },

            tableForm: {
                list: [
                    {
                        id:'',
                        createTime: '',//创建时间
                        buyIntermediaryPrice: '',//买方服务费
                        sellIntermediaryPrice: '',//卖方服务费
                        buyLoanPrice: '',//买方贷款费
                        buyIntermediaryPayment: '',//买方实缴服务费
                        sellIntermediaryPayment: '',//卖方实缴服务费
                        buyLoanPayment: '',//买房实缴贷款
                        buyIntermediaryLack: '', //买房服务费差价
                        sellIntermediaryLack: '', //卖方服务费差价
                        buyLoanLack: '', //买方贷款差价
                        createrelName: '',//创建人真实姓名
                        number: '',//成交编号
                        contractnumber: '',//合同编号
                        state: '', //成交状态
                        type: '', //应缴费是否结清
                        contractImg: '',  //合同图片
                        houseProveImg: '', //产权证图片
                        loanContractImg: '', //贷款合同图片
                        identityProveImg: '', //身份证图片
                        receiptImg: '', //收据图片
                        agreementImg: '', //补充协议图片
                        houseId: '',
                        guestId: '',
                    }
                ],
                pageSize: 10,
                total: 0,
                pageNum: 1,
            },

            addForm:{
                addFormVisible: false,
                addFormData: {
                    buyIntermediaryPrice: '',//买方服务费
                    sellIntermediaryPrice: '',//卖方服务费
                    buyLoanPrice: '',//买方贷款费
                    buyIntermediaryPayment: '',//买方实缴服务费
                    sellIntermediaryPayment: '',//卖方实缴服务费
                    buyLoanPayment: '',//买方实缴贷款
                    buyIntermediaryLack: '', //买房服务费差价
                    sellIntermediaryLack: '', //卖方服务费差价
                    buyLoanLack: '', //买方贷款费差价
                    contractnumber: '',//合同编号
                    contractImg: '',  //合同图片
                    houseProveImg: '', //产权证图片
                    loanContractImg: '', //贷款合同图片
                    identityProveImg: '', //身份证图片
                    receiptImg: '', //收据图片
                    agreementImg: '', //补充协议图片
                    houseId: '',
                    guestId: '',
                },

                addHouseForm: {
                    addHouseVisible: false,
                    searchMes: '',
                    performanceList: [],  //查询条件  列表
                    performanceCheckList: [],   //check选择 列表
                    showPerformanceList: []  //确定后  展示列表
                },

                addGuestForm: {
                    addGuestVisible: false,
                    searchMes: '',
                    performanceList: [],  //查询条件  列表
                    performanceCheckList: [],   //check选择 列表
                    showPerformanceList: []  //确定后  展示列表
                }
            },

            allotForm: {
                allotFormVisible: false,
                allotFormData:{

                },
                addUserForm: {
                    addUserFormVisible: false,
                    searchMes: '',
                    performanceList: [],  //查询条件  列表
                    performanceCheckList: [],   //check选择 列表
                    showPerformanceList: []  //确定后  展示列表
                }
            },
        };
    },
    methods: {
        // 成交信息保存
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitAdd(ruleForm){
            var that = this;
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.$confirm('确定新增该客源?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        GuestApi.insertGuest(this.alertAdd.ruleForm).then(function (result) {
                            console.log(result);
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            Message({
                                message: "新增客源成功",
                                type: 'success'
                            });
                            that.alertAdd.visible=false;
                            that.resetForm(ruleForm);
                            that.doSearch();
                        }).catch(error => {
                            console.log('insertGuest_error'+error);
                        });
                    }).catch(() => {

                    });
                } else {
                    return false;
                }
            });
        },

        // 业绩分配确定
        submitAllot(){
            this.dialogForm.statusForm3.statusVisible3=false
        },
        doSearch(){
            var postData = {
                contractnumber: this.searchForm.contractnumber,
                type: this.searchForm.type,
                state: this.searchForm.state,
            };
            console.log(postData);
        },
        search(){
            this.tableForm.pageCurrent = 1;
            this.doSearch();
        },  //搜索

        handleCurrentChangeSearch(val){
            this.tableForm.pageNum = val;
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
    .el-collapse-item__header {
        height: 48px;
        line-height: 48px;
        color: #303133;
        cursor: pointer;
        border-bottom: 1px solid #dcdfe6;
        font-size: 18px;
        font-weight: 500;
        -webkit-transition: border-bottom-color .3s;
        transition: border-bottom-color .3s;
        outline: 0;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 160px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }
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
