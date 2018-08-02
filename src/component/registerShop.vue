<template>
    <section class="registerShop">
        <el-row class="register-template" :gutter="0">
            <el-col class="register-content" :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>门店注册</span>
                    </div>
                    <el-form label-position="left"
                             label-width="100px"
                             :model="addRegister.registerForm"
                             :rules="addRegister.ruleForm"
                             ref="registerForm">

                        <el-form-item label="门店名称:" prop="username">
                            <el-input v-model="addRegister.registerForm.username"  placeholder="门店名称（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="门店地址:" prop="relname" >
                            <el-input v-model="addRegister.registerForm.relname" placeholder="门店地址（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="门店范围:" prop="roleId">
                            <el-select v-model="addRegister.registerForm.roleId" multiple placeholder="请选择范围（必填）">
                                <el-option
                                        v-for="item in addRegister.roleList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="register-button">
                        <el-button style="margin-right: 10px" @click="resetForm('registerForm')">重置</el-button>
                        <el-button type="primary" @click="submitForm('registerForm')">确定</el-button>
                    </div>
                </el-card>

            </el-col>
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
                          id: '1',
                          name: '西岗区门店'
                        }, {
                          id: '2',
                          name: '高新园门店'
                        }, {
                          id: '3',
                          name: '中山区门店'
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
                }
            }
        },
        created(){
            this.doSearch();
        },
        methods:{

            doSearch(){
                var that = this;
                var postData = {

                };
                RegisterApi.storeList(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.addRegister.storesList=result.data;
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

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.addRegister.registerForm.password.trim()==''){
                            that.addRegister.registerForm.password='123456';
                        }
                        var postData = this.addRegister.registerForm;
                        RegisterApi.registerSubmit(postData).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            if(result.data=='0'){
                                Message.error('账号已存在');
                            }else if(result.data=='1'){
                                that.resetForm(formName);
                                Message({message: '注册用户成功!', type: 'success'});
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

<style lang="less" >
    @import "../assets/css/element.less";
    .registerShop {
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
                        max-width: 620px;
                        margin: auto;
                        .el-input{
                            width: 520px;
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
