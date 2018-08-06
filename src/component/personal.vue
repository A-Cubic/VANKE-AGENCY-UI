<template>
    <section class="personal">
        <div class="personal-template">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-tabs type="border-card">
                            <el-tab-pane label="基本信息">
                                <div class="person-avatar">
                                    <el-upload
                                            class="avatar-uploader"
                                            action=""
                                            :show-file-list="false"
                                            :on-success="handleSuccess"
                                            :on-error="handleError"
                                            :before-upload="beforeAvatarUpload"
                                            :http-request="uploadAvatar">
                                        <img v-if="form.avatar" :src="form.avatar" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                    <el-button size="mini" type="text" @click="passHandle">
                                        修改密码
                                    </el-button>
                                </div>
                                <div class="person-form">
                                    <el-form :model="form" status-icon ref="form" label-width="120px" class="demo-ruleForm">
                                        <el-form-item label="账号:">{{form.username}}</el-form-item>
                                        <el-form-item label="工号:">{{form.user_no}}</el-form-item>
                                        <el-form-item label="姓名:">{{form.relname}}
                                            <el-button type="text" size="mini" @click="nameHandle">修改</el-button>
                                        </el-form-item>
                                        <el-form-item label="电话:">{{form.phone}}
                                            <el-button type="text" size="mini" @click="phoneHandle">修改</el-button>
                                        </el-form-item>
                                        <el-form-item label="门店:">{{form.store_name}}</el-form-item>
                                        <el-form-item label="角色:">{{form.desc}}</el-form-item>
                                        <el-form-item label="注册:">{{form.register_time}}</el-form-item>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我维护的房源">

                                <div class="house_table">
                                    <el-table :data="maintainData.list"  size="medium" style="width: 100%" @row-click="examineById">
                                        <el-table-column fixed label="标题图" width="180">
                                            <template scope="scope">
                                                <img class="imageUrl" :src="scope.row.titleimg" alt="">
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="xiaoquName" label="楼盘名称" width="180"></el-table-column>
                                        <el-table-column prop="huxing" label="户型"></el-table-column>
                                        <el-table-column prop="areas" label="面积"></el-table-column>
                                        <el-table-column prop="price" label="价格"></el-table-column>
                                        <el-table-column prop="floor" label="楼层"></el-table-column>
                                        <el-table-column prop="chaoxiang" label="朝向"></el-table-column>
                                        <el-table-column prop="recordrelName" label="维护人"></el-table-column>
                                    </el-table>
                                    <div class="table-pagination">
                                        <el-pagination
                                        layout="prev, pager, next, jumper, total"
                                        :page-size="maintainData.pageSize"
                                        :current-page.sync="maintainData.pageNum"
                                        :total ="maintainData.total"
                                        @current-change="handleCurrentChangeSearch1">
                                        </el-pagination>
                                    </div>
                                </div>

                            </el-tab-pane>
                            <el-tab-pane label="我关注的房源">
                                <div class="house_table">
                                    <el-table :data="attentionData.list"  size="medium" style="width: 100%" @row-click="examineById">
                                        <el-table-column fixed label="标题图" width="180">
                                            <template scope="scope">
                                                <img class="imageUrl" :src="scope.row.titleimg" alt="">
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="xiaoquName" label="楼盘名称" width="180"></el-table-column>
                                        <el-table-column prop="huxing" label="户型"></el-table-column>
                                        <el-table-column prop="areas" label="面积"></el-table-column>
                                        <el-table-column prop="price" label="价格"></el-table-column>
                                        <el-table-column prop="floor" label="楼层"></el-table-column>
                                        <el-table-column prop="chaoxiang" label="朝向"></el-table-column>
                                        <el-table-column prop="recordrelName" label="维护人"></el-table-column>
                                    </el-table>
                                    <div class="table-pagination">
                                        <el-pagination
                                        layout="prev, pager, next, jumper, total"
                                        :page-size="attentionData.pageSize"
                                        :current-page.sync="attentionData.pageNum"
                                        :total ="attentionData.total"
                                        @current-change="handleCurrentChangeSearch2">
                                        </el-pagination>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>

            <el-dialog title="修改密码" :visible.sync="dialogVisible" width="40%">
                <el-form :model="updateData" ref="updateData" status-icon :rules="rules2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="当前密码" prop="passwordOld">
                        <el-input type="password" v-model="updateData.passwordOld" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="passwordNew">
                        <el-input type="password" v-model="updateData.passwordNew" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="passwordCom">
                        <el-input type="password" v-model="updateData.passwordCom" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('updateData')">提 交</el-button>
                </span>
            </el-dialog>

            <el-dialog title="修改姓名" :visible.sync="nameVisible" width="30%">
                <el-input v-model="updateData.name"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="nameVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateName">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="修改电话" :visible.sync="phoneVisible" width="30%">
                <el-input v-model="updateData.phone"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="phoneVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePhone">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </section>
</template>
<script>
import PersonalApi from '../api/api_personal.js';
import Vue from 'vue';
import { Message } from 'element-ui';

