<template>
    <section class="register">
        <el-row class="register-template" :gutter="0">
            <el-col class="register-content" :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>账号注册</span>
                    </div>
                    <el-form label-position="left"
                             label-width="100px"
                             :model="addRegister.registerForm"
                             :rules="addRegister.ruleForm"
                             ref="registerForm">
                        <el-form-item label="名称:" prop="name">
                            <el-input v-model="addRegister.registerForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话:" prop="phone">
                            <el-input v-model="addRegister.registerForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="账号:" prop="account">
                            <el-input v-model="addRegister.registerForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="password">
                            <el-input v-model="addRegister.registerForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="角色:" prop="role">
                            <el-select v-model="addRegister.registerForm.role" placeholder="请选择角色">
                                <el-option
                                        v-for="item in addRegister.registerForm.roleList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="门店:" prop="stores">
                            <el-select v-model="addRegister.registerForm.stores" placeholder="请选择门店">
                                <el-option
                                        v-for="item in addRegister.registerForm.storesList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
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
    export default {
        name: "register",
        data(){
            return{
                addRegister:{
                    registerForm:{
                        name: '',
                        phone: '',
                        account: '',
                        password: '',
                        role: '',
                        roleList: [
                            {
                                label: '店长',
                                value: 1,
                            },
                            {
                                label: '副店长',
                                value: 2,
                            },
                            {
                                label: '店员',
                                value: 3,
                            }
                        ],
                        stores: '',
                        storesList: [
                            {
                                label: '西岗店',
                                value: 1,
                            },
                            {
                                label: '中山店',
                                value: 2,
                            },
                            {
                                label: '沙河口店',
                                value: 3,
                            }
                        ]
                    },
                    ruleForm: {
                        name: [
                            { required: true, message: '请输入名称', trigger: 'blur' },
                        ],
                        phone: [
                            { required: true, message: '请输入联系电话', trigger: 'blur' },
                        ],
                        account: [
                            { required: true, message: '请输入账号', trigger: 'blur' },
                        ],
                        password: [
                            { required: true, message: '请输入密码', trigger: 'blur' },
                        ],
                        role: [
                            { required: true, message: '请选择角色', trigger: 'change' }
                        ],
                        stores: [
                            { required: true, message: '请选择门店', trigger: 'change' }
                        ],
                    }
                }
            }
        },

        methods:{
            addRegister(){
                var that = this;
                var postData = {

                };
                that.$message({showClose: true, message: '注册成功!', type: 'success'});
            },
            submitForm(formName) {
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.addRegister();
                    } else {
                        that.$message({showClose: true, message: '请填写完整信息!', type: 'error'});
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
    .register {
        .register-template{
            width: 100%;
            padding: 25px 50px;
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