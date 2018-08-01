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
                    <el-table :data="tableForm.list" border>
                        <el-table-column prop="createTime" label="发起日期"></el-table-column>
                        <el-table-column prop="userRelName" label="发起人"></el-table-column>
                        <el-table-column prop="type" label="类型" :formatter="typeFormatter"></el-table-column>
                        <el-table-column prop="state"
                                         label="状态">
                            <template slot-scope="scope">
                                <el-tag
                                        :type="scope.row.state === '0' ? 'primary' : 'success'"
                                        disable-transitions>{{scope.row.state== '0'?'未审核':'已审核'}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="result"
                                         label="结果" >
                            <template slot-scope="scope">
                                <el-tag
                                        :type="scope.row.result == '0' ? 'danger' : (scope.row.result == '1'?'success':'primary')"
                                        disable-transitions>{{scope.row.result==null?'待处理': (scope.row.result=='0'?'未通过':'已通过')}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="原因">
                            <template scope="scope">
                                <el-popover placement="bottom" width="300" trigger="click">
                                    <div>
                                        <div>原因: </div>
                                        <div style="padding: 20px">
                                            {{ scope.row.content }}
                                        </div>
                                    </div>
                                    <el-button slot="reference" size="mini" type="text">{{ scope.row.content }}</el-button>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini" type="text" @click="auditItem(scope.row)">审核</el-button>
                                <!-- <el-button size="mini" type="text" @click="putPass(scope.row)">通过</el-button>
                                <el-button size="mini" type="text" @click="unPassHandel(scope.row)">不通过
                                </el-button> -->
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

            <el-dialog title="审核: " :visible.sync="auditForm.auditVisible" width="80%">
                <div class="audit-dialog-template" v-show="auditForm.aduitStatus == '4'">
                    <el-form :model="auditForm" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="室">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in auditForm.achshiImglist"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="厅">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in auditForm.achtingImglist"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="卫">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in auditForm.achweiImglist"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="厨">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in auditForm.achchuImglist"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="户型">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in auditForm.achhuxingImglist"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="其他">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in auditForm.achotherImglist"
                                 :key="index">
                        </el-form-item>
                    </el-form>
                </div>
                <div class="audit-dialog-template" v-show="auditForm.aduitStatus == '10'">
                    <div class="table-template1">
                        <el-table :data="auditForm.achDataForm.list" border>
                            <el-table-column prop="userrelname" label="经纪人"></el-table-column>
                            <el-table-column prop="roleName" label="角色"></el-table-column>
                            <el-table-column prop="proportion" label="占比(%)"></el-table-column>
                            <el-table-column prop="sumprice" label="业绩"></el-table-column>
                        </el-table>
                    </div>
                    <div class="table-pagination1">
                        <el-pagination
                                layout="prev, pager, next, jumper, total"
                                :page-size="auditForm.achDataForm.pageSize"
                                :current-page.sync="auditForm.achDataForm.pageNum"
                                :total ="auditForm.achDataForm.total"
                                @current-change="handleAuditChangeSearch">
                        </el-pagination>
                    </div>
                </div>
                <div class="audit-dialog-template" v-show="auditForm.aduitStatus != '4' && auditForm.aduitStatus != '10'">
                    <label class="auditContent">{{auditForm.achAllText}}，<router-link tag="a" target="_blank" :to="auditForm.achAllUrl">点击查看详情</router-link></label>
                </div>
                <div class="btn-footer" style="margin-top: 20px">
                    <el-input
                           type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="如果审核不通过，请输入不通过理由。"
                          v-model.trim="auditForm.unPassMes">
                    </el-input>
                    <el-button class="btn-unpass" type="danger" @click="doUnPass" icon="el-icon-close">不通过</el-button>
                    <el-button class="btn-pass" type="success" @click="doPass" icon="el-icon-check" >通过</el-button>
                </div>
            </el-dialog>

            <!-- <el-dialog title="原因: " :visible.sync="unPassForm.unPassVisible" width="40%">
                <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入原因"
                        v-model="unPassForm.unPassResult">
                </el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="putUnPass">确 定</el-button>
                </span>
            </el-dialog> -->
        </el-row>
    </section>
</template>
<script>
    import AuditApi from '../api/api_audit.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
export default {
    install(Vue) {
        Vue.prototype.$message = Message
    },
    data() {
        return {
            searchForm: {
                type: '',
                typeOption: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '特殊房源'
                    },
                    {
                        value: '2',
                        label: '优质房源'
                    },
                    {
                        value: '3',
                        label: '无效房源'
                    },
                    {
                        value: '4',
                        label: '实勘图片'
                    },
                    {
                        value: '5',
                        label: '无效客源'
                    },
                    {
                        value: '6',
                        label: '取消特殊房源'
                    },
                    {
                        value: '7',
                        label: '取消优质房源'
                    },
                    {
                        value: '8',
                        label: '取消无效房源'
                    },
                    {
                        value: '9',
                        label: '取消无效客源'
                    },
                    {
                        value: '10',
                        label: '成交业绩审核'
                    },
                ],
                status: '',
                statusOption: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '0',
                        label: '未审核'
                    },
                    {
                        value: '1',
                        label: '已审核'
                    }
                ],
                result: '',
                resultOption: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '0',
                        label: '未通过'
                    },
                    {
                        value: '1',
                        label: '已通过'
                    },
                ],
            },

            tableForm: {
                list: [
                    {
                        id: 0,
                        createTime: '',
                        userRelName: '',
                        type: '1',
                        state: '1',
                        result: '1',
                        content: '',
                        houseId:'',
                        guestId:'',
                        shiImglist:[],
                        tingImglist:[],
                        weiImglist:[],
                        chuImglist:[],
                        huxingImglist:[],
                        otherImglist:[],
                    }
                ],
                pageSize: 10,
                total: 0,
                pageNum: 1,
            },

            auditForm:{
                id: '',
                result: '',
                unPassMes: '',
                aduitStatus: '',
                auditVisible: false,
                achshiImglist:[],
                achtingImglist:[],
                achweiImglist:[],
                achchuImglist:[],
                achhuxingImglist:[],
                achotherImglist:[],
                achAllText:'',
                achAllId:'',
                achAllUrl:'',
                transactionId: '',
                achDataForm: {
                    list: [
                        {
                            userrelname: '',
                            roleName: '',
                            proportion: '',
                            sumprice: '',
                        }
                    ],
                    pageSize: 10,
                    total: 0,
                    pageNum: 1,
                },

            },
        };
    },
    created(){
        this.doSearch();
    },
    methods: {
        doSearch(){
            var that = this;
            var postData = {
                type: this.searchForm.type,
                state: this.searchForm.status,
                result: this.searchForm.result,
                page: this.tableForm.pageNum,
                size: this.tableForm.pageSize
            };
            AuditApi.searchAudit(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.tableForm=result.data;
            }).catch(error => {
                console.log('searchAudit_error');
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

        doSearchAudit(){
            var that = this;
            var postData = {
                transactionId: this.auditForm.transactionId,
                page: this.auditForm.achDataForm.pageNum,
                size: this.auditForm.achDataForm.pageSize
            };
            AuditApi.searchAchList(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.auditForm.achDataForm=result.data;
            }).catch(error => {
                console.log('searchAchList_error');
            });
        },
        handleAuditChangeSearch(val){
            this.auditForm.achDataForm.pageNum = val;
            this.doSearchAudit();
        },

        auditItem(item){
            var stt = item.type;
            var transactionId =item.transactionId;
            this.auditForm.aduitStatus = stt;
            this.auditForm.id = item.id;
            this.auditForm.transactionId = transactionId;
            this.auditForm.achshiImglist = item.shiImglist;
            this.auditForm.achtingImglist = item.tingImglist;
            this.auditForm.achweiImglist = item.weiImglist;
            this.auditForm.achchuImglist = item.chuImglist;
            this.auditForm.achhuxingImglist = item.huxingImglist;
            this.auditForm.achotherImglist = item.otherImglist;
            this.auditForm.achAllId = item.houseId;
            var txt = this.typeFormatterFuc(stt);
            if(stt=='1' || stt=='2' ||stt=='3' ||stt=='6' ||stt=='7' ||stt=='8' ){
                this.auditForm.achAllId = item.houseId;
                this.auditForm.achAllUrl = '/admin/houseDetails/'+item.houseId;
                this.auditForm.achAllText = txt;
            }else if(stt=='5' || stt=='9' ){
                this.auditForm.achAllId = item.guestId;
                this.auditForm.achAllUrl = '/admin/passengerDetails/'+item.guestId;
                this.auditForm.achAllText = txt;
            }

            if(stt=='10'){
                this.auditForm.achDataForm.pageNum = 1;
                this.doSearchAudit();
            }
            this.auditForm.auditVisible = true;
        },

//        unPassHandel(item){
//            this.unPassForm.submitId = item.id;
//            this.unPassForm.unPassResult = '';
//            this.unPassForm.unPassVisible = true;
//        },  //不通过原因

        doIsPassFuc(){
            var that = this;
            var postData = {
                id: this.auditForm.id,
                content:this.auditForm.unPassMes,
                result:this.auditForm.result,
            };
            AuditApi.updateResult(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                if(result.data=='已经有人审核过了'){
                    Message.error("已经有人抢先审核了此申请");
                }else{
                    Message({
                        type: 'success',
                        message: '审核成功!'
                    });
                    that.auditForm.auditVisible=false;
                    that.auditForm.unPassMes='';
                    var postData = {
                        type: that.searchForm.type,
                        state: that.searchForm.status,
                        result: that.searchForm.result,
                        page: that.tableForm.pageNum,
                        size: that.tableForm.pageSize
                    };
                    AuditApi.searchAudit(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.tableForm=result.data;
                    }).catch(error => {
                        console.log('searchAudit_error');
                    });
                }
            }).catch(error => {
                console.log('updateResult_error');
            });
        },
        doPass(){
            this.auditForm.result='1';
            this.doIsPassFuc();
        },
        doUnPass(){
            if(this.auditForm.unPassMes==''){
                Message.error("请填写未通过审核原因");
            }else{
                this.auditForm.result='0';
                this.doIsPassFuc();
            }

        },

        typeFormatter(row){
            var val = row.type;
            if(val=='1'){
                return '特殊房源';
            }else if(val=='2'){
                return '优质房源';
            }else if(val=='3'){
                return '无效房源';
            }else if(val=='4'){
                return '实勘图片';
            }else if(val=='5'){
                return '无效客源';
            }else if(val=='6'){
                return '取消特殊房源';
            }else if(val=='7'){
                return '取消优质房源';
            }else if(val=='8'){
                return '取消无效房源';
            }else if(val=='9'){
                return '取消无效客源';
            }else if(val=='10'){
                return '成交业绩审核';
            }
        },

        typeFormatterFuc(val){
            if(val=='1'){
                return '特殊房源审核申请';
            }else if(val=='2'){
                return '优质房源审核申请';
            }else if(val=='3'){
                return '无效房源审核申请';
            }else if(val=='4'){
                return '实勘图片审核申请';
            }else if(val=='5'){
                return '无效客源审核申请';
            }else if(val=='6'){
                return '取消特殊房源审核申请';
            }else if(val=='7'){
                return '取消优质房源审核申请';
            }else if(val=='8'){
                return '取消无效房源审核申请';
            }else if(val=='9'){
                return '取消无效客源审核申请';
            }else if(val=='10'){
                return '成交业绩审核审核申请';
            }
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
        background: #fff;
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
        .table-template1{
            margin: 20px;
            /*box-shadow: 0px 0px 10px #e3e3e3;*/
            min-height: 100px;
        }
        .table-pagination1{
            padding: 0 20px 20px;
            text-align: right;
        }
        .el-dialog{

            .audit-dialog-template{
                .auditContent{
                    margin-left:36px;
                    a{
                        color: #c51010;
                    }

                }
                .el-form{
                    .el-form-item{
                        img{
                            width: 180px;
                            height: 140px;
                            margin-left: 10px;
                        }
                    }
                }
            }
            .btn-footer{
                overflow: hidden;

                .btn-pass{
                    margin-top:10px;
                    float: right;
                }
                .btn-unpass{
                    margin-top:10px;
                    margin-left:10px;
                    float: right;
                }
            }
        }
    }
}
</style>
