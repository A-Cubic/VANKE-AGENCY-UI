<template>
    <section class="passengerDetails">
        <div class="detail-template">
            <!-- 这条信息的id是{{id}} -->

            <el-row :gutter="25">
                <el-col :span="24">
                    <ul class="user-content">
                        <li>
                            <div class="user-name">
                                <span>{{formUser.guestname}}</span>
                                <span>( {{formUser.sex}} )</span>
                            </div>
                            <div class="user-level">
                                <el-rate
                                        v-model="formUser.guestgrade=='A'?3:formUser.guestgrade=='B'?2:1"
                                        :max="3"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        :score-template="formUser.guestgrade">
                                </el-rate>
                            </div>



                        </li>
                        <li>
                            <span class="user-title">客源编号： </span>
                            <span class="user-mes">{{formUser.number}}</span>
                            <span class="user-title" v-show="role=='ROLE_MANAGER'&& formUser.user_type=='0'?true:false">维护人： </span>
                            <span class="user-mes" v-show="role=='ROLE_MANAGER'&& formUser.user_type=='0'?true:false">{{formUser.recordRelName}}</span>
                            <span class="user-title" v-show="role=='ROLE_MANAGER'&& formUser.user_type=='0'?true:false">客户电话： </span>
                            <span class="user-mes" v-show="role=='ROLE_MANAGER'&& formUser.user_type=='0'?true:false">{{formUser.phone}}</span>
                        </li>
                        <li>
                            <span class="user-title">上次维护： </span>
                            <span class="user-mes">{{formUser.recordTime}}</span>
                            <span class="user-title">委托时间： </span>
                            <span class="user-mes">{{formUser.createTime}}</span>
                        </li>
                        <li>
                            <!--<span class="user-title">标签：</span>-->
                            <el-tag type="success" v-show="formUser.label==null || formUser.label==''?false:true">
                                {{ formUser.label }}
                            </el-tag>
                            <el-tag v-show="formUser.iskey=='1'?true:false" type="danger">
                                无效客源
                            </el-tag>
                            <el-tag v-show="formUser.isshare=='1'?true:false">
                                共享池
                            </el-tag>
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <el-row :gutter="25">
                <el-col :span="18">
                    <div class="tab-content">
                        <el-tabs>
                            <el-tab-pane label="需求">

                                <el-row type="flex" class="row-bg" :gutter="20">
                                    <el-col :span="1"></el-col>
                                    <el-col :span="10">
                                            <span class="spanlabel">类型： </span>
                                            <span>{{needForm.type=='0'?'买卖':'租赁'}}</span>
                                    </el-col>
                                    <el-col :span="3"></el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" :gutter="20">
                                    <el-col :span="1"></el-col>
                                    <el-col :span="10">
                                        <span class="spanlabel">心里价位： </span>
                                        <span>{{needForm.heartprice}}¥</span>
                                    </el-col>
                                    <el-col :span="3"></el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" :gutter="20">
                                    <el-col :span="1"></el-col>
                                    <el-col :span="10">
                                        <span class="spanlabel">面积： </span>
                                        <span>{{needForm.areas}}m²</span>
                                    </el-col>
                                    <el-col :span="3"></el-col>
                                </el-row>
                                <el-row type="flex" class="row-bg" :gutter="20">
                                    <el-col :span="1"></el-col>
                                    <el-col :span="10">
                                        <span class="spanlabel">目的用途： </span>
                                        <span>{{needForm.purpose}}</span>
                                    </el-col>
                                    <el-col :span="3"></el-col>
                                </el-row>

                                <el-row type="flex" class="row-bg" :gutter="20">
                                    <el-col :span="1" >
                                    </el-col>
                                    <el-col :span="20">
                                        <span class="spanlabel">户型： </span>
                                        <span>{{needForm.huxingshi?needForm.huxingshi:0}}</span>
                                        <span> 室 </span>
                                        <span>{{needForm.huxingting?needForm.huxingting:0}}</span>
                                        <span> 厅 </span>
                                        <span>{{needForm.huxingwei?needForm.huxingwei:0}}</span>
                                        <span> 卫 </span>
                                        <span>{{needForm.huxingchu?needForm.huxingchu:0}}</span>
                                        <span> 厨 </span>
                                    </el-col>
                                </el-row>

                                <el-row type="flex" class="row-bg" :gutter="20">
                                    <el-col :span="1"></el-col>
                                    <el-col :span="20">
                                        <span class="spanlabel">位置： </span>
                                        <span>{{needForm.position}}</span>
                                    </el-col>
                                    <el-col :span="3"></el-col>
                                </el-row>

                                <el-row type="flex" class="row-bg" :gutter="20">
                                    <el-col :span="1"></el-col>
                                    <el-col :span="20">
                                        <span class="spanlabel">备注： </span>
                                        <span>{{needForm.remarks}}</span>
                                    </el-col>
                                    <el-col :span="3"></el-col>
                                </el-row>


                            </el-tab-pane>
                            <el-tab-pane label="带看">
                                <!-- <el-button size="medium"
                                           type="primary"
                                           icon="el-icon-plus"
                                           @click="dialogShow"></el-button>
                                <el-card v-for="(item, index) in takeLookList" :key="index" class="box-card" v-show="takeLookList.length > 0" shadow="always">
                                    {{'编号: ' + item.serialNumber }}
                                </el-card> -->
                                <el-table :data="takeLookForm.list"
                                        size="mini"
                                        max-height="320"
                                        style="width: 100%;margin-top: 0px;padding: 20px;box-shadow: 0px 0px 10px #e3e3e3;">
                                    <el-table-column prop="createTime" label="看房时间"></el-table-column>
                                    <el-table-column prop="houseName" label="房源编号"></el-table-column>
                                    <el-table-column prop="feedback" label="反馈结果" show-overflow-tooltip></el-table-column>
                                </el-table>
                                <div class="table-pagination" style=" margin-top: 20px;text-align: right;">
                                    <el-pagination
                                            layout="prev, pager, next, jumper, total"
                                            :page-size="takeLookForm.pageSize"
                                            :current-page.sync="takeLookForm.pageNum"
                                            :total ="takeLookForm.total"
                                            @current-change="handleTakeLookFormChangeSearch">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="跟进">
                                <el-table :data="remarkForm.list"
                                        size="mini"
                                        max-height="320"
                                        style="width: 100%;margin-top: 0px;padding: 20px;box-shadow: 0px 0px 10px #e3e3e3;"
                                        @cell-mouse-enter="mouseEnter"
                                        @cell-mouse-leave="mouseLeave">
                                    <el-table-column label="" width="60px" min-width="60px">
                                        <template slot-scope="scope">
                                            <el-tag
                                                    v-show="scope.row.istop=='1'?true:false"
                                                    type="danger"
                                                    disable-transitions>置顶</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="createTime" label="跟进时间" width="180px" min-width="150px"></el-table-column>
                                    <el-table-column prop="content" label="跟进内容" show-overflow-tooltip></el-table-column>
                                    <el-table-column label="置顶/取消" width="180px" min-width="150px">
                                        <template scope="scope">
                                            <el-button size="mini"
                                                       icon="el-icon-upload2"
                                                       type="danger"
                                                       circle
                                                       v-show="(scope.row.topicon==null || scope.row.topicon=='' || (scope.row.istop=='1' && scope.$index==0))?false:true"
                                                       @click="setTop(scope.row)"></el-button>
                                            <el-button size="mini"
                                                       icon="el-icon-download"
                                                       type="warning"
                                                       circle
                                                       v-show="(scope.row.topicon==null || scope.row.topicon=='' || scope.row.istop=='0')?false:true"
                                                       @click="setNoTop(scope.row)"></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="table-pagination" style=" margin-top: 20px;text-align: right;">
                                    <el-pagination
                                            layout="prev, pager, next, jumper, total"
                                            :page-size="remarkForm.pageSize"
                                            :current-page.sync="remarkForm.pageNum"
                                            :total ="remarkForm.total"
                                            @current-change="handleRemarkFormChangeSearch">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>


                <el-col :span="6" >
                    <ul class="maintain-content" v-show="formUser.isshare=='1' || formUser.user_type=='0'?false:true">
                        <li>
                            <div class="maintain-content-header">联系</div>
                            <el-popover
                                    title="联系电话"
                                    width="200"
                                    trigger="click"
                                    :content="formUser.phone"
                                    :disabled="formUser.isshare=='1'?true:false"
                                    >
                                <div class="maintain-content-mes" slot="reference">查看电话</div>
                            </el-popover>
                        </li>
                        <li>
                            <div class="maintain-content-header">维护</div>
                            <div class="maintain-content-mes" @click="remarkVisible = true">录跟进</div>
                            <div class="maintain-content-mes" @click="lookVisible = true" @close="addLookClose">录带看</div>
                            <div class="maintain-content-mes" @click="stateHandel">{{formUser.iskey=='0'?'无效客源申请':formUser.iskey=='1'?'取消无效客源申请':formUser.iskey=='2'?'无效客源审核中':'取消无效客源审核中'}}</div>
                            <div class="maintain-content-mes" @click="transferHandel">客源转让</div>
                            <!-- <div class="maintain-content-mes">发起合作</div> -->
                        </li>
                        <!-- <li>
                            <div class="maintain-content-header">管理</div>
                            <div class="maintain-content-mes"></div>
                        </li> -->
                    </ul>
                    <div class="maintain-content" v-show="formUser.isshare=='1'?true:false">
                        <el-button type="primary"
                                   size="small"
                                   icon="el-icon-upload2"
                                   style="margin-left: 30%; margin-top: 20%;"
                                   v-show="formUser.isshare=='1'?true:false"
                                   @click="updateIsShareGuest">
                            升级成为维护人
                        </el-button>
                    </div>
                </el-col>
            </el-row>

            <el-dialog title="写跟进" :visible.sync="remarkVisible" width="40%">
                <el-input type="textarea" :rows="4" placeholder="请输入跟进内容" v-model="remarkMes"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="remarkVisible = false">取 消</el-button>
                    <el-button type="primary" @click="insertRemark">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="录入带看房源信息" :visible.sync="lookVisible" width="80%">
                <div class="look-wrap">
                    <el-card class="box-card"
                             shadow="always"
                             v-for="(item, index) in LookedList"
                             :key="index">
                        <div slot="header" class="clearfix">
                            <span>带看时间: </span>
                            <el-date-picker v-model="item.createTime" type="datetime" placeholder="开始日期"></el-date-picker> -
                            <el-date-picker v-model="item.endtime" type="datetime" placeholder="结束日期"></el-date-picker>
                            <el-button type="text" icon="el-icon-close" @click="delLooked(item)"></el-button>
                        </div>
                        <!--<el-card :body-style="{ padding: '0px' }">-->
                            <!--<img :src="item.titleimg" class="image">-->
                            <!--<div style="padding: 14px;float:left">-->
                                <!--<span>{{item.xiaoquName}}</span>-->
                                <!--<div class="bottom clearfix">-->
                                    <!--<span>{{item.number}}</span>-->
                                    <!--<span>{{item.price}}</span>-->
                                <!--</div>-->
                                <!--<div class="bottom clearfix">-->
                                    <!--<span>{{item.huxing}}</span>-->
                                    <!--<span>{{item.areas}}</span>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</el-card>-->
                        <ul class="look-data-template">
                            <li>
                                <img style="width:100px;height:80px;" :src="item.titleimg" alt="无法查看">
                            </li>
                            <li>{{item.number}}</li>
                            <li>{{item.xiaoquName}}</li>
                            <li>{{item.price}}</li>
                            <li>{{item.huxing}}</li>
                            <li>{{item.areas}}</li>
                            <li>{{item.floor}}</li>
                        </ul>
                        <el-form :model="item" ref="form" label-width="60px" class="demo-ruleForm">
                            <el-form-item label="反馈:">
                                <el-input type="textarea" :rows="4" placeholder="请输入反馈" v-model="item.feedback"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="table-button"></div>
                    </el-card>
                    <div class="add-look" @click="LookDetailHandel">
                        <i class="el-icon-plus icon-look"></i>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="lookVisible = false">取 消</el-button>
                    <el-button type="primary" @click="insertLookRecord">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="添加带看房源" :visible.sync="lookDetailVisible" width="80%" >
                <div class="look-detail-wrap">
                    <div class="look-detail-wrap-header">
                        <el-input placeholder="请输入小区名称" v-model="addLookForm.xiaoquName" clearable></el-input>
                        <el-input placeholder="请输入房源编号" v-model="addLookForm.number" clearable></el-input>
                        <el-select v-model="addLookForm.type" style="width: 200px;" placeholder="请选择类型">
                            <el-option label="买卖" value="1"></el-option>
                            <el-option label="租赁" value="2"></el-option>
                        </el-select>
                        <el-button class="m-btn-addMenu" type="primary" icon="el-icon-search" @click="searchHouseList">查询</el-button>
                    </div>
                    <div class="look-detail-wrap-table">
                        <el-table :data="lookTableData.list"  style="width: 100%" v-loading="loading">
                            <el-table-column label="标题图">
                                <template scope="scope">
                                    <img style="height: 100px;width: 150px;" :src="scope.row.titleimg" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column prop="number" label="编号"></el-table-column>
                            <el-table-column prop="xiaoquName" label="小区"></el-table-column>
                            <el-table-column prop="areas" label="面积"></el-table-column>
                            <el-table-column prop="floor" label="楼层"></el-table-column>
                            <el-table-column prop="priceText" label="价格"></el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button type="danger" icon="el-icon-check" circle @click="addLookDetail(scope.row)"></el-button>
                                </template>
                                <!--<template scope="scope">-->
                                    <!--<el-checkbox v-model="scope.row.checked"-->
                                                 <!--:disabled="scope.row.disabled"-->
                                                 <!--@change="checkLookDetail(scope.row)">选择-->
                                    <!--</el-checkbox>-->
                                <!--</template>-->
                            </el-table-column>
                        </el-table>
                        <div class="table-pagination" style=" margin-top: 20px;text-align: right;">
                            <el-pagination
                                    layout="prev, pager, next, jumper, total"
                                    :page-size="lookTableData.pageSize"
                                    :current-page.sync="lookTableData.pageNum"
                                    :total ="lookTableData.total"
                                    @current-change="handlelookTableDataChangeSearch">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <!--<el-button @click="addLookDetail">添 加</el-button>-->
                    <el-button type="primary" @click="finishLookDetail">完 成</el-button>
                </span>
            </el-dialog>

            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                <!--<el-input placeholder="请输入内容" v-model="input5" class="input-with-select">-->
                    <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
                <!--</el-input>-->
                <el-input size="medium" v-model="searchMes" class="input-with-select" placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search" @click="searchNumber"></el-button>
                </el-input>
                <div class="card-wrap">
                    <el-card class="box-card" v-show="searchList.length > 0" shadow="hover">
                        <div v-for="(item, index) in searchList" :key="index" @click="chooseIt(item)">
                            {{'编号: ' + item.serialNumber }}
                        </div>
                    </el-card>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogHidden">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="客源转让" :visible.sync="transferVisible" width="80%">
                <div class="transfer-wrap">
                    <div class="transfer-wrap-header">
                        <el-input placeholder="请输入编号后六位或全名" v-model="transferForm.usertext" clearable></el-input>
                        <el-button class="m-btn-addMenu"  icon="el-icon-search" type="primary" @click="searchTransfer">查询</el-button>
                    </div>
                    <div class="transfer-wrap-table">
                        <el-table :data="transferForm.personList" style="width: 100%">
                            <el-table-column prop="user_no" label="编号"></el-table-column>
                            <el-table-column prop="relname" label="姓名"></el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="mini" type="text" @click="submitTransfer(scope.row)">转让</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="transferVisible = false">退 出</el-button>-->
                <!--<el-button type="primary" @click="finishTransfer">确 定</el-button>-->
                <!--</span>-->
            </el-dialog>
        </div>
    </section>

