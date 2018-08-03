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
                             :model="registerForm"
                             :rules="ruleForm"
                             ref="registerForm">

                        <el-form-item label="门店名称:" prop="storeName">
                            <el-input v-model="registerForm.storeName"  placeholder="门店名称（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="门店地址:" prop="storeAdress" >
                            <el-input v-model="registerForm.storeAdress" placeholder="门店地址（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="门店范围:" prop="streetId">
                            <el-tree
                                    :data="regionTree"
                                    node-key="value"
                                    ref="tree"
                                    show-checkbox
                                    accordion
                                    :props="defaultProps"
                                    >
                            </el-tree>
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
    import RegisterShopApi from '../api/api_registerShop.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
    export default {
        install(Vue) {
            Vue.prototype.$message = Message
        },
        name: "register",
        data(){
            return{
                registerForm:{
                    storeName: '',
                    storeAdress: '',
                    streetId: [],
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                regionTree: [

                ],


                ruleForm: {
                    storeName: [
                        { required: true, message: '请输入门店名称', trigger: 'blur' },
                    ],
                    storeAdress: [
                        { required: true, message: '请输入门店地址', trigger: 'blur' },
                    ],
                    streetId: [
                        { required: true, message: '请选择门店覆盖范围', trigger: 'blur' }
                    ]
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
                RegisterShopApi.regionslist(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.regionTree=result.data;
                }).catch(error => {
                    console.log('regionslist_error');
                });
            },

            submitForm(formName) {
                this.registerForm.streetId = this.$refs.tree.getCheckedKeys(true);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var that = this;
                        var postData = that.registerForm;
                        RegisterShopApi.insertStore(postData).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            if(result.data=='0'){
                                Message.error('门店已存在');
                            }else if(result.data=='1'){
                                that.resetForm(formName);
                                Message({message: '门店注册成功!', type: 'success'});
                            }else {
                                Message.error('注册失败！');
                            }

                        }).catch(error => {
                            console.log('insertStore_error');
                        });
                    } else {
                        // Message.error('请填写完整信息!');
                        // return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$refs.tree.setCheckedKeys([]);
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
