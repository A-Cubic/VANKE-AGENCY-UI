<template>
    <section class="register">
        <el-row class="register-template" :gutter="0">
            <el-col class="register-content" :span="24">
                <div class="search-header">
                    <span>门店: </span>
                    <el-select v-model="searchForm.storeId" placeholder="请选择门店">
                        <el-option
                                v-for="item in storeList"
                                :key="item.id"
                                :label="item.storeName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <!--<span>账号: </span>-->
                    <el-input placeholder="请输入用户全名或后6位编号" v-model="searchForm.searchText" style="width: 400px;"  size="large" >
                    </el-input>
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addUserPop">新用户注册</el-button>
                </div>
                <div class="table-template">
                    <el-table :data="resultData.list" >
                        <el-table-column fixed label="用户照片" width="150">
                            <template scope="scope">
                                <img class="imageUrl" :src="scope.row.avatar" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" label="注册账号"></el-table-column>
                        <el-table-column prop="relname" label="用户名称"></el-table-column>
                        <el-table-column prop="user_no" label="用户编号"></el-table-column>
                        <el-table-column prop="store_name" label="所在门店"></el-table-column>
                        <el-table-column prop="register_time" label="注册日期"></el-table-column>
                        <el-table-column prop="sign"
                                         label="账号状态">
                            <template slot-scope="scope">
                                <el-tag
                                        :type="scope.row.sign == '0' ? 'primary' : 'success'"
                                        disable-transitions>{{scope.row.sign== '0'?'冻结':'正常'}}</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini" type="success" v-show="scope.row.sign == '0'?true:false" @click="setFrozenOrNormal(scope.row,'1')">解冻</el-button>
                                <el-button size="mini" type="danger" v-show="scope.row.sign == '1'?true:false" @click="setFrozenOrNormal(scope.row,'0')">冻结</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table-pagination">
                    <el-pagination
                            layout="prev, pager, next, jumper, total"
                            :page-size="resultData.pageSize"
                            :current-page.sync="resultData.pageNum"
                            :total ="resultData.total"
                            @current-change="handleCurrentChangeSearch">
                    </el-pagination>
                </div>
            </el-col>

                <el-dialog title="账号注册" :visible.sync="addUserVisible" width="50%">

                    <el-form label-position="left"
                             label-width="100px"
                             :model="addRegister.registerForm"
                             :rules="addRegister.ruleForm"
                             ref="registerForm">

                        <el-form-item label="注册账号:" prop="username">
                            <el-input v-model="addRegister.registerForm.username"  placeholder="注册账号（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="账号密码:" prop="password">
                            <el-input v-model.trim="addRegister.registerForm.password" maxlength="15" minlength="6" placeholder="6~15位（不填默认123456）"></el-input>
                        </el-form-item>
                        <el-form-item label="真实姓名:" prop="relname" >
                            <el-input v-model="addRegister.registerForm.relname" placeholder="真实姓名（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话:" prop="phone">
                            <el-input v-model="addRegister.registerForm.phone" placeholder="手机号码"></el-input>
                        </el-form-item>
                        <el-form-item label="角色:" prop="roleId">
                            <el-select v-model="addRegister.registerForm.roleId" placeholder="请选择角色（必填）">
                                <el-option
                                        v-for="item in addRegister.roleList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="门店:" prop="store_id">
                            <el-select v-model="addRegister.registerForm.store_id" placeholder="请选择门店（必填）">
                                <el-option
                                        v-for="item in addRegister.storesList"
                                        :key="item.id"
                                        :label="item.storeName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button style="margin-right: 10px" @click="resetForm('registerForm');addUserVisible=false">取 消</el-button>
                        <el-button type="primary" @click="submitForm('registerForm')">确 定</el-button>
                    </span>

                </el-dialog>





        </el-row>
    </section>

</template>

