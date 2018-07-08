<template>
    <section class="house-details">
        <div class="house-template">
            这条信息的id是{{id}}
            <el-row :gutter="25">

                <el-col :span="16">
                    <div class="grid-content">

                        <div class="grid-content-graphic">
                            <div class="img-big">
                                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2714851461,2662863538&fm=27&gp=0.jpg" alt="">
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

            };
        },

        computed: {
        },
        filter:{
        },
        methods: {

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
                        .img-big{
                            width: 45%;
                            height: 35vh;
                            float: left;
                            img{
                                width: 100%;
                                height: 100%;
                                padding-right: 10px;
                            }
                        }
                        .mes-wrap{
                            width: 55%;
                            float: left;
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