</template>

<script>
    import GuestApi from '../api/api_guest.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
    import { getRole } from '../util/global'
    export default {
        install(Vue) {
            Vue.prototype.$message = Message
        },
        name: "passenger-details",
        props: ['id'],
        data() {
            return {
                role:'',
                loading: false,
                pageVisbaleEmpty: false,
                pageVisbaleData: true,
                transferVisible: false,
                transferForm: {
                    usertext:'',
                    personList: [
                        {
                            relname: '',
                            user_no: '',
                            username: ''
                        }
                    ],
                    chooseName: '',
                    chooseCode: '',
                    chooseAcc: '',
                },
                formUser: {
                    guestname: '',
                    recordRelName: '',
                    sex: '',
                    iskey:'',
                    number: '',
                    guestgrade: '',
                    recordTime: '',
                    createTime: '',
                    label: '',//自定义标签
                    phone: '',  //联系电话
                    phonetow: '',//备用电话
                    isshare:'',
                    user_type:''
                },
                needForm:{
                    type: '',  //客源类型(0:买,1:租)
                    heartprice: '',  //心里价位
                    remarks: '',  //备注简介
                    areas: '',  //需求面积
                    position: '',//位置
                    huxingshi: '',  //需求几室
                    huxingting: '',  //需求几厅
                    huxingwei: '',  //需求几卫
                    huxingchu: '',  //需求几厨
                    purpose: '',  //目的用途
                },
                remarkForm:{
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                    list: [
                        {
                            createTime:'',
                            content:'',
                        }
                    ]
                },

                takeLookForm:{
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                    list: [
                        {
                            createTime:'',
                            houseName:'',
                            feedback:'',
                        }
                    ]
                },

                phoneVisible: false,
                remarkVisible: false,
                remarkMes: '',
                lookVisible: false,
                lookDetailVisible: false,

                lookTableData:{
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                    list: [
//                        {
//                            id: '',
//                            number:'',
//                            titleimg: '',
//                            xiaoquName: '',
//                            huxing: '',
//                            areas: '',
//                            price: '',
//                            floor: '',
//                            checked: false,
//                            disabled: false,
//                        }
                    ]
                },
                lookTableCheckedList: [],
                LookedList: [],


                addLookForm:{
                    xiaoquName: '',
                    number: '',
                    type: '1',
                },



                dialogVisible: false,
                searchMes: '',
                searchList: [],
                takeLookList: [],
            };
        },

        computed: {
        },
        filter:{
        },
        created(){
            this.role = this.getRole();
            this.doSearch();
        },
        methods: {
            getRole(){
                return getRole();
            },
            mouseEnter(row, column, cell, event){
                row.topicon='1'
            },
            mouseLeave(row, column, cell, event){
                row.topicon=''
            },
            setTop(row){
                var that = this;
                var gid = this.id;
                var postData = {
                    id: row.id,
                };

                GuestApi.updateIsTopOne(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}

                    var postData1 = {
                        id: gid,
                        page: 1,
                        size: 5
                    };

                    GuestApi.recordDetail(postData1).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.remarkForm=result.data;
                        Message({
                            type: 'success',
                            message: '置顶成功!'
                        });
                    }).catch(error => {
                        console.log('recordDetail_error');
                    });
                }).catch(error => {
                    console.log('updateIsTopOne_error'+error);
                });
            },
            setNoTop(row){
                var that = this;
                var gid = this.id;

                var postData = {
                    id: row.id,
                };

                GuestApi.updateIsTopZero(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    var postData1 = {
                        id: gid,
                        page: 1,
                        size: 5
                    };

                    GuestApi.recordDetail(postData1).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.remarkForm=result.data;
                        Message({
                            type: 'success',
                            message: '已取消置顶!'
                        });
                    }).catch(error => {
                        console.log('recordDetail_error');
                    });
                }).catch(error => {
                    console.log('updateIsTopZero_error'+error);
                });
            },
            updateIsShareGuest(){
                this.$confirm('此操作将维护人更改为当前用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var that = this;
                    var gid = this.id;
                    var postData = {
                        id: gid
                    };
                    GuestApi.updateIsshareUser(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.doSearch();
                        Message({
                            type: 'success',
                            message: '你已成为此客源维护人'
                        });
                    }).catch(error => {
                        console.log('updateIsshareUser_error'+error);
                    });

                }).catch(() => {

                });

            },
            doSearch(){
                var that = this;
                var gid = this.id;

                var postData = {
                    id: gid,
                    page: 1,
                    size: 5
                };

                GuestApi.guestDetail(postData).then(function (result) {
//                     console.log(result);
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    if(result.data==0){
                        that.pageVisbaleEmpty=true;
                        that.pageVisbaleData =false;
                        return;
                    }
                    that.formUser=result.data;
                    that.needForm=result.data;
                    // console.log(result.data);
                }).catch(error => {
                    console.log('guestDetail_error');
                });

                GuestApi.lookDetail(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.takeLookForm=result.data;
                }).catch(error => {
                    console.log('lookDetail_error'+error);
                });

                GuestApi.recordDetail(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.remarkForm=result.data;
                }).catch(error => {
                    console.log('recordDetail_error');
                });
            },
            insertRemark(){
                var that = this;
                var gid = this.id;

                var postData = {
                    guestId: gid,
                    content: this.remarkMes
                };

                GuestApi.recordInsert(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    Message({
                        message: "跟进成功",
                        type: 'success'
                    });
                    that.remarkVisible = false;
                    var postData1 = {
                        id: gid,
                        page: that.remarkForm.pageNum,
                        size: 5
                    };

                    GuestApi.recordDetail(postData1).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.remarkForm=result.data;
                    }).catch(error => {
                        console.log('recordDetail_error');
                    });

                }).catch(error => {
                    console.log('guestDetail_error');
                });
            },
            insertLookRecord(){
                var that = this;
                var gid = this.id;
                var postData = this.LookedList;

                GuestApi.insertLook(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    Message({
                        message: "成功添加带看记录",
                        type: 'success'
                    });
                    that.lookVisible = false;
                    that.LookedList = [];
                    var postData1 = {
                        id: gid,
                        page: that.takeLookForm.pageNum,
                        size: 5
                    };

                    GuestApi.lookDetail(postData1).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.takeLookForm=result.data;
                    }).catch(error => {
                        console.log('lookDetail_error'+error);
                    });

                }).catch(error => {
                    console.log('guestDetail_error');
                });
            },
            transferHandel(){
                if(this.formUser.isshare=='1'){
                    Message.error("此客源是共享客源，不能转让!")
                    return;
                }
                this.transferForm.usertext = '';
                this.transferForm.personList = [];
                this.transferForm.chooseName = '';
                this.transferForm.chooseCode = '';
                this.transferForm.chooseAcc = '';
                this.transferVisible = true;
            },
            searchTransfer(){
                var that = this;
                var postData = {
                    usertext: this.transferForm.usertext
                };
                GuestApi.searchUser(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.transferForm.personList=result.data;
                }).catch(error => {
                    console.log('searchUser_error');
                });
            },  //查找用户
            submitTransfer(item){
                var that = this;
                var gid = this.id;
                var postData = {
                    id: gid,
                    recordUserName: item.username
                };
                GuestApi.updateRecordUser(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.transferVisible = false;
                    Message({
                        message: '转让成功!',
                        type: 'success'
                    });

                    var postData1 = {
                        id: gid
                    };
                    GuestApi.guestDetail(postData1).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        if(result.data==0){
                            that.pageVisbaleEmpty=true;
                            that.pageVisbaleData =false;
                            return;
                        }
                        that.formUser=result.data;
                        that.needForm=result.data;
                    }).catch(error => {
                        console.log('guestDetail_error');
                    });
                }).catch(error => {
                    Message.error('转让失败!')
                });


            },  //确定选择
            stateHandel(){
                if(this.formUser.isshare=='1'){
                    Message.error("此客源是共享客源，不能修改状态!")
                    return;
                }
                var that = this;
                var gid = this.id;
                var isData = this.formUser.iskey;
                var isData1 ;
                var text = '申请审核此客源为无效客源, 是否继续?';
                if(isData=='2'){
                    Message({
                        message: '无效客源审核中，请等待审核结束，再申请',
                        type: 'warning'
                    });
                    return;
                }
                if(isData=='3'){
                    Message({
                        message: '取消无效客源审核中，请等待审核结束，再申请',
                        type: 'warning'
                    });
                    return;
                }

                if(isData=='0'){
                    isData1='1';
                }else if(isData=='1'){
                    isData1='0';
                    text = '申请审核取消无效客源, 是否继续?';
                }
                this.$confirm(text, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var postData = {
                        id: gid,
                        iskey:isData1
                    };
                    GuestApi.updateState(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.formUser.iskey = result.data;
                        Message({
                            type: 'success',
                            message: '申请成功，请等待审核!'
                        });
                    }).catch(error => {
                        console.log('updateState_error'+error);
                    });

                }).catch(() => {
                    // Message({
                    //     type: 'info',
                    //     message: '已取消更改!'
                    // });
                });
            },
            dialogShow(){
                this.dialogVisible = true;
                this.searchList = [];
            },
            dialogHidden(){
                this.dialogVisible = false;
            },
            searchNumber(){
                var postData = {
                    mes: this.searchMes
                };
                this.searchList = [],
                this.searchList.push({
                    id: 0,
                    serialNumber: '1000-2478-fgdf-34jh'
                })
            },
            chooseIt(item){
                console.log(item);
                this.takeLookList.push(item)
                this.dialogHidden();
            },

            LookDetailHandel(){
                var that = this;
                this.lookDetailVisible = true;
//                this.lookTableCheckedList = [];
//                that.lookTableData.list.forEach((item) => {
//                    var item1 = item;
//                    item1.checked = false;
//                    item1.disabled = false;
//                    that.LookedList.forEach((item2) => {
//                        if(item1.houseId == item2.houseId){
//                            item1.checked = true;
//                            item1.disabled = true;
//                            return;
//                        }
//                    });
//                })

                // _.find(that.lookTableData,function (item) {
                //     return item.id === that.LookedList?that.LookedList[item.id]:''
                // }).checked.disabled = true;
            },
            checkLookDetail(item){
                console.log(item)
                var that = this;
//                if(item.checked == true){
//                    that.lookTableCheckedList.push(item);
//                } else{
//                    this.lookTableCheckedList.forEach((items) => {
//                        if(item.id == items.id){
//                            that.lookTableCheckedList.splice(that.lookTableCheckedList.indexOf(items), 1);
//                        };
//                    });
//                }
                // console.log(that.lookTableCheckedList);
            },  //带看详情 选择房源
            addLookClose(){
                this.LookedList = [];
            },
            addLookDetail(item){
                var that = this;
                var gid = this.id;
//                this.lookTableCheckedList.forEach((item) => {
//                    item.disabled = true;
                this.LookedList.push({
                        houseId: item.id,
                        guestId: gid,
                        number:item.number,
                        titleimg: item.titleimg,
                        xiaoquName: item.xiaoquName,
                        huxing: item.huxing,
                        areas: item.areas,
                        price: item.price,
                        floor: item.floor,
                        checked: 1,
                        createTime: '',
                        endtime: '',
                        feedback: '',
                    });
                this.lookTableData.list.splice(this.lookTableData.list.indexOf(item), 1)
//                });
                // console.log(this.LookedList)
//                this.lookTableCheckedList = [];
            },
            finishLookDetail(){
//                this.addLookDetail();
                this.lookDetailVisible = false;
                this.addLookForm.xiaoquName='';
                this.addLookForm.number='';
                this.lookTableData.pageNum=1;
                this.lookTableData.pageSize=5;
                this.lookTableData.total=0;
                this.lookTableData.list=[];
            },  //添加带看房源 完毕
            delLooked(item){
                this.LookedList.forEach((items) => {
                    if(item.houseId == items.houseId){
                        this.LookedList.splice(this.LookedList.indexOf(items), 1)
                    }
                });
            },  //带看房源 删除

            handleRemarkFormChangeSearch(val){
                this.remarkForm.pageNum = val;
                var that = this;
                var gid = this.id;

                var postData = {
                    id: gid,
                    page: this.remarkForm.pageNum,
                    size: 5
                };

                GuestApi.recordDetail(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.remarkForm=result.data;
                }).catch(error => {
                    console.log('recordDetail_error');
                });
            },
            handleTakeLookFormChangeSearch(val){
                this.takeLookForm.pageNum = val;
                var that = this;
                var gid = this.id;

                var postData = {
                    id: gid,
                    page: this.takeLookForm.pageNum,
                    size: 5
                };

                GuestApi.lookDetail(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.takeLookForm=result.data;
                }).catch(error => {
                    console.log('lookDetail_error');
                });
            },
            handlelookTableDataChangeSearch(val){
                this.lookTableData.pageNum = val;
                var that = this;
                that.loading = true;
                var postData = {
                    xiaoquName: this.addLookForm.xiaoquName,
                    number: this.addLookForm.number,
                    type: this.addLookForm.type,
                    page: this.lookTableData.pageNum,
                    size: 5
                };

                GuestApi.houseListGuest(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.lookTableData=result.data;
                    that.LookedList.forEach((item1) => {
                        that.lookTableData.list.forEach((item) => {
                            if(item.id==item1.houseId){
                                that.lookTableData.list.splice(that.lookTableData.list.indexOf(item), 1)
                            }
                        });
                    })
                    that.loading = false;
                }).catch(error => {
                    console.log('houseListGuest_error');
                });
            },
            searchHouseList(){
                var xiaoquName=this.addLookForm.xiaoquName;
                    var number=this.addLookForm.number;
                    if(xiaoquName.trim()=='' && number.trim()==''){
                        Message.error("查询条件不允许都为空");
                        return;
                    }

                    var that = this;
                    that.lookTableData.pageNum=1;
                    that.loading = true;
                    var postData = {
                        xiaoquName: this.addLookForm.xiaoquName,
                        number: this.addLookForm.number,
                        type: this.addLookForm.type,
                        page: this.lookTableData.pageNum,
                        size: 5
                    };

                    GuestApi.houseListGuest(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.lookTableData=result.data;
                        that.LookedList.forEach((item1) => {
                            that.lookTableData.list.forEach((item) => {
                                if(item.id==item1.houseId){
                                    that.lookTableData.list.splice(that.lookTableData.list.indexOf(item), 1)
                                }
                            });
                        })
                        that.loading = false;
                }).catch(error => {
                    console.log('houseListGuest_error'+error);
                });

            },
        }
    }
