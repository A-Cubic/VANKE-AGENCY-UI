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
                                            class="img-uploader"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card"
                                            multiple
                                            :show-file-list="false"
                                            :data="uploadData"
                                            :on-success="handleSuccess"
                                            :on-error="handleError">
                                        <img v-bind:src="form.avatar" alt="">
                                    </el-upload>
                                    <el-button size="mini" type="text" @click="passHandle">
                                        修改密码
                                    </el-button>
                                </div>
                                <div class="person-form">
                                    <el-form :model="form" status-icon ref="form" label-width="120px" class="demo-ruleForm">
                                        <el-form-item label="账号:">{{form.username}}</el-form-item>
                                        <el-form-item label="工号:">{{form.user_no}}</el-form-item>
                                        <el-form-item label="姓名:">{{form.relname}}</el-form-item>
                                        <el-form-item label="电话:">{{form.phone}}</el-form-item>
                                        <el-form-item label="门店:">{{form.store_name}}</el-form-item>
                                        <el-form-item label="角色:">{{form.desc}}</el-form-item>
                                        <el-form-item label="注册:">{{form.register_time}}</el-form-item>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我维护的房源">我维护的房源</el-tab-pane>
                            <el-tab-pane label="我关注的客源">我关注的客源</el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>

            <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
                <span>修改密码</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </section>
</template>
<script>
import PersonalApi from '../api/api_personal.js';
export default {
    data() {
        return {
            uploadData: {},
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

            dialogVisible: false,
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

    },
    methods: {
        passHandle(){
            this.dialogVisible = true;
        },

        handleSuccess(response, file, fileList) {
            console.log(response, file, fileList);
        },
        handleError(err, file, fileList) {
            console.log(err, file, fileList);
        }
    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";

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
                    }


                }
            }
        }
    }
}
</style>
