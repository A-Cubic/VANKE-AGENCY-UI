<template>
    <section class="house-details">
        <div class="house-template">
            这条信息的id是{{id}}
            <el-row :gutter="25">
                <el-col :span="16">
                    <ul class="mes-concent">
                        <li>
                            <div class="upload-big">
                                <!--<el-upload-->
                                        <!--class="img-uploader"-->
                                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                        <!--list-type="picture-card"-->
                                        <!--multiple-->
                                        <!--:show-file-list="false"-->
                                        <!--:data="uploadData"-->
                                        <!--:on-success="handleSuccess"-->
                                        <!--:on-error="handleError">-->
                                    <!--<i class="el-icon-plus uploader-icon"></i>-->
                                <!--</el-upload>-->
                                <div v-show="carouselList.length < 0" class="blockCover">暂无图片</div>
                                <div v-show="carouselList.length > 0" class="imgCover">
                                    <img :src="coverUrl" alt="暂无图片">
                                </div>
                                <el-carousel v-show="carouselList.length > 0"
                                             class="carousel-wrap"
                                             indicator-position="none"
                                             :interval="5000"
                                             type="card"
                                             height="110px"
                                             @change="coverHandel">
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
                                    <el-button type="text"
                                               size="small"
                                               icon="el-icon-plus"
                                               @click="examineHandel">
                                    </el-button>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>钥匙</div>
                                    <div class="radius-data">{{ radiusForm.key }}</div>
                                    <el-button type="text"
                                               size="small"
                                               icon="el-icon-plus"
                                               @click="keyHandel">
                                    </el-button>
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
                                    <el-button type="primary" size="mini" @click="">提交</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="带看">
                                <el-table :data="lookForm.lookList" :show-header="false" style="width: 100%">
                                    <el-table-column prop="date" label="日期"></el-table-column>
                                    <el-table-column prop="peopleName" label="维护人"></el-table-column>
                                </el-table>
                                <div class="pagination-template">
                                    <el-pagination
                                            layout="prev, pager, next, jumper, total"
                                            :page-size="lookForm.pageSize"
                                            :current-page.sync="lookForm.pageNo"
                                            :total ="lookForm.totalRow"
                                            @current-change="">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="修改">
                                <el-form :model="editForm" ref="editForm" label-width="60px" class="demo-ruleForm">
                                    <el-form-item label="价格:">
                                        <el-input placeholder="请输入" v-model="editForm.totalPrice"></el-input>
                                    </el-form-item>
                                    <el-form-item label="户型:">
                                        <el-input placeholder="请输入" v-model="editForm.houseType"></el-input>
                                    </el-form-item>
                                    <el-form-item label="面积:">
                                        <el-input placeholder="请输入" v-model="editForm.area"></el-input>
                                    </el-form-item>
                                    <el-form-item label="朝向:">
                                        <el-input placeholder="请输入" v-model="editForm.orientation"></el-input>
                                    </el-form-item>
                                    <el-form-item label="楼层:">
                                        <el-input placeholder="请输入" v-model="editForm.floor"></el-input>
                                    </el-form-item>
                                    <div style="text-align: right">
                                        <el-button type="primary" size="mini" @click="editSubmit">提交</el-button>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="其他">
                                <el-form :model="otherForm"
                                         ref="otherForm"
                                         label-width="120px"
                                         class="demo-ruleForm"
                                         label-position="left">
                                    <el-form-item label="特殊房源:">
                                        <el-switch v-model="otherForm.specialHouse"></el-switch>
                                    </el-form-item>
                                    <el-form-item label="无效房源:">
                                        <el-switch v-model="otherForm.invalidHouse"></el-switch>
                                    </el-form-item>
                                    <el-form-item label="优质房源:">
                                        <el-switch v-model="otherForm.goodHouse"></el-switch>
                                    </el-form-item>
                                    <el-form-item label="房源转让:">
                                        <el-button type="text" size="mini"
                                                   @click="transferHandel">点击转让
                                        </el-button>
                                    </el-form-item>
                                </el-form>

                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>

                <el-dialog :title="'房主信息 '+'( 已看'+ownerVisibleNumber+'/20 )'" :visible.sync="ownerVisible" width="40%">
                    <el-form :model="ownerForm" ref="ownerForm" label-width="60px" class="demo-ruleForm">
                        <el-form-item label="姓名:">{{ ownerForm.name }}</el-form-item>
                        <el-form-item label="电话:">{{ ownerForm.phone }}</el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="ownerVisible = false">退 出</el-button>
                    </span>
                </el-dialog>
                <el-dialog :title="'地址信息 '+'( 已看'+placeVisibleNumber+'/20 )'" :visible.sync="placeVisible" width="40%">
                    <el-form :model="placeForm" ref="placeForm" label-width="60px" class="demo-ruleForm">
                        <el-form-item label="地址:">{{ placeForm.placeName }}</el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="placeVisible = false">退 出</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="实勘添加" :visible.sync="examineVisible" width="80%">
                    <el-form :model="examineForm" ref="examineForm" label-width="60px"
                             class="demo-ruleForm examine-form">
                        <el-form-item label="室:">
                            <el-upload
                                    v-for="(item, index) in examineForm.bedroom"
                                    action="https://jsonplaceholder.typicode.com/posts/"

                                    :show-file-list="false"
                                    list-type="picture-card"
                                    :headers="curToken"
                                    :on-change='changeUpload'>
                                <img v-if="item.imgUrl != ''" :src="item.imgUrl" alt="">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="厅:">
                            <el-upload
                                    v-for="(item, index) in examineForm.sittingRoom"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    list-type="picture-card">
                                <img v-if="item.imgUrl != ''" :src="item.imgUrl" alt="">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="卫:">
                            <el-upload
                                    v-for="(item, index) in examineForm.toilet"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    list-type="picture-card">
                                <img v-if="item.imgUrl != ''" :src="item.imgUrl" alt="">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="厨:">
                            <el-upload
                                    v-for="(item, index) in examineForm.kitchen"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    list-type="picture-card">
                                <img v-if="item.imgUrl != ''" :src="item.imgUrl" alt="">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="户型图:">
                            <el-upload
                                    v-for="(item, index) in examineForm.houseTypeImg"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    list-type="picture-card">
                                <img v-if="item.imgUrl != ''" :src="item.imgUrl" alt="">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="其他:">
                            <el-upload
                                    v-for="(item, index) in examineForm.other"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    list-type="picture-card">
                                <img v-if="item.imgUrl != ''" :src="item.imgUrl" alt="">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="examineVisible = false">退 出</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="房屋转让" :visible.sync="transferVisible" width="80%">
                    <div class="transfer-wrap">
                        <div class="transfer-wrap-header">
                            <el-input placeholder="请输入人名" v-model="transferForm.name" clearable></el-input>
                            <el-button class="m-btn-addMenu" type="primary" @click="searchTransfer">查询</el-button>
                        </div>
                        <div class="transfer-wrap-table">
                            <el-table :data="transferForm.personList" style="width: 100%">
                                <el-table-column prop="userCode" label="编号"></el-table-column>
                                <el-table-column prop="userName" label="姓名"></el-table-column>
                                <el-table-column label="操作">
                                    <template scope="scope">
                                        <el-checkbox v-model="scope.row.checked"
                                                     :disabled="scope.row.disabled"
                                                     @change="checkTransfer(scope.row)">选择
                                        </el-checkbox>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="transferVisible = false">退 出</el-button>
                        <el-button type="primary" @click="finishTransfer">确 定</el-button>
                    </span>
                </el-dialog>

            </el-row>
        </div>
    </section>
