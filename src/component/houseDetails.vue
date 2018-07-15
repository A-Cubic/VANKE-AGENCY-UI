<template>
    <section class="house-details">
        <div class="house-template">
            这条信息的id是{{id}}
            <el-row :gutter="25">
                <el-col :span="16">
                    <ul class="mes-concent">
                        <li>
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
                                <el-carousel class="carousel-wrap" indicator-position="none" :interval="5000" type="card" height="110px">
                                    <el-carousel-item v-for="(item, index) in carouselList" :key="index">
                                        <img :src="item.imgUrl" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="mes-wrap">
                                <div class="house-price">{{ houseDataForm.totalPrice }}</div>
                                <div class="house-basis-mes">
                                    <div class="basis-mes">
                                        <div>户型</div>
                                        <div>{{ houseDataForm.houseType }}</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>面积</div>
                                        <div>{{houseDataForm.area}}</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>朝向</div>
                                        <div>{{ houseDataForm.orientation }}</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>楼层</div>
                                        <div>{{ houseDataForm.floor }}</div>
                                    </div>
                                </div>
                                <div class="house-other-mes">
                                    <div class="other-mes">
                                        <div>挂牌时间: <span>{{ houseDataForm.handOutTime }}</span></div>
                                        <div>有无钥匙: <span>{{ houseDataForm.keyVisible }}</span></div>
                                        <div>房主信息:
                                            <el-button type="text" size="mini" @click="ownerHandle">查看</el-button>
                                        </div>
                                    </div>
                                    <div class="other-mes">
                                        <div>维护人: <span>{{ houseDataForm.maintenanceMan }}</span></div>
                                        <div>房屋等级: <span>{{ houseDataForm.houseLevel }}</span></div>
                                        <div>地址:
                                            <el-button type="text" size="mini" @click="placeHandle">查看</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!--<el-card class="box-card" shadow="never">-->
                                <!--<div slot="header" class="clearfix"><span>看房情况</span><el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                                <!--</div>-->
                                <!--<div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>-->
                            <!--</el-card>-->
                            <div class="radius-wrap">
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>录入</div>
                                    <div class="radius-data">{{ radiusForm.entering }}</div>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>维护</div>
                                    <div class="radius-data">{{ radiusForm.maintain }}</div>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>实勘</div>
                                    <div class="radius-data">{{ radiusForm.examine }}</div>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>钥匙</div>
                                    <div class="radius-data">{{ radiusForm.key }}</div>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>独家</div>
                                    <div class="radius-data">{{ radiusForm.exclusive }}</div>
                                </div>
                            </div>

                        </li>
                    </ul>
                </el-col>
                <el-col :span="8">
                    <div class="tab-content">
                        <el-tabs type="border-card">
                            <el-tab-pane label="跟进">
                                <el-table :data="traceForm.traceList" :show-header="false" style="width: 100%">
                                    <el-table-column prop="date" label="日期"></el-table-column>
                                    <el-table-column prop="peopleName" label="维护人"></el-table-column>
                                </el-table>
                                <div class="pagination-template">
                                    <el-pagination
                                            layout="prev, pager, next, jumper, total"
                                            :page-size="traceForm.pageSize"
                                            :current-page.sync="traceForm.pageNo"
                                            :total ="traceForm.totalRow"
                                            @current-change="">
                                    </el-pagination>
                                </div>

                                <div class="trace-template">
                                    <div class="trace-title">跟进</div>
                                    <div class="trace-textarea">
                                        <el-input type="textarea" :rows="4" placeholder="请输入反馈" v-model="traceForm.textMes"></el-input>
                                    </div>
                                </div>

                                <div class="trace-button">
                                    <el-button type="primary" @click="">提交</el-button>
                                </div>

                            </el-tab-pane>
                            <el-tab-pane label="带看">带看</el-tab-pane>
                            <el-tab-pane label="修改">修改</el-tab-pane>
                            <el-tab-pane label="其他">其他</el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>

                <el-dialog title="房主信息" :visible.sync="ownerVisible" width="40%">
                    <el-form :model="ownerForm" ref="ownerForm" label-width="60px" class="demo-ruleForm">
                        <el-form-item label="姓名:">{{ ownerForm.name }}</el-form-item>
                        <el-form-item label="电话:">{{ ownerForm.phone }}</el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="ownerVisible = false">退 出</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="地址信息" :visible.sync="placeVisible" width="40%">
                    <el-form :model="placeForm" ref="placeForm" label-width="60px" class="demo-ruleForm">
                        <el-form-item label="地址:">{{ placeForm.placeName }}</el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="placeVisible = false">退 出</el-button>
                    </span>
                </el-dialog>

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
                houseDataForm: {
                    totalPrice: '100万',
                    houseType: '2室',
                    area: '91平',
                    orientation: '南北',
                    floor: '5楼',
                    handOutTime: '2018-06-07',
                    keyVisible: '无',
                    maintenanceMan: '王小虎',
                    houseLevel: 'B',
                },

                ownerVisible: false, //房主信息dialog
                ownerForm: {
                    name: '王大虎',
                    phone: '13245678349',
                },
                placeVisible: false,
                placeForm: {
                    placeName: '辽宁省大连市甘井子区',
                },

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

                ],

                radiusForm:{
                    entering: '钢铁侠',
                    maintain: '美国队长',
                    examine: '绿巨人',
                    key: '雷神',
                    exclusive: '蜘蛛侠',
                },

                traceForm: {
                    pageNo: 1,
                    pageSize: 5,
                    totalRow: 0,
                    traceList: [
                        {
                            date: '2018-06-09',
                            peopleName: '王小虎',
                        }
                    ],
                    textMes: ''
                },



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
            },


            ownerHandle(){
                this.ownerVisible = true;
            },  //查看房主信息
            placeHandle(){
                this.placeVisible = true;
            },




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
                .mes-concent{
                    list-style-type: none;
                    li{
                        margin-bottom: 20px;
                        overflow: hidden;
                        box-shadow: 0px 0px 10px #e3e3e3;
                        &:last-child {
                            margin-bottom: 0;
                            text-align: center;
                        }
                        .upload-big{
                            width: 45%;
                            padding: 10px;
                            float: left;
                            .img-uploader .el-upload{
                                width: 100%;
                                height: 15vw;
                                cursor: pointer;
                                .uploader-icon {
                                    font-size: 40px;
                                    color: #8c939d;
                                    height: 15vw;
                                    line-height: 15vw;
                                }
                            }
                            .carousel-wrap{
                                margin-top: 20px;
                                .el-carousel__item{
                                    height: 100px;
                                    img{
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                        }
                        .mes-wrap{
                            padding: 10px 10px 10px 0;
                            width: 55%;
                            float: left;
                            .house-price{
                                padding: 10px 0;
                                border-bottom: 1px solid #d7d7d7;
                                font-size: 28px;
                            }
                            .house-basis-mes{
                                padding: 5px 0;
                                border-bottom: 1px solid #d7d7d7;
                                overflow: hidden;
                                .basis-mes{
                                    width: 25%;
                                    float: left;
                                    div{
                                        padding: 5px 0;
                                        &:first-child{
                                            font-size: 15px;
                                        }
                                        &:last-child{
                                            color: #666666;
                                        }
                                    }
                                }
                            }
                            .house-other-mes{
                                padding: 10px 0;
                                overflow: hidden;
                                .other-mes{
                                    width: 50%;
                                    float: left;
                                    span{
                                        /*color: #666666;*/
                                    }
                                }
                            }
                        }
                        .el-card{
                            border: none;
                        }
                        .radius-wrap{
                            padding: 20px;
                            /*overflow: hidden;*/
                            text-align: center;
                            .radius-block{
                                width: 10vw;
                                height: 10vw;
                                display: inline-block;
                                box-shadow: 0px 0px 10px #e3e3e3;
                                border-radius: 100px;
                                div{
                                    &:first-child {
                                        line-height: 2;
                                        font-size: 16px;
                                    }
                                    &:last-child {
                                        color: #666666;
                                        margin-top: 2px;
                                    }
                                }
                            }
                        }

                    }
                }

                .tab-content{
                    box-shadow: 0px 0px 10px #e3e3e3;
                    .el-tabs{
                        /*min-height: 310px;*/
                        border: none;
                        box-shadow: none;
                        position: relative;
                        .pagination-template{
                            margin-top: 10px;
                            text-align: right;
                        }
                        .trace-template{
                            margin-top: 10px;
                            overflow: hidden;
                            .trace-title{
                                float: left;
                                width: 15%;
                            }
                            .trace-textarea{
                                float: left;
                                width: 85%;
                            }
                        }
                        .trace-button{
                            margin-top: 10px;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
</style>
