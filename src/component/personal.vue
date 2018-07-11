<template>
    <section class="personal">
        <div class="personal-template">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-tabs type="border-card">
                            <el-tab-pane label="基本信息">

                                <el-upload
                                        class="img-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        list-type="picture-card"
                                        multiple
                                        :show-file-list="false"
                                        :data="uploadData"
                                        :on-success="handleSuccess"
                                        :on-error="handleError">
                                    <i class="el-icon-plus uploader-icon"></i>
                                </el-upload>

                            </el-tab-pane>
                            <el-tab-pane label="我的房源">我的房源</el-tab-pane>
                            <el-tab-pane label="我的客源">我的客源</el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            uploadData: {},
        };
    },
    methods: {
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
                    border: none;
                    .img-uploader .el-upload{
                        border-radius: 100px;
                        width: 150px;
                        height: 150px;
                        .uploader-icon {
                            font-size: 40px;
                            color: #8c939d;
                            text-align: center;
                            line-height: 150px;

                        }
                    }
                }
            }
        }
    }
}
</style>
