<template>
    <section class="passengerDetails">
        <div class="detail-template">
            <!-- 这条信息的id是{{id}} -->

            <el-row :gutter="25">
                <el-col :span="24">
                    <ul class="user-content">
                        <li>
                            <div class="user-name">
                                <span>{{formUser.userName}}</span>
                                <span>( {{formUser.userGender}} )</span>
                            </div>
                            <div class="user-level">
                                <el-rate
                                        v-model="formUser.userLevel"
                                        :max="3"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        score-template="{value}">
                                </el-rate>
                            </div>
                        </li>
                        <li>
                            <span class="user-title">客源编号： </span>
                            <span class="user-mes">{{formUser.userCode}}</span>
                        </li>
                        <li>
                            <span class="user-title">上次维护： </span>
                            <span class="user-mes">{{formUser.lastTime}}</span>
                            <span class="user-title">委托时间： </span>
                            <span class="user-mes">{{formUser.entrustTime}}</span>
                        </li>
                        <li>
                            <span class="user-title">标签：</span>
                            <el-tag v-for="(item, index) in formUser.userTags" :key="index" type="success">
                                {{ item.tagName }}
                            </el-tag>
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <el-row :gutter="25">
                <el-col :span="18">
                    <div class="tab-content">
                        <el-tabs>
                            <el-tab-pane label="需求">
                                <div class='needForm'>{{needForm}}</div>
                                <!-- <el-alert title="意向小区" type="info"></el-alert> -->
                                

                            </el-tab-pane>
                            <el-tab-pane label="带看">
                                <!-- <el-button size="medium"
                                           type="primary"
                                           icon="el-icon-plus"
                                           @click="dialogShow"></el-button>
                                <el-card v-for="(item, index) in takeLookList" :key="index" class="box-card" v-show="takeLookList.length > 0" shadow="always">
                                    {{'编号: ' + item.serialNumber }}
                                </el-card> -->
                                <el-table :data="takeLookForm.takeLookList" 
                                        size="mini"
                                        :show-header="false"
                                        max-height="320"
                                        style="width: 100%">
                                        <el-table-column prop="message" label="内容"></el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <el-tab-pane label="备注">
                                <el-table :data="remarkForm.remarkList" 
                                        size="mini"
                                        :show-header="false"
                                        max-height="320"
                                        style="width: 100%">
                                        <el-table-column prop="message" label="内容"></el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>


                <el-col :span="6">
                    <ul class="maintain-content">
                        <li>
                            <div class="maintain-content-header">联系</div>
                            <el-popover
                                    title="联系电话"
                                    width="200"
                                    trigger="click"
                                    content="13566778899。">
                                <div class="maintain-content-mes" slot="reference">查看电话</div>
                            </el-popover>
                        </li>
                        <li>
                            <div class="maintain-content-header">维护</div>
                            <div class="maintain-content-mes" @click="remarkVisible = true">写备注</div>
                            <div class="maintain-content-mes" @click="lookVisible = true">录带看</div>
                            <!-- <div class="maintain-content-mes">发起合作</div> -->
                        </li>
                        <!-- <li>
                            <div class="maintain-content-header">管理</div>
                            <div class="maintain-content-mes"></div>
                        </li> -->
                    </ul>
                </el-col>
            </el-row>

            <el-dialog title="写备注" :visible.sync="remarkVisible" width="40%">
                <el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="remarkMes"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="remarkVisible = false">取 消</el-button>
                    <el-button type="primary" @click="remarkVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="录入带看房源信息" :visible.sync="lookVisible" width="80%">
                <div class="look-wrap">
                    <el-card class="box-card"
                             shadow="always"
                             v-for="(item, index) in LookedList"
                             :key="index">
                        <div slot="header" class="clearfix">
                            <span>带看时间: </span>
                            <el-date-picker v-model="item.startDate" type="date" placeholder="开始日期"></el-date-picker> -
                            <el-date-picker v-model="item.endDate" type="date" placeholder="结束日期"></el-date-picker>
                            <el-button type="text" icon="el-icon-close" @click="delLooked(item)"></el-button>
                        </div>
                        <ul class="look-data-template">
                            <li>
                                <img :src="item.imgUrl" alt="无法查看">
                            </li>
                            <li>{{item.houseName}}</li>
                            <li>{{item.houseCode}}</li>
                            <li>{{item.housePrice}}</li>
                        </ul>
                        <el-form :model="item" ref="form" label-width="60px" class="demo-ruleForm">
                            <el-form-item label="姓名:">
                                <el-input type="textarea" :rows="4" placeholder="请输入反馈" v-model="item.feedBack"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="table-button"></div>
                    </el-card>
                    <div class="add-look" @click="LookDetailHandel">
                        <i class="el-icon-plus icon-look"></i>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="lookVisible = false">取 消</el-button>
                    <el-button type="primary" @click="lookVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="添加带看房源" :visible.sync="lookDetailVisible" width="80%">
                <div class="look-detail-wrap">
                    <div class="look-detail-wrap-header">
                        <el-input placeholder="请输入小区名称" v-model="addLookForm.areaName" clearable></el-input> —
                        <el-input placeholder="请输入房源编号" v-model="addLookForm.areaName" clearable></el-input>
                        <el-button class="m-btn-addMenu" type="primary" @click="">查询</el-button>
                    </div>
                    <div class="look-detail-wrap-table">
                        <el-table :data="lookTableData" :show-header="false" style="width: 100%">
                            <el-table-column label="图片">
                                <template scope="scope">
                                    <img :src="scope.row.imgUrl" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column prop="houseCode" label="编号"></el-table-column>
                            <el-table-column prop="houseName" label="小区"></el-table-column>
                            <el-table-column prop="housePrice" label="价格"></el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-checkbox v-model="scope.row.checked"
                                                 :disabled="scope.row.disabled"
                                                 @change="checkLookDetail(scope.row)">选择
                                    </el-checkbox>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addLookDetail">添 加</el-button>
                    <el-button type="primary" @click="finishLookDetail">完 毕</el-button>
                </span>
            </el-dialog>

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

                formUser: {
                    userName: '王小虎',
                    userGender: '男',
                    userCode: '50235678934',
                    userLevel: 3,
                    lastTime: '2018-07-10',
                    entrustTime: '2018-07-05',
                    userTags: [
                        {id: 0, tagName: '链家App'},
                        {id: 1, tagName: '健康客户'},
                    ],
                },
                needForm:'这里是需求内容',
                remarkForm:{
                    remarkList:[
                        {
                            message: '备注1'
                        },
                        {
                            message: '备注2'
                        },
                        {
                            message: '备注3'
                        }
                    ]
                },

                takeLookForm:{
                    takeLookList:[
                        {
                            message: '带看记录1'
                        },
                        {
                            message: '带看记录2'
                        },
                        {
                            message: '带看记录3'
                        }
                    ],
                },

                phoneVisible: false,
                remarkVisible: false,
                remarkMes: '',
                lookVisible: false,
                lookDetailVisible: false,

                lookTableData: [
                    {
                        id: 0,
                        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2714851461,2662863538&fm=27&gp=0.jpg',
                        houseName: '万科樱花园',
                        houseCode: '1234',
                        housePrice: '106万',
                        checked: false,
                        disabled: false,
                    },
                    {
                        id: 1,
                        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531038527286&di=e32f5bc68986d591090cb2d8e687b5b8&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F87%2F08%2F55a0dcd4ab768_1024.jpg',
                        houseName: '万科翡翠书院',
                        houseCode: '2234',
                        housePrice: '106万',
                        checked: false,
                        disabled: false,
                    },
                    {
                        id: 3,
                        imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3497046269,138674714&fm=27&gp=0.jpg',
                        houseName: '万科溪之谷',
                        houseCode: '3234',
                        housePrice: '106万',
                        checked: false,
                        disabled: false,
                    }
                ],
                lookTableCheckedList: [],
                LookedList: [],


                addLookForm:{
                    areaName: '',
                    areaCode: '',
                },



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
            },

            LookDetailHandel(){
                var that = this;
                this.lookDetailVisible = true;
                this.lookTableCheckedList = [];
                that.lookTableData.forEach((item) => {
                    var item1 = item;
                    item1.checked = false;
                    item1.disabled = false;
                    that.LookedList.forEach((item2) => {
                        if(item1.id == item2.id){
                            item1.checked = true;
                            item1.disabled = true;
                            return;
                        }
                    });
                })

                // _.find(that.lookTableData,function (item) {
                //     return item.id === that.LookedList?that.LookedList[item.id]:''
                // }).checked.disabled = true;
            },
            checkLookDetail(item){
                var that = this;
                if(item.checked == true){
                    that.lookTableCheckedList.push(item);
                }
                else{
                    this.lookTableCheckedList.forEach((items) => {
                        if(item.id == items.id){
                            that.lookTableCheckedList.splice(that.lookTableCheckedList.indexOf(items), 1);
                        };
                    });
                }
                console.log(that.lookTableCheckedList);
            },  //带看详情 选择房源
            addLookDetail(){
                var that = this;
                this.lookTableCheckedList.forEach((item) => {
                    item.disabled = true;
                    that.LookedList.push({
                        id: item.id,
                        imgUrl: item.imgUrl,
                        houseName: item.houseName,
                        houseCode: item.houseCode,
                        housePrice: item.housePrice,
                        checked: item.checked,
                        disabled: item.disabled,
                        startDate: '',
                        endDate: '',
                        feedBack: '',
                    });
                });
                console.log(this.LookedList)
                this.lookTableCheckedList = [];
            },
            finishLookDetail(){
                this.addLookDetail();
                this.lookDetailVisible = false;
            },  //添加带看房源 完毕
            delLooked(item){
                this.LookedList.forEach((items) => {
                    if(item.id == items.id){
                        this.LookedList.splice(this.LookedList.indexOf(items), 1)
                    }
                });
            },  //带看房源 删除


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
                margin-bottom: 20px;
                &:last-child {
                    margin-bottom: 0;
                }
                .user-content{
                    box-shadow: 0px 0px 10px #e3e3e3;
                    min-height: 200px;
                    list-style-type: none;
                    li{
                        padding: 10px;
                        overflow: hidden;
                        .user-name{
                            float: left;
                            span{
                                &:first-child {
                                    font-size: 25px;
                                    font-weight: bolder;
                                }
                                &:last-child {
                                    font-size: 18px;
                                }
                            }

                        }
                        .user-level{
                            float: left;
                            margin: 10px 0 0 20px;
                        }
                        .user-title{
                            font-size: 14px;
                            font-weight: 500;
                            margin-left: 50px;
                            &:first-child {
                                margin-left: 0px;
                            }
                        }
                        .user-mes{
                            color: #666666;
                        }
                        .el-tag{
                            margin-left: 10px;
                            &:first-child {
                                margin-left: 0px;
                            }
                        }
                    }
                }
                .tab-content{
                    box-shadow: 0px 0px 10px #e3e3e3;
                    .el-tabs{
                        padding: 20px;
                        min-height: 300px;
                    }
                    .needForm{
                        background: #f8f8f8;
                        min-height: 280px;
                    }
                }

                .maintain-content{
                    box-shadow: 0px 0px 10px #e3e3e3;
                    min-height: 200px;
                    list-style-type: none;
                    padding: 10px;
                    li{
                        margin-bottom: 20px;
                        .maintain-content-header{
                            padding: 10px;
                            border-bottom: 1px solid #f2f2f2;
                        }
                        .maintain-content-mes{
                            padding: 10px;
                            border-bottom: 1px solid #f2f2f2;
                            color: #f56c6c;
                            cursor: pointer;
                        }
                    }
                }
            }

            .el-dialog{
                .look-wrap{
                    .add-look{
                        border: 1px dashed #d9d9d9;
                        width: 100%;
                        height: 10vw;
                        line-height: 10vw;
                        text-align: center;
                        .icon-look{
                            font-size: 36px;
                            color: #d9d9d9;
                        }
                    }
                    .el-card{
                        margin: 20px 0;
                        .clearfix{
                            overflow: hidden;
                            .el-button{
                                float: right;
                                clear: both;
                            }
                        }
                        .look-data-template{
                            list-style-type: none;
                            overflow: hidden;
                            /*border: 1px solid #f2f2f2;*/
                            box-shadow: 0px 0px 10px #e3e3e3;
                            li{
                                width: 25%;
                                height: 13vw;
                                line-height: 13vw;
                                /*border-right: 1px solid #f2f2f2;*/
                                float: left;
                                text-align: center;
                                &:last-child {
                                    border-right: none;
                                }
                                img{
                                    padding: 10px;
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        .el-form{
                            margin-top: 20px;
                        }
                    }
                }
                .look-detail-wrap{
                    .look-detail-wrap-header{
                        padding: 20px;
                        overflow: hidden;
                        box-shadow: 0px 0px 10px #e3e3e3;
                        .el-input{
                            width: 200px;
                        }
                    }
                    .look-detail-wrap-table{
                        padding: 20px;
                        margin-top: 20px;
                        box-shadow: 0px 0px 10px #e3e3e3;
                        text-align: center;
                        img{
                            height: 11vw;
                        }
                    }
                }

            }
        }
    }
</style>