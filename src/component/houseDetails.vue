<template>
    <section class="house-details">
        <div class="house-template">
            这条信息的id是{{id}}
            <el-row :gutter="25">

                <el-col :span="16">
                    <div class="grid-content">

                        <div class="grid-content-graphic">
                            <div class="upload-big">
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
                                <el-carousel class="carousel-wrap" :interval="5000" type="card" height="130px">
                                    <el-carousel-item v-for="item in carouselList" >
                                        <img :src="item.imgUrl" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="mes-wrap">
                                <div>196万</div>
                                <div>ghjgj</div>
                                <div>kjb</div>
                            </div>
                        </div>


                    </div>
                    <div class="grid-content">
                        <el-card class="box-card" shadow="never">
                            <div slot="header" class="clearfix">
                                <span>看房情况</span>
                                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                            </div>
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                        </el-card>
                    </div>
                    <div class="grid-content">
                        <el-card class="box-card" shadow="never">
                            <div slot="header" class="clearfix">
                                <span>价格相关</span>
                                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                            </div>
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                        </el-card>


                    </div>
                </el-col>


                <el-col :span="8">
                    <div class="grid-content">
                        <el-tabs type="border-card">
                            <el-tab-pane label="维护">维护</el-tab-pane>
                            <el-tab-pane label="修改">修改</el-tab-pane>
                            <el-tab-pane label="带看">带看</el-tab-pane>
                        </el-tabs>

                    </div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>
<script>
    export default {
        name: "house-details",
        props: ['id'],
        data() {
            return {
                uploadData:{},
                carouselList:[
                    {
                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2604583878,933342668&fm=27&gp=0.jpg'
                    },
                    {
                        imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3497046269,138674714&fm=27&gp=0.jpg'
                    },
                    {
                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=621015648,1160215088&fm=27&gp=0.jpg'
                    },
                    {
                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=621015648,1160215088&fm=27&gp=0.jpg'
                    },
                    {
                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=621015648,1160215088&fm=27&gp=0.jpg'
                    }

                ]
            };
        },

        computed: {
        },
        filter:{
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
    .house-details {
        /*border:1px solid red;*/
        .house-template{
            width: 100%;
            padding: 25px 50px;
            .el-row {
                .grid-content {
                    border: 1px solid #d7d7d7;
                    margin-bottom: 20px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .el-card{
                        border: none;
                    }
                    .grid-content-graphic{
                        padding: 10px;
                        overflow: hidden;
                        .upload-big{
                            width: 55%;
                            float: left;
                            .img-uploader .el-upload{
                                cursor: pointer;
                                width: 100%;
                                height: 25vh;
                                .uploader-icon {
                                    font-size: 40px;
                                    color: #8c939d;
                                    width: 100%;
                                    height: 25vh;
                                    line-height: 25vh;
                                }
                            }

                            .carousel-wrap{
                                margin-top: 20px;
                                .el-carousel__item{
                                    /*height: 120px;*/
                                    img{
                                        width: 100%;
                                        height: 100%;
                                    }
                                }

                            }
                        }
                        .mes-wrap{
                            width: 45%;
                            float: left;
                            padding-left: 10px;
                        }

                    }

                    .el-tabs{
                        min-height: 300px;
                        border: none;
                    }
                }
            }
        }
    }
</style>
