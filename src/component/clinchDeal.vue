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
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addForm.addFormVisible=true">创建</el-button>
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

            <el-dialog title="新增成交表单" :visible.sync="addForm.addFormVisible" width="80%">
                <el-tabs tab-position="left"
                         style="height: 600px;"
                         v-model="editableTabsValue"
                         :stretch="true"
                         :before-leave="tabLeaveHandle">
                        <el-tab-pane  label="添加房源">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-edit-outline"></i> 添加房源</span>
                            <el-scrollbar style="height: 600px;">
                                <div class="look-detail-wrap">
                                    <div class="look-detail-wrap-header">
                                        <el-input placeholder="请输入小区名称" v-model="addForm.addHouseForm.searchHouseForm.xiaoquName" clearable></el-input>
                                        <el-input placeholder="请输入房源编号" v-model="addForm.addHouseForm.searchHouseForm.number" clearable></el-input>
                                        <el-button  type="primary" icon="el-icon-search" @click="searchHouseList">查询</el-button>
                                    </div>
                                    <div class="look-detail-wrap-table">
                                        <el-table :data="addForm.addHouseForm.houseTableData.list" style="width: 100%">
                                            <el-table-column label="标题图">
                                                <template scope="scope">
                                                    <img style="height: 100px;width: 150px;" :src="scope.row.titleimg" alt="">
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="number" label="编号"></el-table-column>
                                            <el-table-column prop="xiaoquName" label="小区"></el-table-column>
                                            <el-table-column prop="areas" label="面积"></el-table-column>
                                            <el-table-column prop="floor" label="楼层"></el-table-column>
                                            <el-table-column prop="price" label="价格"></el-table-column>
                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button size="mini" type="danger" @click="selectedHouse(scope.row)" icon="el-icon-plus" circle></el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="table-pagination" style=" margin-top: 20px;text-align: right;">
                                            <el-pagination
                                                    layout="prev, pager, next, jumper, total"
                                                    :page-size="addForm.addHouseForm.houseTableData.pageSize"
                                                    :current-page.sync="addForm.addHouseForm.houseTableData.pageNum"
                                                    :total ="addForm.addHouseForm.houseTableData.total"
                                                    @current-change="handleHouseTableDataChangeSearch">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane  label="添加客源">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-edit-outline"></i> 添加客源</span>
                            <el-scrollbar style="height: 600px;">
                                <div class="passenger_table">
                                    <div class="passenger-wrap-header">
                                        <el-input placeholder="请输入客源姓名或编号" v-model="addForm.addGuestForm.searchGuestForm.searchGuestText" clearable></el-input>
                                        <el-button class="m-btn-addMenu" type="primary" icon="el-icon-search" @click="searchGuestList">查询</el-button>
                                    </div>
                                    <div class="passenger-wrap-table">
                                        <el-table :data="addForm.addGuestForm.guestTableData.list" style="width: 100%">
                                            <el-table-column fixed label="姓名" width="180">
                                                <template scope="scope">
                                                    <div>
                                                        {{scope.row.guestname}}
                                                    </div>
                                                    <div>
                                                        <i v-for="it in (scope.row.guestgrade=='A'?3:scope.row.guestgrade=='B'?2:1)" class="el-icon-star-on"></i>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="remarks" label="备注"></el-table-column>
                                            <el-table-column prop="createTime" label="委托时间"></el-table-column>
                                            <el-table-column prop="recordTime" label="上次维护时间"></el-table-column>
                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button size="mini" type="danger" @click="selectedGuest(scope.row)" icon="el-icon-plus" circle></el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="table-pagination" style=" margin-top: 20px;text-align: right;">
                                            <el-pagination
                                                    layout="prev, pager, next, jumper, total"
                                                    :page-size="addForm.addGuestForm.guestTableData.pageSize"
                                                    :current-page.sync="addForm.addGuestForm.guestTableData.pageNum"
                                                    :total ="addForm.addGuestForm.guestTableData.total"
                                                    @current-change="handleGuestTableDataChangeSearch">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane  label="基本信息">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-edit-outline"></i> 基本信息</span>
                            <el-form :model="addForm.addFormData"
                                     status-icon ref="addFormData"
                                     label-width="120px"
                                     label-position="left"
                                     class="demo-ruleForm"
                                     style="margin-top: 10px">

                                <el-form-item label="房源:">{{addForm.addFormData.houseId}}</el-form-item>
                                <el-form-item label="客源:">{{addForm.addFormData.guestId}}</el-form-item>
                                <el-row :gutter="10">
                                    <el-col :span="16">
                                        <el-form-item label="合同编号:" >
                                            <el-input v-model="addForm.addFormData.contractnumber" placeholder="签订合同编号"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>

                                <el-row :gutter="10">
                                    <el-col :span="8">
                                        <el-form-item label="买家服务费:">
                                            <el-input v-model="addForm.addFormData.buyIntermediaryPrice" placeholder="买家服务费金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="买家服务费实缴:">
                                            <el-input v-model="addForm.addFormData.buyIntermediaryPayment" placeholder="实际缴纳金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="">差:{{addForm.addFormData.buyIntermediaryLack}}￥</el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="10">
                                    <el-col :span="8">
                                        <el-form-item label="买家贷款费:">
                                            <el-input v-model="addForm.addFormData.buyLoanPrice" placeholder="买家贷款费金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="买家贷款费实缴:">
                                            <el-input v-model="addForm.addFormData.buyLoanPayment" placeholder="实际缴纳金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="">差:{{addForm.addFormData.buyLoanLack}}￥</el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="10">
                                    <el-col :span="8">
                                        <el-form-item label="卖家服务费:">
                                            <el-input v-model="addForm.addFormData.sellIntermediaryPrice" placeholder="卖家服务费金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="卖家服务费实缴:">
                                            <el-input v-model="addForm.addFormData.sellIntermediaryPayment" placeholder="实际缴纳金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="">差:{{addForm.addFormData.sellIntermediaryLack}}￥</el-form-item>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="合同信息">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-printer"></i> 合同信息</span>
                            <el-scrollbar style="height: 600px;">
                                <el-form :model="addForm.addFormData"
                                         status-icon ref="addFormData"
                                         label-width="120px"
                                         label-position="left"
                                         class="demo-ruleForm"
                                         style="margin-top: 10px">
                                    <el-form-item label="合同照片">
                                        <div>
                                            <el-upload
                                                    action=""
                                                    list-type="picture-card"
                                                    :limit="addForm.uploadImgData.contractImgLimit"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeImg1"
                                                    :on-remove="handleRemove1"
                                                    :on-exceed="handleExceed"
                                                    :http-request="uploadImg">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                                <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="补充协议照片">
                                        <div>
                                            <el-upload
                                                    action=""
                                                    list-type="picture-card"
                                                    :limit="addForm.uploadImgData.agreementImgLimit"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeImg3"
                                                    :on-remove="handleRemove3"
                                                    :on-exceed="handleExceed"
                                                    :http-request="uploadImg">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                                <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="收据图片">
                                        <div>
                                            <el-upload
                                                    action=""
                                                    list-type="picture-card"
                                                    :limit="addForm.uploadImgData.receiptImgLimit"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeImg4"
                                                    :on-remove="handleRemove4"
                                                    :on-exceed="handleExceed"
                                                    :http-request="uploadImg">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                                <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="贷款合同图片">
                                        <div>
                                            <el-upload
                                                    action=""
                                                    list-type="picture-card"
                                                    :limit="addForm.uploadImgData.loanContractImgLimit"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeImg6"
                                                    :on-remove="handleRemove6"
                                                    :on-exceed="handleExceed"
                                                    :http-request="uploadImg">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                                <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </el-scrollbar>

                        </el-tab-pane>
                        <el-tab-pane label="个人信息">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-mobile-phone"></i> 个人信息</span>
                            <el-form :model="addForm.addFormData"
                                     status-icon ref="addFormData"
                                     label-width="120px"
                                     label-position="left"
                                     class="demo-ruleForm"
                                     style="margin-top: 10px">
                                <el-form-item label="身份证图片">
                                    <div>
                                        <el-upload
                                                action=""
                                                list-type="picture-card"
                                                :limit="addForm.uploadImgData.identityProveImgLimit"
                                                :auto-upload="false"
                                                :on-change="handleChangeImg5"
                                                :on-remove="handleRemove5"
                                                :on-exceed="handleExceed"
                                                :http-request="uploadImg">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                            <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </el-form-item>

                                <el-form-item label="产权证照片">
                                    <div>
                                        <el-upload
                                                action=""
                                                list-type="picture-card"
                                                :limit="addForm.uploadImgData.houseProveImgLimit"
                                                :auto-upload="false"
                                                :on-change="handleChangeImg2"
                                                :on-remove="handleRemove2"
                                                :on-exceed="handleExceed"
                                                :http-request="uploadImg">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                            <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                </el-tabs>
                <span slot="footer" class="dialog-footer">
                    <el-button v-show="addForm.backVisible" @click="backHandle">{{editableTabsValue==0?'取消':'上一步'}}</el-button>
                    <el-button v-show="addForm.nextVisible" type="primary" @click="nextHandle">{{editableTabsValue==4?'保存':'下一步'}}</el-button>
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
    import ClinchDealApi from '../api/api_clinchDeal.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