</template>
<script>
    import { getToken } from '../util/global'
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
                },  //右侧头部数据

                ownerVisible: false, //房主信息dialog
                ownerVisibleNumber: 2,
                ownerForm: {
                    name: '王大虎',
                    phone: '13245678349',
                },
                placeVisible: false, //地址信息dialog
                placeVisibleNumber: 5,
                placeForm: {
                    placeName: '辽宁省大连市甘井子区',
                },
                uploadData:{},  //提交postData
                curToken: {Authorization: getToken()},
                coverUrl: '',
                carouselList:[
                    {
                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2604583878,933342668&fm=27&gp=0.jpg'
                    },
                    {
                        imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3497046269,138674714&fm=27&gp=0.jpg'
                    },
                    {
                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=621015648,1160215088&fm=27&gp=0.jpg'
                    }

                ],  //走马灯
                radiusForm:{
                    entering: '钢铁侠',
                    maintain: '美国队长',
                    examine: '绿巨人',
                    key: '雷神',
                    exclusive: '蜘蛛侠',
                },  //圆框标签

                examineVisible: false, //实勘dialog
                examineForm:{
                    bedroom: [
                        {
                            imgId: 0,
                            imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2604583878,933342668&fm=27&gp=0.jpg'
                        },
                        {
                            imgId: 1,
                            imgUrl: ''
                        },
                    ],
                    sittingRoom: [
                        {
                            imgId: 1,
                            imgUrl: ''
                        },
                    ],
                    toilet: [
                        {
                            imgId: 0,
                            imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2604583878,933342668&fm=27&gp=0.jpg'
                        }
                    ],
                    kitchen: [
                        {
                            imgId: 1,
                            imgUrl: ''
                        },
                    ],
                    houseTypeImg: [
                        {
                            imgId: 0,
                            imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2604583878,933342668&fm=27&gp=0.jpg'
                        }
                    ],
                    other: [
                        {
                            imgId: 1,
                            imgUrl: ''
                        },
                    ],
                },

                traceForm: {
                    pageNo: 1,
                    pageSize: 5,
                    totalRow: 0,
                    traceList: [
                        {
                            date: '2018-06-09',
                            peopleName: '王小虎',
                        },
                        {
                            date: '2018-06-09',
                            peopleName: '王小虎',
                        },
                        {
                            date: '2018-06-09',
                            peopleName: '王小虎',
                        },
                        {
                            date: '2018-06-09',
                            peopleName: '王小虎',
                        },
                        {
                            date: '2018-06-09',
                            peopleName: '王小虎',
                        }
                    ],
                    textMes: ''
                },  //跟进
                lookForm:{
                    pageNo: 1,
                    pageSize: 5,
                    totalRow: 0,
                    lookList: [
                        {
                            date: '2018-06-09',
                            peopleName: '王大虎',
                        },
                        {
                            date: '2018-06-09',
                            peopleName: '王二虎',
                        },
                        {
                            date: '2018-06-09',
                            peopleName: '王三虎',
                        }
                    ],
                },  //带看
                editForm:{
                    totalPrice: '100万',
                    houseType: '2室',
                    area: '91平',
                    orientation: '南北',
                    floor: '5楼',
                },  //修改
                otherForm: {
                    specialHouse: false,
                    invalidHouse: true,
                    goodHouse:true,
                    transferHouse: false,
                },
                transferVisible: false,  //转让dialog
                transferForm: {
                    name:'',
                    personList: [],
                    chooseName: '',
                    chooseCode: '',
                },
                checkTransferList: [],



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

            coverHandel(index){
                console.log(index);
                this.coverUrl = this.carouselList[index].imgUrl;
            },  //走马灯切换


            ownerHandle(){
                this.ownerVisible = true;
            },  //查看房主信息
            placeHandle(){
                this.placeVisible = true;
            },  //查看地址信息
            examineHandel(){
                this.examineVisible = true;
            },  //实勘填图
            keyHandel(){
                this.$confirm('此操作将钥匙所有人更改为当前用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '更改成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消更改!'
                    });
                });
            },  //修改钥匙所有人

            editSubmit(){
                var postData = this.editForm;
                console.log(postData);
                this.$message({
                    message: '修改成功!',
                    type: 'success'
                });
            },  //修改提交
            transferHandel(){
                this.transferForm.name = '';
                this.transferForm.personList = [];
                this.transferForm.chooseName = '';
                this.transferForm.chooseCode = '';
                this.transferVisible = true;
            },  //点击转让
            searchTransfer(){
                var that = this;
                var postData = {
                    user_name: this.transferForm.name
                };
                that.transferForm.personList = [];
                that.transferForm.personList.push({
                    id: 0,
                    userName: '李明',
                    userCode: '12345',
                    checked: false,
                    disabled: false,
                });
            },  //查找用户
            checkTransfer(item){
                this.transferForm.chooseName = item.userName;
                this.transferForm.chooseCode = item.userCode;
            },  //选择用户
            finishTransfer(){
                var postData = {
                    id: this.transferForm.chooseCode,
                    recordUserName: this.transferForm.chooseName
                };
                console.log(postData);
                var url = '/vanke/house/updateRecordUserr';
                this.transferVisible = false;
                this.$message({
                    message: '转让成功!',
                    type: 'success'
                });
            },  //确定选择
            changeUpload(file, fileList) {
                console.log(fileList)
            },  //上传




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
                            .blockCover{
                                width: 100%;
                                height: 15vw;
                                line-height: 15vw;
                                text-align: center;
                                cursor: pointer;
                                border: 1px solid #f2f2f2;
                            }
                            .imgCover{
                                width: 100%;
                                height: 15vw;
                                cursor: pointer;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            /*.img-uploader .el-upload{*/
                                /*width: 100%;*/
                                /*height: 15vw;*/
                                /*cursor: pointer;*/
                                /*.uploader-icon {*/
                                    /*font-size: 40px;*/
                                    /*color: #8c939d;*/
                                    /*height: 15vw;*/
                                    /*line-height: 15vw;*/
                                /*}*/
                            /*}*/
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
                                width: 8vw;
                                height: 8vw;
                                margin: 1vw;
                                display: inline-block;
                                box-shadow: 0px 0px 10px #e3e3e3;
                                border-radius: 100px;
                                position: relative;
                                .el-button{
                                    position: absolute;
                                    bottom: 0;
                                    left: 3.5vw;
                                }
                                div{
                                    margin-top: 2px;
                                    &:first-child {
                                        font-size: 16px;
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
                            padding: 10px 0;
                            text-align: right;
                            border-bottom: 1px solid #f2f2f2;
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
                .transfer-wrap{
                    .transfer-wrap-header{
                        padding: 20px;
                        box-shadow: 0px 0px 10px #e3e3e3;
                        .el-input{
                            width: 200px;
                        }
                    }
                    .transfer-wrap-table{
                        padding: 20px;
                        margin-top: 20px;
                        box-shadow: 0px 0px 10px #e3e3e3;
                        img{
                            height: 11vw;
                        }
                    }
                }
                .el-dialog{
                    .examine-form{
                        .el-form-item{
                            overflow: hidden;
                            .el-upload{
                                width: 100px;
                                height: 100px;
                                line-height: 106px;
                                margin-left: 20px;
                                cursor: pointer;
                                float: left;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .el-upload:hover {
                                border-color: #409EFF;
                            }


                        }

                    }
                }
            }
        }
    }
</style>
