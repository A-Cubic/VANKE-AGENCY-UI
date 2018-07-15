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
                                        <img src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=997774994,3212421299&fm=85&s=6F5A0FC106032EE77999A51B030080D2" alt="">
                                    </el-upload>
                                    <el-button size="mini" type="text" @click="passHandle">
                                        修改密码
                                    </el-button>
                                </div>
                                <div class="person-form">
                                    <el-form :model="form" status-icon ref="form" label-width="120px" class="demo-ruleForm">
                                        <el-form-item label="姓名:">{{form.user_name}}</el-form-item>
                                        <el-form-item label="工号:">{{form.number}}</el-form-item>
                                        <el-form-item label="电话:">{{form.phone}}</el-form-item>
                                        <el-form-item label="电话:">{{form.phone}}</el-form-item>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的房源">我的房源</el-tab-pane>
                            <el-tab-pane label="我的客源">我的客源</el-tab-pane>
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
export default {
    data() {
        return {
            uploadData: {},
            form:{
                user_name: '李白',
                number: '12306',
                phone: '13099997788',


            },

            dialogVisible: false,
        };
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