export default {
    install(Vue) {
        Vue.prototype.$message = Message
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.updateData.passwordCom !== '') {
                    this.$refs.updateData.validateField('passwordCom');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.updateData.passwordNew) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            uploadData: {},
            imgBase64:'',
            updateData:{
                phone:'',
                name:'',
                passwordOld:'',
                passwordNew:'',
                passwordCom:'',
            },
            rules2: {
                passwordNew: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwordCom: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                // passwordOld: [
                //     { validator: checkAge, trigger: 'blur' }
                // ]
            },
            form:{
                relname: '',
                user_no: '',
                phone: '',
                register_time:'',
                avatar:'',
                store_name:'',
                username:'',
                desc:''
            },
            maintainData: {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                list: [
                {
                    id: 0,
                    titleimg: '',
                    xiaoquName: '',
                    huxing: '',
                    areas: '',
                    price: '',
                    floor: '',
                    chaoxiang: '',
                    recordrelName: '',
                },
                ],
            },  //我维护的房源 数据

            attentionData: {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                list: [
                {
                    id: 0,
                    titleimg: '',
                    xiaoquName: '',
                    huxing: '',
                    areas: '',
                    price: '',
                    floor: '',
                    chaoxiang: '',
                    recordrelName: ''
                }
                ],
            },   //我关注的房源 数据

            dialogVisible: false,
            nameVisible: false,
            phoneVisible: false,
        };
    },
    mounted:function(){
        var that = this;
        PersonalApi.userinfo().then(function (result) {
            console.log(result)
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.form=result.data;
        }).catch(error => {
            console.log('userinfo_error');
        });

        var postData = {
            page: 1,
            size: 10,
        };
        PersonalApi.myRecordHouseList(postData).then(function (result) {
            console.log(result)
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.maintainData=result.data;
        }).catch(error => {
            console.log('maintainData_error');
        });

        PersonalApi.myLikeHouseList(postData).then(function (result) {
            console.log(result)
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.attentionData=result.data;
        }).catch(error => {
            console.log('attentionData_error');
        });
    },
    methods: {
        examineById(row){
            let routeData = this.$router.resolve({ path: '/admin/houseDetails/'+row.id});
            window.open(routeData.href, '_blank');
        },
        passHandle(){
            this.dialogVisible = true;
        },
        nameHandle(){
            this.nameVisible = true;
        },
        phoneHandle(){
            this.phoneVisible = true;
        },
        updateName(){
            var that = this;
            var uname = this.updateData.name;
            var postData = {
                relname: uname,
            };

            PersonalApi.updateinfo(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.form.relname=uname;
            }).catch(error => {
                console.log(error);
            });
            this.updateData.name = '';
            this.nameVisible = false
        },
        updatePhone(){
            var that = this;
            var uphone = this.updateData.phone;
            var postData = {
                phone: uphone,
            };

            PersonalApi.updateinfo(postData).then(function (result) {
                console.log(result)
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.form.phone=uphone;
            }).catch(error => {
                console.log(error);
            });
            this.updateData.phone = '';
            this.phoneVisible = false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.updatePwd();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        updatePwd(){
            var that = this;
            var upwd = this.updateData.passwordNew;
            var upwdold = this.updateData.passwordOld;
            var postData = {
                password: upwd,
                oldpassword: upwdold
            };


            PersonalApi.updatepwd(postData).then(function (result) {
                console.log(result)
                if(typeof(result) != "object"){ result = JSON.parse(result)}
                var str = result.data;
                if(str=='修改成功'){
                    Message({
                        message: str,
                        type: 'success'
                    });
                    that.dialogVisible = false;
                    that.updateData.passwordNew = '';
                    that.updateData.passwordOld = '';
                    that.updateData.passwordCom = '';
                }else{
                    Message.error(str);
                }
            }).catch(error => {
                console.log(error);
            });
        },

        handleSuccess(response, file, fileList) {
            console.log(response, file, fileList);
        },
        handleError(err, file, fileList) {
            console.log(err, file, fileList);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        uploadAvatar:function(param){
            const that = this;
            var fileObj = param.file;
            var reader = new FileReader();
            reader.readAsDataURL(fileObj);
            reader.onloadend = function(){
                var img64 = this.result;
                var postData = {
                    file: img64
                };
                PersonalApi.uploadAvatar(postData).then(function (result) {
                    if(typeof(result) != "object"){ result = JSON.parse(result)}
                    that.form.avatar = result.data;
                }).catch(error => {
                    console.log(error);
                });

            };
        },

        handleCurrentChangeSearch1(val){
            var that = this;
            this.maintainData.pageNum = val;
            var postData = {
                page: maintainData.pageNum,
                size: 10,
            };
            PersonalApi.myRecordHouseList(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.maintainData=result.data;
            }).catch(error => {
                console.log('maintainData_error');
            })
        },
        handleCurrentChangeSearch2(val){
            var that = this;
            this.attentionData.pageNum = val;
            var postData = {
                page: attentionData.pageNum,
                size: 10,
            };
            PersonalApi.myLikeHouseList(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.attentionData=result.data;
            }).catch(error => {
                console.log('attentionData_error');
            })
        },



    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.personal {
	/*border:1px solid red;*/
    .personal-template {
        width: 100%;
        padding: 25px 50px;
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            .grid-content {
                .el-tabs{
                    min-height: 300px;
                    .el-tab-pane{
                        overflow: hidden;
                        .person-avatar{
                            float: left;
                            text-align: center;
                            margin: 10px 0 0 10px;
                            .img-uploader .el-upload{
                                border: none;
                                width: 100px;
                                height: 100px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 100px;
                                }
                            }
                            .el-button{
                                margin-top: 10px;
                            }

                        }
                        .person-form{
                            float: left;
                            margin-top: 10px;
                            .el-form-item{
                                margin: 0;
                            }
                        }
                        .house_table{
            padding: 20px;
            .el-table{
                .imageUrl{
                    height: 100px;
                    width: 150px;
                }
            }
            .table-pagination{
                margin-top: 20px;
                text-align: right;
            }
        }
                    }


                }
            }
        }
    }
}
</style>