export default {
    install(Vue) {
        Vue.prototype.$message = Message
    },
    data() {
        return {
            activeName: '1',
            editableTabsValue:0,
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
                nextVisible: false,
                backVisible: true,

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
                    houseId: '',//房源id
                    guestId: '',//客源id
                },

                uploadImgData:{
                    dialogImageUrl: '',
                    dialogVisible: false,
                    contractImgLimit: 1,  //合同图片Limit
                    houseProveImgLimit: 1, //产权证图片Limit
                    loanContractImgLimit: 1, //贷款合同图片Limit
                    identityProveImgLimit: 1, //身份证图片Limit
                    receiptImgLimit: 1, //收据图片Limit
                    agreementImgLimit: 1, //补充协议图片Limit
                    contractImgList: [],  //合同图片List
                    houseProveImgList: [], //产权证图片List
                    loanContractImgList: [], //贷款合同图片List
                    identityProveImgList: [], //身份证图片List
                    receiptImgList: [], //收据图片List
                    agreementImgList: [], //补充协议图片List
                },

                addHouseForm: {
                    houseTableData:{
                        pageSize: 3,
                        pageNum: 1,
                        total: 0,
                        list: [
//                            {
//                                id: '',
//                                number:'',
//                                titleimg: '',
//                                xiaoquName: '',
//                                huxing: '',
//                                areas: '',
//                                price: '',
//                                floor: '',
//                                checked: false,
//                                disabled: false,
//                            }
                        ]
                    },
                    searchHouseForm:{
                        xiaoquName: '',
                        number: '',
                    },
                },

                addGuestForm: {
                    guestTableData:{
                        pageSize: 3,
                        pageNum: 1,
                        total: 0,
                        list: []
                    },
                    searchGuestForm:{
                        searchGuestText: ''
                    },
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
    created(){
        this.doSearch();
    },
    methods: {
        //确定房源选择
        selectedHouse(item){
            console.log(item);
            this.nextHandle();
        },
        selectedGuest(item){
            console.log(item);
            this.nextHandle();
        },

        searchHouseList(){
            var xiaoquName=this.addForm.addHouseForm.searchHouseForm.xiaoquName;
            var number=this.addForm.addHouseForm.searchHouseForm.number;
            if(xiaoquName.trim()=='' && number.trim()==''){
                Message.error("查询条件不允许都为空");
                return;
            }
            var that = this;
            that.addForm.addHouseForm.houseTableData.pageNum=1;
            var postData = {
                xiaoquName: this.addForm.addHouseForm.searchHouseForm.xiaoquName,
                number: this.addForm.addHouseForm.searchHouseForm.number,
                page: this.addForm.addHouseForm.houseTableData.pageNum,
                size: 3
            };

            ClinchDealApi.searchHouse(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addForm.addHouseForm.houseTableData=result.data;
            }).catch(error => {
                console.log('searchHouse_error');
            });
        },
        handleHouseTableDataChangeSearch(val){
            this.addForm.addHouseForm.houseTableData.pageNum = val;
            var that = this;

            var postData = {
                xiaoquName: this.addForm.addHouseForm.searchHouseForm.xiaoquName,
                number: this.addForm.addHouseForm.searchHouseForm.number,
                page: this.addForm.addHouseForm.houseTableData.pageNum,
                size: 3
            };
            ClinchDealApi.searchHouse(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addForm.addHouseForm.houseTableData=result.data;
            }).catch(error => {
                console.log('searchHouse_error');
            });
        },
        searchGuestList(){
            var guest=this.addForm.addGuestForm.searchGuestForm.searchGuestText;
            if(guest.trim()=='' ){
                Message.error("查询条件不允许为空");
                return;
            }
            var that = this;
            that.addForm.addGuestForm.guestTableData.pageNum=1;
            var postData = {
                searchText: this.addForm.addGuestForm.searchGuestForm.searchGuestText,
                page: this.addForm.addGuestForm.guestTableData.pageNum,
                size: 3
            };

            ClinchDealApi.searchGuest(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addForm.addGuestForm.guestTableData=result.data;
            }).catch(error => {
                console.log('searchGuest_error');
            });
        },
        handleGuestTableDataChangeSearch(val){
            this.addForm.addGuestForm.guestTableData.pageNum = val;
            var that = this;

            var postData = {
                searchText: this.addForm.addGuestForm.searchGuestForm.searchGuestText,
                page: this.addForm.addGuestForm.guestTableData.pageNum,
                size: 3
            };
            ClinchDealApi.searchGuest(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addForm.addGuestForm.guestTableData=result.data;
            }).catch(error => {
                console.log('searchGuest_error');
            });
        },
        backHandle(){
            if(this.editableTabsValue!=0){
                this.editableTabsValue=(parseInt(this.editableTabsValue)-1)+"";
            }else {
                this.addForm.addFormVisible = false;
            }
        },
        nextHandle(){
            if(this.editableTabsValue<5){
                if(this.editableTabsValue==0 || this.editableTabsValue==1){
                    this.addForm.backVisible=true;
                    this.addForm.nextVisible=false;
                }
                this.editableTabsValue=(parseInt(this.editableTabsValue)+1)+"";
            }
        },
        tabLeaveHandle(activeName, oldActiveName){
            var that = this;
            if(activeName != this.editableTabsValue){
                return false;
            }
        },
        // 重置新增成交
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 新增成交信息保存
        submitAdd(ruleForm) {
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
                            if (typeof(result) != "object") {
                                result = JSON.parse(result)
                            }
                            Message({
                                message: "新增客源成功",
                                type: 'success'
                            });
                            that.alertAdd.visible = false;
                            that.resetForm(ruleForm);
                            that.doSearch();
                        }).catch(error => {
                            console.log('insertGuest_error' + error);
                        });
                    }).catch(() => {

                    });
                } else {
                    return false;
                }
            });
        },

        // 业绩分配确定
        submitAllot() {
            this.dialogForm.statusForm3.statusVisible3 = false
        },

        // 成交查询
        doSearch() {
            var that = this;
            var postData = {
                contractnumber: this.searchForm.contractnumber,
                type: this.searchForm.type,
                state: this.searchForm.state,
                page: this.tableForm.pageNum,
                size: this.tableForm.pageSize
            };

            ClinchDealApi.searchclinchDeal(postData).then(function (result) {
                if (typeof(result) != "object") {
                    result = JSON.parse(result)
                }
                that.tableForm = result.data;
            }).catch(error => {
                console.log('searchclinchDeal_error');
            });
        },
        search() {
            this.tableForm.pageNum = 1;
            this.doSearch();
        },  //搜索

        handleCurrentChangeSearch(val) {
            this.tableForm.pageNum = val;
            this.doSearch();
        },  //分页change

        compileIt(item) {
            var that = this;
            var postData = {
                code: item.code
            };
            console.log(postData);
            switch (item.status) {
                case 0:
                    that.dialogForm.statusForm1.statusVisible1 = true;
                    break;
                case 1:
                    that.dialogForm.statusForm2.statusVisible2 = true;
                    break;
                case 2:
                    that.dialogForm.statusForm3.statusVisible3 = true;
                    break;
                default:
                    ;
            }
        },  //编辑
        addPerformance() {
            this.dialogForm.addPerformanceForm.addPerformanceVisible = true;
            this.dialogForm.addPerformanceForm.performanceList = [];
            this.dialogForm.addPerformanceForm.performanceCheckList = [];
        },  //添加业绩

        searchPerformance() {
            this.dialogForm.addPerformanceForm.performanceList.push({
                code: '123',
                name: '王小虎',
                checked: false,
                disabled: false,
            });
            this.dialogForm.addPerformanceForm.showPerformanceList.forEach((item) => {
                this.dialogForm.addPerformanceForm.performanceList.forEach((item2) => {
                    if (item.code == item2.code) {
                        item2.checked = true;
                        item2.disabled = true;
                    }
                });
            });
        },  //搜索业绩

        checkIt(item) {
            console.log(item)
            if (item.checked == false) {
                return;
            }
            else {
                var performanceCheckList = this.dialogForm.addPerformanceForm.performanceCheckList;
                performanceCheckList.forEach((item2) => {
                    if (item.code == item2.code) {
                        performanceCheckList.splice(performanceCheckList.indexOf(item2), 1)
                        return;
                    }
                });
                performanceCheckList.push(item);
                this.dialogForm.addPerformanceForm.performanceCheckList = performanceCheckList;
            }
        },  //选择业绩人

        putPerformance() {
            this.dialogForm.addPerformanceForm.performanceCheckList.forEach((item) => {
                this.dialogForm.addPerformanceForm.showPerformanceList.push(item)
            });
            this.dialogForm.addPerformanceForm.addPerformanceVisible = false;
        },  //确定选择业绩人

        //---------------------------------------上传部分 start ------------------------------------------------//
        //新增成交 图片上传
        uploadImg: function (param) {
            var that = this;
            var hid = this.id;
            var count = this.addForm.uploadImgData.contractImgLimit.length
                + this.addForm.uploadImgData.houseProveImgLimit.length
                + this.addForm.uploadImgData.loanContractImgLimit.length
                + this.addForm.uploadImgData.identityProveImgLimit.length
                + this.addForm.uploadImgData.receiptImgLimit.length;
            var pcount = this.addForm.uploadImgData.contractImgList.length
                + this.addForm.uploadImgData.houseProveImgList.length
                + this.addForm.uploadImgData.loanContractImgList.length
                + this.addForm.uploadImgData.identityProveImgList.length
                + this.addForm.uploadImgData.receiptImgList.length
                + this.addForm.uploadImgData.agreementImgList.length;
            if (pcount < count) {
                Message.error("请上传完整数量的图片！");
            } else {
                this.$confirm('此操作将提交实勘审核, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    HouseApi.updateImg(postData).then(function (result) {
                        console.log(result);
                        if (typeof(result) != "object") {
                            result = JSON.parse(result)
                        }
                        that.examineVisible = false;
                        Message({
                            message: '提交成功，请等待审核',
                            type: 'success'
                        });
                    }).catch(error => {
                        console.log('updateImg_error');
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        },

        handleExceed(file, fileList) {
            Message.error("超出上传范围！");
        },

        handleChangeImg1(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.contractImgList.push(bean);
            };
        },
        handleChangeImg2(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.houseProveImgList.push(bean);
            };
        },
        handleChangeImg3(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.agreementImgList.push(bean);
            };
        },
        handleChangeImg4(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.receiptImgList.push(bean);
            };
        },
        handleChangeImg5(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.identityProveImgList.push(bean);
            };
        },
        handleChangeImg6(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.loanContractImgList.push(bean);
            };
        },

        handleRemove1(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.contractImgList.length;i++){
                if(this.addForm.uploadImgData.contractImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.contractImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove2(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.houseProveImgList.length;i++){
                if(this.addForm.uploadImgData.houseProveImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.houseProveImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove3(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.agreementImgList.length;i++){
                if(this.addForm.uploadImgData.agreementImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.agreementImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove4(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.receiptImgList.length;i++){
                if(this.addForm.uploadImgData.receiptImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.receiptImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove5(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.identityProveImgList.length;i++){
                if(this.addForm.uploadImgData.identityProveImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.identityProveImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove6(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.loanContractImgList.length;i++){
                if(this.addForm.uploadImgData.loanContractImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.loanContractImgList.splice(i,1);
                    break;
                }
            }
        },


        //---------------------------------------上传部分 end ------------------------------------------------//
    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.passenger_table{
    margin-top: 20px;
    padding: 20px;
    box-shadow: 0px 0px 10px #e3e3e3;
    // border: 1px solid #d7d7d7;
    .passenger-wrap-table{
        padding: 20px;
    }
    .table-pagination{
        margin-top: 20px;
        text-align: right;
    }
    .passenger-wrap-header{
        padding: 20px;
        overflow: hidden;
        box-shadow: 0px 0px 10px #e3e3e3;
        .el-input{
            width: 200px;
        }
    }
}
.look-detail-wrap{
    .look-detail-wrap-header{
        padding: 20px;
        overflow: hidden;
        box-shadow: 0px 0px 10px #e3e3e3;
        .el-input{
            width: 200px;
        }
    }
    .look-detail-wrap-table{
        padding: 20px;

        /*text-align: center;*/
        img{
            height: 11vw;
        }
    }
}
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