</script>

<style lang="less">
    @import "../assets/css/element.less";
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .image {
        width: 80px;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .passengerDetails {
        /*border:1px solid red;*/
        .detail-template{
            width: 100%;
            padding: 25px 50px;
            background: #fff;
            .el-row {
                margin-bottom: 20px;
                &:last-child {
                    margin-bottom: 0;
                }
                .user-content{
                    box-shadow: 0px 0px 10px #e3e3e3;
                    min-height: 200px;
                    list-style-type: none;
                    li{
                        padding: 10px;
                        overflow: hidden;
                        .user-name{
                            float: left;
                            span{
                                &:first-child {
                                    font-size: 25px;
                                    font-weight: bolder;
                                }
                                &:last-child {
                                    font-size: 18px;
                                }
                            }

                        }
                        .user-level{
                            float: left;
                            margin: 10px 0 0 20px;
                        }
                        .user-title{
                            font-size: 14px;
                            font-weight: 500;
                            margin-left: 50px;
                            &:first-child {
                                margin-left: 0px;
                            }
                        }
                        .user-mes{
                            color: #666666;
                        }
                        .el-tag{
                            margin-left: 10px;
                            &:first-child {
                                margin-left: 0px;
                            }
                        }
                    }
                }
                .tab-content{
                    box-shadow: 0px 0px 10px #e3e3e3;
                    .el-tabs{
                        padding: 20px;
                        min-height: 300px;
                    }
                    .needForm{
                        background: #f8f8f8;
                        min-height: 280px;
                    }
                    .spanlabel{
                        color:#c51010;
                        display:inline-block;
                        width:100px;
                    }
                }

                .maintain-content{
                    box-shadow: 0px 0px 10px #e3e3e3;
                    min-height: 200px;
                    list-style-type: none;
                    padding: 10px;
                    li{
                        margin-bottom: 20px;
                        .maintain-content-header{
                            padding: 10px;
                            border-bottom: 1px solid #f2f2f2;
                        }
                        .maintain-content-mes{
                            padding: 10px;
                            border-bottom: 1px solid #f2f2f2;
                            color: #f56c6c;
                            cursor: pointer;
                        }
                    }
                }
            }

            .el-dialog{
                .look-wrap{
                    .add-look{
                        border: 1px dashed #d9d9d9;
                        width: 100%;
                        height: 10vw;
                        line-height: 10vw;
                        text-align: center;
                        .icon-look{
                            font-size: 36px;
                            color: #d9d9d9;
                        }
                    }
                    .el-card{
                        margin: 20px 0;
                        .clearfix{
                            overflow: hidden;
                            .el-button{
                                float: right;
                                clear: both;
                            }
                        }
                        .look-data-template{
                            list-style-type: none;
                            overflow: hidden;
                            /*border: 1px solid #f2f2f2;*/
                            box-shadow: 0px 0px 10px #e3e3e3;
                            li{
                                width: 14%;
                                height: 6vw;
                                line-height: 6vw;
                                /*border-right: 1px solid #f2f2f2;*/
                                float: left;
                                text-align: center;
                                &:last-child {
                                    border-right: none;
                                }
                                img{
                                    /*padding: 10px;*/
                                    /*width: 100%;*/
                                    /*height: 100%;*/
                                    margin-top:15px;
                                }
                            }
                        }
                        .el-form{
                            margin-top: 20px;
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
                        margin-top: 20px;
                        box-shadow: 0px 0px 10px #e3e3e3;
                        /*text-align: center;*/
                        img{
                            height: 11vw;
                        }
                    }
                }

            }
        }
        .transfer-wrap{
            .transfer-wrap-header{
                padding: 20px;
                box-shadow: 0px 0px 10px #e3e3e3;
                .el-input{
                    width: 200px;
                }
            }
            .transfer-wrap-table{
                padding: 20px;
                margin-top: 20px;
                box-shadow: 0px 0px 10px #e3e3e3;
                img{
                    height: 11vw;
                }
            }
        }
    }
</style>
