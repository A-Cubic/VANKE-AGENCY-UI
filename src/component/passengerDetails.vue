<template>
    <section class="passengerDetails">
        <div class="detail-template">
            这条信息的id是{{id}}
            <el-row :gutter="25">
                <el-col :span="16">
                    <div class="grid-content">

                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-tabs type="border-card">
                            <el-tab-pane label="维护">维护</el-tab-pane>
                            <el-tab-pane label="带看">
                                <el-button size="medium"
                                           type="primary"
                                           icon="el-icon-plus"
                                           @click="dialogShow"></el-button>
                                <el-card v-for="(item, index) in takeLookList" :key="index" class="box-card" v-show="takeLookList.length > 0" shadow="always">
                                        {{'编号: ' + item.serialNumber }}
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="修改">修改</el-tab-pane>
                        </el-tabs>

                    </div>
                </el-col>
            </el-row>

            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                <!--<el-input placeholder="请输入内容" v-model="input5" class="input-with-select">-->
                    <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
                <!--</el-input>-->
                <el-input size="medium" v-model="searchMes" class="input-with-select" placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search" @click="searchNumber"></el-button>
                </el-input>
                <div class="card-wrap">
                    <el-card class="box-card" v-show="searchList.length > 0" shadow="hover">
                        <div v-for="(item, index) in searchList" :key="index" @click="chooseIt(item)">
                            {{'编号: ' + item.serialNumber }}
                        </div>
                    </el-card>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogHidden">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </section>

</template>

<script>
    export default {
        name: "passenger-details",
        props: ['id'],
        data() {
            return {
                dialogVisible: false,
                searchMes: '',
                searchList: [],
                takeLookList: [],
            };
        },

        computed: {
        },
        filter:{
        },
        methods: {
            dialogShow(){
                this.dialogVisible = true;
                this.searchList = [];
            },
            dialogHidden(){
                this.dialogVisible = false;
            },
            searchNumber(){
                var postData = {
                    mes: this.searchMes
                };
                this.searchList = [],
                this.searchList.push({
                    id: 0,
                    serialNumber: '1000-2478-fgdf-34jh'
                })
            },
            chooseIt(item){
                console.log(item);
                this.takeLookList.push(item)
                this.dialogHidden();
            }

        }
    }
</script>

<style lang="less">
    @import "../assets/css/element.less";
    .passengerDetails {
        /*border:1px solid red;*/
        .detail-template{
            width: 100%;
            padding: 25px 50px;
            .el-row {
                .grid-content {
                    border: 1px solid #d7d7d7;
                    margin-bottom: 20px;
                    min-height: 100px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .el-card{
                        border: none;
                    }
                    .el-tabs{
                        min-height: 300px;
                        border: none;
                    }
                }
            }

            .el-dialog{
                .card-wrap{
                    margin-top: 20px;
                }
            }
        }
    }
</style>