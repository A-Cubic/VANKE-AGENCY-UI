<template>
    <section class="passengerOrigin">
        <div class="passenger_template">
            <el-menu
                    :default-active="menuActive"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelectMenu"
                    background-color="#FFFAFA"
                    style="margin-top: -25px">
                <el-menu-item index="1" style="margin-left:40%;"><el-button :type="menuActive=='1'?'primary':''">买卖</el-button></el-menu-item>
                <el-menu-item index="2" style="margin-left:40px;"><el-button :type="menuActive=='2'?'primary':''">租赁</el-button></el-menu-item>
            </el-menu>
            <div style="margin-top: 20px">
               客源搜索条件
            </div>
            <div class="passenger_search" style="margin-top: 20px">
                <div class="passenger_search_header">
                    <el-input
                            :placeholder="formData.search_type=='1'?'请输入客户姓名搜索客源':'请输入经纪人全名或后6位编号'"
                            v-model="formData.searchText" style="width: 400px;"  size="large" @keyup.enter.native="search">
                        <el-select v-model="formData.search_type" slot="prepend" v-show="role=='ROLE_MANAGER'?true:false" >
                            <el-option label="客户" value="1"></el-option>
                            <el-option label="经纪人" value="2"></el-option>
                        </el-select>
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
                    </el-input>
                    <!--<el-input size="medium" v-model="formData.searchText" placeholder="请输入内容"></el-input>-->
                    <!--<el-button size="medium" type="primary" icon="el-icon-search" @click="search">搜索</el-button>-->
                    <el-button type="primary" icon="el-icon-plus" class="add_button" @click="alertAdd.visible=true" round>新增客源</el-button>
                </div>
                <div class="passenger_search_block">
                    <el-form :model="formData" ref="formData" class="form-wrap">
                        <el-form-item label="范围:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.isShareList"
                                       @click="searchIsShare(index, formData.isShareList)">
                                <span>{{ item.name }}</span>
                                <!-- <span v-show="index != 0">({{ item.number }})</span> -->
                            </el-button>
                        </el-form-item>
                        <!--<el-form-item label="类型:">-->
                            <!--<el-button :type="item.choosed == false ? '' : 'primary'"-->
                                       <!--size="mini"-->
                                       <!--v-for="(item, index) in formData.typeList"-->
                                       <!--@click="searchType(index, formData.typeList)">-->
                                <!--<span>{{ item.name }}</span>-->
                                <!--&lt;!&ndash; <span v-show="index != 0">({{ item.number }})</span> &ndash;&gt;-->
                            <!--</el-button>-->
                        <!--</el-form-item>-->

                        <el-form-item label="星级:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.guestgradeList"
                                       @click="searchGuestgrade(index, formData.guestgradeList)">
                                <span>{{ item.name }}</span>
                                <!-- <span v-show="index != 0">({{ item.number }})</span> -->
                            </el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
            <div style="margin-top: 20px">
                客源列表
            </div>

            <div class="passenger_table">
                <el-table :data="tableData.list" size="medium" style="width: 100%" @row-click="examineById" v-loading="loading">
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
                </el-table>
                <div class="table-pagination">
                    <el-pagination
                            layout="prev, pager, next, jumper, total"
                            :page-size="tableData.pageSize"
                            :current-page.sync="tableData.pageNum"
                            :total ="tableData.total"
                            @current-change="handleCurrentChangeSearch">
                    </el-pagination>
                </div>
            </div>

        </div>
        <el-dialog
          title="新增客源"
          :visible.sync="alertAdd.visible"
          width="80%">

            <el-form :model="alertAdd.ruleForm"
                     :rules="alertAdd.rules"
                     label-position="left"
                     ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size: 18px;">基本信息</span>
                    </div>
                    <div class="text item">
                        <el-row type="flex" class="row-bg" :gutter="20">
                            <el-col :span="1"></el-col>
                            <el-col :span="10">
                                <el-form-item label="姓名" prop="guestname">
                                    <el-input v-model="alertAdd.ruleForm.guestname" placeholder="客户姓名（必填）"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="性别" prop="sex">
                                    <el-select v-model="alertAdd.ruleForm.sex" style="width: 100%;" placeholder="请选择性别（必填）">
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3"></el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" :gutter="20">
                            <el-col :span="1"></el-col>
                            <el-col :span="10">
                                <el-form-item label="联系电话" prop="phone">
                                    <el-input v-model="alertAdd.ruleForm.phone" placeholder="联系电话（必填）"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="备用电话" prop="phonetow">
                                    <el-input v-model="alertAdd.ruleForm.phonetow" placeholder="备用电话"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3"></el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg" :gutter="20">
                            <el-col :span="1"></el-col>
                            <el-col :span="10">
                                <el-form-item label="星级" prop="guestgrade">
                                    <el-select v-model="alertAdd.ruleForm.guestgrade" style="width: 100%;" placeholder="请选择星级（必填）">
                                        <el-option label="A" value="A"></el-option>
                                        <el-option label="B" value="B"></el-option>
                                        <el-option label="C" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="用户标签" prop="label">
                                    <el-input v-model="alertAdd.ruleForm.label" placeholder="自定义用户标签"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3"></el-col>
                        </el-row>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-top: 30px">
                    <div slot="header" class="clearfix" >
                        <span style="font-size: 18px;">需求意向</span>
                    </div>
                    <div  class="text item">
                        <!--<el-row type="flex" class="row-bg" :gutter="20">-->
                            <!--<el-col :span="1"></el-col>-->
                            <!--<el-col :span="10">-->
                                <!--<el-form-item label="房屋类型" prop="type">-->
                                    <!--<el-select v-model="alertAdd.ruleForm.type" style="width: 100%;" placeholder="请选择类型（必填）">-->
                                        <!--<el-option label="买卖" value="0"></el-option>-->
                                        <!--<el-option label="租赁" value="1"></el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :span="3"></el-col>-->
                        <!--</el-row>-->
                        <el-row type="flex" class="row-bg" :gutter="20">
                            <el-col :span="1"></el-col>
                            <el-col :span="6">
                                <el-form-item label="心里价位" prop="heartprice" >
                                    <el-input v-model="alertAdd.ruleForm.heartprice" placeholder="心里价位"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="目的用途" prop="purpose">
                                    <el-input v-model="alertAdd.ruleForm.purpose" placeholder="自己住或门头店面等"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="期望面积" prop="areas">
                                    <el-input v-model="alertAdd.ruleForm.areas" placeholder="面积"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="text-align: center; line-height: 40px">
                                m2
                            </el-col>
                            <el-col :span="3"></el-col>
                        </el-row>

                        <el-row type="flex" class="row-bg" :gutter="20">
                            <el-col :span="1" >
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="户型" prop="huxingshi">
                                    <el-input v-model="alertAdd.ruleForm.huxingshi"  placeholder="几室"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="室" label-width="40px" prop="huxingting">
                                    <el-input v-model="alertAdd.ruleForm.huxingting" placeholder="几厅"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="厅" label-width="40px" prop="huxingchu">
                                    <el-input v-model="alertAdd.ruleForm.huxingchu"  placeholder="几厨"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="厨" label-width="40px" prop="huxingwei">
                                    <el-input v-model="alertAdd.ruleForm.huxingwei" placeholder="几卫"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="text-align: center; line-height: 40px">
                                卫
                            </el-col>
                            <el-col :span="3" >
                            </el-col>
                        </el-row>

                        <el-row type="flex" class="row-bg" :gutter="20">
                            <el-col :span="1"></el-col>
                            <el-col :span="20">
                                <el-form-item label="位置" prop="position">
                                    <el-input v-model="alertAdd.ruleForm.position"  placeholder="房屋大致的区域位置"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3"></el-col>
                        </el-row>

                        <el-row type="flex" class="row-bg" :gutter="20">
                            <el-col :span="1"></el-col>
                            <el-col :span="20">
                                <el-form-item label="备注" prop="remarks">
                                    <el-input
                                            type="textarea"
                                            :rows="8"
                                            :autosize="{ minRows: 6, maxRows: 8}"
                                            placeholder="备注信息"
                                            v-model.trim="alertAdd.ruleForm.remarks">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3"></el-col>
                        </el-row>
                    </div>
                </el-card>


            </el-form>
            <!-- <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="11">aaa</el-col>
              <el-col :span="11">ss</el-col>
            </el-row> -->



          <span slot="footer" class="dialog-footer">
            <el-button @click="alertAdd.visible = false;resetForm('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="submitAdd('ruleForm')">确 定 </el-button>
          </span>
        </el-dialog>
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
        data() {
            return {
                loading:false,
                role:'',
                menuActive:'1',
                formData :{
                    searchText: '',
                    search_type:'1',
                    isShare:0,
                    isShareList:[
                        {
                            name: '不限',
                            id: 0,
                            choosed: true,
                        },{
                            name: '共享池',
                            id: 1,
                            choosed: false,
                        },
                        {
                            name: '无效池',
                            id: 2,
                            choosed: false,
                        },
                    ],
                    type:0,
                    typeList:[
                        {
                            name: '买卖',
                            id: 0,
                            choosed: true,
                        },{
                            name: '租赁',
                            id: 1,
                            choosed: false,
                        },
                    ],
                    guestgrade:'',
                    guestgradeList:[
                        {
                            name: '不限',
                            id: '',
                            choosed: true,
                        },{
                            name: '一星',
                            id: 'C',
                            choosed: false,
                        },{
                            name: '二星',
                            id: 'B',
                            choosed: false,
                        },{
                            name: '三星',
                            id: 'A',
                            choosed: false,
                        },
                    ],
                },
                tableData: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                    list: [
                        {
                            id: '',
                            number: '',
                            casetype: '',
                            collaboratorType: '',
                            type: '',
                            heartprice: '',
                            guestname: '',
                            phone: '',
                            guestgrade: '',
                            remarks: '',
                            areas: '',
                            huxing: '',
                            huxingshi: '',
                            huxingting: '',
                            huxingwei: '',
                            huxingchu: '',
                            position: '',
                            purpose: '',
                            label: '',
                            iskey: '',
                            isshare: '',
                            recordRelName: '',
                            createRelName: '',
                            createTime: '',
                            recordTime: '',
                        }
                    ]
                },
                alertAdd:{
                    visible:false,
                    ruleForm: {
                        guestname: "",  //客源姓名
                        sex: "",  //客源性别
                        guestgrade: "",  //客源星级(A,B,C)
                        type: "0",  //客源类型(0:买,1:租)
                        heartprice: "",  //心里价位
                        phone: "",  //联系电话
                        phonetow: "",//备用电话
                        remarks: "",  //备注简介
                        areas: "",  //需求面积
                        position: "",//位置
                        huxingshi: "",  //需求几室
                        huxingting: "",  //需求几厅
                        huxingwei: "",  //需求几卫
                        huxingchu: "",  //需求几厨
                        purpose: "",  //目的用途
                        label: "",  //自定义标签
                    },
                    rules: {
                        guestname: [
                          { required: true, message: '请输入客源姓名', trigger: 'blur' },
                        ],
                        sex: [
                          { required: true, message: '请输入客源性别', trigger: 'blur' },
                        ],
                        guestgrade: [
                          { required: true, message: '请选择客源星级', trigger: 'change' },
                        ],
                        type: [
                          { required: true, message: '请选择客源类型', trigger: 'change' },
                        ],
                        phone: [
                          { required: true, message: '请输入客源电话', trigger: 'blur' },
                        ],
                    },
                }
            };
        },
        created(){
            this.role = this.getRole();
            this.doSearch();
        },

        methods: {
            getRole(){
                return getRole();
            },
            handleSelectMenu(key, keyPath) {
                if (this.$refs['ruleForm']!==undefined) {
                    this.$refs['ruleForm'].resetFields();
                }
                this.menuActive=key;
                if(this.menuActive=='1'){
                    this.searchType(0, this.formData.typeList);
                    this.alertAdd.ruleForm.type='0';
                }else{
                    this.searchType(1, this.formData.typeList);
                    this.alertAdd.ruleForm.type='1';
                }
            },
            doSearch(){
                var that = this;
                that.loading=true;
                var postData = {
                    isShare: this.formData.isShare,
                    guestname: this.formData.searchText,
                    guestgrade: this.formData.guestgrade,
                    type: this.formData.type,
                    search_type: this.formData.search_type,
                    page: this.tableData.pageNum,
                    size: 10
                };
                GuestApi.searchGuest(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.tableData=result.data;
                    that.loading=false;
                }).catch(error => {
                    console.log('searchGuest_error');
                });
            },
            search(){
                this.tableData.pageNum = 1;
                this.doSearch();
            },  //搜索

            handleCurrentChangeSearch(val){
                this.tableData.pageNum = val;
                this.doSearch();
            },
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
                                // console.log(result);
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
            getId(index, list){
                var id;
                list.forEach((item) => {
                    item.choosed = false;
                });
                list[index].choosed = true;
                id = list[index].id;
                return id;
            },

            //范围
            searchIsShare(index, list){
               var id = this.getId(index, list);
               this.formData.isShare = id;
               this.search();
            },
            // 类型
            searchType(index, list){
                var id = this.getId(index, list);
                this.formData.type = id;
                this.formData.isShare=0;
                this.formData.guestgrade=0;
                this.formData.isShareList.forEach((item) => {
                    item.choosed = false;
                    if(this.formData.isShareList.indexOf(item) == 0){
                        item.choosed = true;
                    };
                });
                this.formData.guestgradeList.forEach((item) => {
                    item.choosed = false;
                    if(this.formData.guestgradeList.indexOf(item) == 0){
                        item.choosed = true;
                    };
                });
                this.search();
            },
            //星级
            searchGuestgrade(index, list){
                var id = this.getId(index, list);
                this.formData.guestgrade = id;
                this.search();
            },

            examineById(row){
                let routeData = this.$router.resolve({ path: '/admin/passengerDetails/'+row.id});
                window.open(routeData.href, '_blank');
            },

        }
    };
</script>
<style lang="less">
    @import "../assets/css/element.less";
    .passengerOrigin {
        /*border:1px solid red;*/
        .passenger_template{
            width: 100%;
            padding: 25px 50px;
            background: #fff;
            .passenger_search{
                padding: 20px;
                box-shadow: 0px 0px 10px #e3e3e3;
                // border: 1px solid #d7d7d7;
                .passenger_search_header{
                    position: relative;

                    .el-input{
                        width: 100px;
                    }
                    .add_button{
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right: 0px;
                        margin: auto;
                    }
                }
                .passenger_search_block{
                    .form-wrap{
                        margin-top: 15px;
                        .el-form-item{
                            margin: 0;
                            padding: 0;
                            .el-button{
                                /*margin-left: 10px;*/
                                border: none;
                            }

                        }
                    }
                }

            }

            .passenger_table{
                margin-top: 20px;
                padding: 20px;
                box-shadow: 0px 0px 10px #e3e3e3;
                // border: 1px solid #d7d7d7;
                .el-table{
                    /*border: 1px solid #d7d7d7;*/

                }
                .table-pagination{
                    margin-top: 20px;
                    text-align: right;
                }
            }
        }


    }
</style>
