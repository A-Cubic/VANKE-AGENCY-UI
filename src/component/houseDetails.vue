<template>
    <section class="house-details">
        <div class="house-template">
            {{houseDataForm.number}}
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
                                <div v-show="houseDataForm.imgurl ==null || houseDataForm.imgurl.length == 0" class="blockCover">暂无图片</div>
                                <div v-show="houseDataForm.imgurl !=null || houseDataForm.imgurl.length > 0" class="imgCover">
                                    <img :src="coverUrl" alt="暂无图片">
                                </div>
                                <el-carousel v-show="houseDataForm.imgurl !=null && houseDataForm.imgurl.length > 0"
                                             class="carousel-wrap"
                                             indicator-position="none"
                                             :interval="5000"
                                             type="card"
                                             height="110px"
                                             @change="coverHandel">
                                    <el-carousel-item v-for="(item, index) in houseDataForm.imgurl" :key="index">
                                        <img :src="item" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="mes-wrap">
                                <div class="house-price">{{ houseDataForm.xiaoquName }}</div>
                                <div class="house-price">{{ houseDataForm.priceText }}</div>
                                <div class="house-price">{{ houseDataForm.priceOneText }}</div>
                                <div class="house-basis-mes">
                                    <div class="basis-mes">
                                        <div>户型</div>
                                        <div>{{ houseDataForm.huxing }}</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>面积</div>
                                        <div>{{houseDataForm.areas}}m²</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>朝向</div>
                                        <div>{{ houseDataForm.chaoxiang }}</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>楼层</div>
                                        <div>{{ houseDataForm.floor }}</div>
                                    </div>
                                </div>
                                <div class="house-other-mes">
                                    <div class="other-mes">
                                        <div>挂牌时间: <span>{{ houseDataForm.createTime }}</span></div>
                                        <div>有无钥匙: <span>{{ houseDataForm.iskey==1?"有":"无" }}</span></div>
                                        <div>房主信息:
                                            <el-button type="text" size="mini" @click="ownerHandle">查看</el-button>
                                        </div>
                                    </div>
                                    <div class="other-mes">
                                        <div>维护人: <span>{{ houseDataForm.recordrelName==''?"暂无": radiusForm.recordrelName }}</span></div>
                                        <div>房屋等级: <span>{{ houseDataForm.grade }}</span></div>
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
                                    <div class="radius-data">{{ radiusForm.createrelName==''|| radiusForm.createrelName==null?"暂无":radiusForm.createrelName }}</div>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>维护</div>
                                    <div class="radius-data">{{ radiusForm.recordrelName==''|| radiusForm.recordrelName==null?"暂无": radiusForm.recordrelName}}</div>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>实勘</div>
                                    <div class="radius-data">{{ radiusForm.explorationrelName=='' || radiusForm.explorationrelName==null?"暂无": radiusForm.explorationrelName}}</div>
                                    <el-button type="text"
                                               size="small"
                                               icon="el-icon-plus"
                                               @click="examineHandel">
                                    </el-button>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>钥匙</div>
                                    <div class="radius-data">{{ radiusForm.keyrelName==''|| radiusForm.keyrelName==null?"暂无": radiusForm.keyrelName}}</div>
                                    <el-button type="text"
                                               size="small"
                                               icon="el-icon-plus"
                                               @click="keyHandel">
                                    </el-button>
                                </div>
                                <div class="radius-block">
                                    <div><i class="el-icon-edit"></i></div>
                                    <div>独家</div>
                                    <div class="radius-data">{{ radiusForm.exclusiverelName==''|| radiusForm.exclusiverelName==null?"暂无":radiusForm.exclusiverelName }}</div>
                                </div>
                            </div>

                        </li>
                    </ul>
                </el-col>
                <el-col :span="8">
                    <div class="tab-content">
                        <el-tabs type="border-card">
                            <el-tab-pane label="跟进">
                                <el-table :data="traceForm.list" :show-header="false" style="width: 100%">
                                    <el-table-column prop="createTime" label="日期"></el-table-column>
                                    <el-table-column prop="userRelName" label="维护人"></el-table-column>
                                    <el-table-column prop="content" label="内容"></el-table-column>
                                </el-table>
                                <div class="pagination-template">
                                    <el-pagination
                                            layout="prev, pager, next, jumper, total"
                                            :page-size="traceForm.pageSize"
                                            :current-page.sync="traceForm.pageNum"
                                            :total ="traceForm.total"
                                            @current-change="handleCurrentChangeSearch">
                                    </el-pagination>
                                </div>
                                <div class="trace-template">
                                    <div class="trace-title">跟进</div>
                                    <div class="trace-textarea">
                                        <el-input type="textarea" :rows="4" placeholder="请输入反馈" v-model="traceForm.textMes"></el-input>
                                    </div>
                                </div>
                                <div class="trace-button">
                                    <el-button type="primary" size="mini" @click="submitTrace">提交</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="带看">
                                <el-table :data="lookForm.list" :show-header="false" style="width: 100%">
                                    <el-table-column prop="createTime" label="日期"></el-table-column>
                                    <el-table-column prop="userRelName" label="维护人"></el-table-column>
                                </el-table>
                                <div class="pagination-template">
                                    <el-pagination
                                            layout="prev, pager, next, jumper, total"
                                            :page-size="lookForm.pageSize"
                                            :current-page.sync="lookForm.pageNum"
                                            :total ="lookForm.total"
                                            @current-change="handleCurrentChangeSearch1">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="修改">
                                <el-form :model="houseDataForm" ref="houseDataForm" label-width="60px" class="demo-ruleForm">
                                    <el-form-item label="价格:">
                                        <el-input placeholder="请输入" v-model="houseDataForm.price"></el-input>
                                    </el-form-item>
                                    <el-form-item label="户型:">
                                        <el-input placeholder="请输入" v-model="houseDataForm.huxing"></el-input>
                                    </el-form-item>
                                    <el-form-item label="面积:">
                                        <el-input placeholder="请输入" v-model="houseDataForm.areas"></el-input>
                                    </el-form-item>
                                    <el-form-item label="朝向:">
                                        <el-input placeholder="请输入" v-model="houseDataForm.chaoxiang"></el-input>
                                    </el-form-item>
                                    <el-form-item label="楼层:">
                                        <el-input placeholder="请输入" v-model="houseDataForm.floor"></el-input>
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
                                        <el-switch v-model="otherForm.isspecial==0 ||otherForm.isspecial==null?false:true"></el-switch>
                                    </el-form-item>
                                    <el-form-item label="无效房源:">
                                        <el-switch v-model="otherForm.state==0 ||otherForm.state==null?false:true"></el-switch>
                                    </el-form-item>
                                    <el-form-item label="优质房源:">
                                        <el-switch v-model="otherForm.isfine==0 ||otherForm.isfine==null?false:true"></el-switch>
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

                <el-dialog :title="'房主信息 '+'( 已看'+ownerForm.clickcount+'/20 )'" :visible.sync="ownerVisible" width="40%">
                    <el-form :model="ownerForm" ref="ownerForm" label-width="60px" class="demo-ruleForm">
                        <el-form-item label="姓名:">{{ ownerForm.owner }}</el-form-item>
                        <el-form-item label="电话:">{{ ownerForm.phone }}</el-form-item>
                        <el-form-item label="姓名:">{{ ownerForm.owner1 }}</el-form-item>
                        <el-form-item label="电话:">{{ ownerForm.phone1 }}</el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="ownerVisible = false">退 出</el-button>
                    </span>
                </el-dialog>
                <el-dialog :title="'地址信息 '+'( 已看'+placeForm.clickcount+'/20 )'" :visible.sync="placeVisible" width="40%">
                    <el-form :model="placeForm" ref="placeForm" label-width="60px" class="demo-ruleForm">
                        <el-form-item label="地址:">{{ placeForm.addressText }}</el-form-item>
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
    import { getToken } from '../util/global';
    import HouseApi from '../api/api_house.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
    export default {
        install(Vue) {
            Vue.prototype.$message = Message
        },
        name: "house-details",
        props: ['id'],
        data() {
            return {
                houseDataForm: {
                    number:'',
                    imgurl:[],
                    xiaoquName:'',
                    price: '',
                    priceText:'',
                    priceOneText:'',
                    huxing: '',
                    areas: '',
                    chaoxiang: '',
                    floor: '',
                    createTime: '',
                    iskey: '',
                    recordrelName: '',
                    grade: '',
                    isshare:''
                },  //右侧头部数据

                ownerVisible: false, //房主信息dialog
                ownerForm: {
                    owner: '',
                    phone: '',
                    owner1: '',
                    phone1: '',
                    clickcount:0
                },
                placeVisible: false, //地址信息dialog
                placeForm: {
                    addressText: '辽宁省大连市甘井子区',
                    clickcount:0
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
                    createrelName: '',
                    recordrelName: '',
                    explorationrelName: '',
                    keyrelName: '',
                    exclusiverelName: '',
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
                    pageNum: 1,
                    pageSize: 5,
                    total: 0,
                    list: [
                        {
                            createTime: '',
                            userRelName: '',
                            content:''
                        }
                    ],
                    textMes: ''
                },  //跟进
                lookForm:{
                    pageNum: 1,
                    pageSize: 5,
                    total: 0,
                    list: [
                        {
                            createTime: '',
                            userRelName: ''
                        }
                    ],
                },  //带看
                // editForm:{
                //     price: '100万',
                //     houseType: '2室',
                //     area: '91平',
                //     orientation: '南北',
                //     floor: '5楼',
                // },  //修改
                otherForm: {
                    isspecial: 0,
                    state: 0,
                    isfine:0,
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
        mounted:function(){
            var that = this;
            var postData = {
                id: this.id
            };
            HouseApi.housedetail(postData).then(function (result) {
                console.log(result)
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.houseDataForm=result.data;
                that.otherForm=result.data;
                that.radiusForm=result.data;
            }).catch(error => {
                console.log('housedetail_error');
            });

            var postData1 = {
                page: 1,
                size: 5,
                houseId: this.id
            };
            HouseApi.looklist(postData1).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.lookForm=result.data;
            }).catch(error => {
                console.log('looklist_error');
            });

            HouseApi.recordlist(postData1).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.traceForm=result.data;
            }).catch(error => {
                console.log('recordlist_error');
            });
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
                // console.log(index);
                this.coverUrl = this.houseDataForm.imgurl[index];
            },  //走马灯切换


            ownerHandle(){
                var that = this;
                if(this.houseDataForm.isshare==1){
                    Message.error("房源为共享池房源，无法查看房主信息！");
                }else{
                    var postData = {
                        houseId: this.id
                    };
                    HouseApi.detailPhone(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        if(result.data=='您今日查询联系信息的次数已用完'){
                            Message.error("您今日查询联系信息的次数已用完");
                        }else{
                            that.ownerForm=result.data;
                            that.ownerVisible = true;
                        }
                    }).catch(error => {
                        console.log('detailPhone_error');
                    });
                }

            },  //查看房主信息
            placeHandle(){
                var that = this;
                if(this.houseDataForm.isshare==1){
                    Message.error("房源为共享池房源，无法查看地址信息！");
                }else{
                    var postData = {
                        houseId: this.id
                    };
                    HouseApi.detailAddress(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        if(result.data=='您今日查询房屋地址的次数已用完'){
                            Message.error("您今日查询房屋地址的次数已用完");
                        }else{
                            that.placeForm=result.data;
                            that.placeVisible = true;
                        }
                    }).catch(error => {
                        console.log('detailAddress_error');
                    });
                }

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
                    var that = this;
                    var postData = {
                        id: this.id
                    };
                    HouseApi.updateKey(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.houseDataForm.iskey = "1";
                        that.radiusForm.keyrelName=result.data;
                        Message({
                            type: 'success',
                            message: '更改成功!'
                        });
                    }).catch(error => {
                        console.log('updateKey_error'+error);
                    });

                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消更改!'
                    });
                });
            },  //修改钥匙所有人

            editSubmit(){
                var that = this;
                var hid = this.id;
                var postData = {
                    id: hid,
                    price:this.houseDataForm.price,
                    huxing: this.houseDataForm.huxing,
                    areas: this.houseDataForm.areas,
                    chaoxiang: this.houseDataForm.chaoxiang,
                    floor: this.houseDataForm.floor
                };
                HouseApi.updateHouse(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    if(result.data=='1'){
                        var postData1 = {
                            id: hid
                        };
                        HouseApi.housedetail(postData1).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            that.houseDataForm=result.data;
                            that.otherForm=result.data;
                            that.radiusForm=result.data;
                        }).catch(error => {
                            console.log('housedetail_error');
                        });
                        Message({
                            message: '修改成功!',
                            type: 'success'
                        });
                    }else{
                        Message.error('修改失败!');
                    }
                }).catch(error => {
                    console.log('updateKey_error'+error);
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

            handleCurrentChangeSearch(val){
                var that = this;
                that.traceForm.pageNum = val;
                var postData = {
                    houseId: this.id,
                    page: val,
                    size: 5,
                };
                HouseApi.recordlist(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.traceForm=result.data;
                }).catch(error => {
                    console.log('recordlist_error');
                });
            },

            handleCurrentChangeSearch1(val){
                var that = this;
                that.lookForm.pageNum = val;
                var postData = {
                    houseId: this.id,
                    page: val,
                    size: 5,
                };
                HouseApi.looklist(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.lookForm=result.data;
                }).catch(error => {
                    console.log('looklist_error');
                });
            },

            //提交跟进
            submitTrace(){
                var that = this;
                var hid = this.id;
                var postData = {
                    houseId: hid,
                    content:this.traceForm.textMes
                };
                HouseApi.insertRecord(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.traceForm.textMes='';
                    var postData1 = {
                        page: 1,
                        size: 5,
                        houseId: hid
                    };

                    HouseApi.recordlist(postData1).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.traceForm=result.data;
                    }).catch(error => {
                        console.log('recordlist_error'+error);
                    });
                }).catch(error => {
                    console.log('insertRecord'+error);
                });
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