<script>
    import RegisterApi from '../api/api_register.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
    export default {
        install(Vue) {
            Vue.prototype.$message = Message
        },
        name: "register",
        data(){
            return{
                addUserVisible:false,
                searchForm:{
                    searchText:'',
                    storeId:'',
                },
                storeList: [
                    {
                        id: '',
                        storeName: '',
                    }
                ],
                addRegister:{
                    registerForm:{
                        relname: '',
                        phone: '',
                        username: '',
                        password: '',
                        roleId: '',
                        store_id: '',
                    },
                    roleList: [
                        {
                            id: '',
                            name: '',
                        }
                    ],
                    storesList: [
                        {
                            id: '',
                            storeName: '',
                        }
                    ],
                    ruleForm: {
                        relname: [
                            { required: true, message: '请输入真实姓名', trigger: 'blur' },
                        ],
                        username: [
                            { required: true, message: '请输入注册账号', trigger: 'blur' },
                        ],
                        roleId: [
                            { required: true, message: '请选择角色', trigger: 'change' }
                        ],
                        store_id: [
                            { required: true, message: '请选择门店', trigger: 'change' }
                        ],
                        password: [
                            { min: 6, max: 15, message: '密码长度6-15位', trigger: 'blur' }
                        ],
                    }
                },
                resultData:{
                    list: [

                    ],
                    pageSize: 10,
                    total: 0,
                    pageNum: 1,
                },
            }
        },
        created(){
            this.doSearch();
        },
        methods:{
            setFrozenOrNormal(row,sign){
                var that = this;
                var postData = {
                    id:row.id,
                    sign:sign,
                };
                RegisterApi.setFrozenOrNormal(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    if(result.data=='1'){
                        if(sign=='1'){
                            Message({message: '解冻成功!', type: 'success'});
                        }else{
                            Message({message: '冻结成功!', type: 'success'});
                        }
                    }else{
                        Message.error("操作失败");
                    }
                    that.doSearchUser();
                }).catch(error => {
                    console.log('setFrozenOrNormal_error');
                });
            },
            handleCurrentChangeSearch(val){
                this.resultData.pageNum = val;
                this.doSearchUser();
            },
            search(){
                this.resultData.pageNum=1;
                this.doSearchUser();
            },
            doSearchUser(){
                var that = this;
                var postData = {
                    searchText:this.searchForm.searchText,
                    storeId:this.searchForm.storeId,
                    page: this.resultData.pageNum,
                    size: this.resultData.pageSize
                };
                RegisterApi.userList(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.resultData=result.data;
                }).catch(error => {
                    console.log('userList_error');
                });
            },
            addUserPop(){
                this.addUserVisible=true;
            },
            doSearch(){
                var that = this;
                var postData = {

                };
                RegisterApi.storeList(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.addRegister.storesList=result.data;
                    that.storeList=result.data;
                    that.searchForm.storeId=that.storeList[0].id;
                    that.doSearchUser();
                }).catch(error => {
                    console.log('storeList_error');
                });

                RegisterApi.roleList(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.addRegister.roleList=result.data;
                }).catch(error => {
                    console.log('roleList_error');
                });
            },

            submitForm(formName) {
                var that = this;
                if(this.addRegister.registerForm.password.trim()==''){
                    that.addRegister.registerForm.password=='123456';
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        var postData = this.addRegister.registerForm;
                        RegisterApi.registerSubmit(postData).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            if(result.data=='0'){
                                Message.error('账号已存在');
                            }else if(result.data=='1'){
                                that.resetForm(formName);
                                Message({message: '注册用户成功!', type: 'success'});
                                that.search();
                                that.addUserVisible=false;
                            }else {
                                Message.error('注册失败！');
                            }

                        }).catch(error => {
                            console.log('registerSubmit_error');
                        });

                    } else {
                        Message.error('请填写完整信息!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style lang="less">
    @import "../assets/css/element.less";
    .imageUrl{
        height: 100px;
        width: 100px;
    }
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
    .register {
        .register-template{
            width: 100%;
            padding: 25px 50px;
            background: #fff;
            .register-content{
                min-height: 200px;
                box-shadow: 0px 0px 10px #e3e3e3;
                .el-card{
                    border: none;
                    box-shadow: none;
                    /*.clearfix{*/
                        /*span{*/
                            /*font-size: 16px;*/
                        /*}*/

                    /*}*/
                    .el-form{
                        max-width: 320px;
                        margin: auto;
                        .el-input{
                            width: 220px;
                        }
                    }
                    .register-button{
                        text-align: right;
                        margin-top: 20px;
                    }
                }
            }
        }
    }

</style>
