<template>
    <section class="home">
        <div class="home-template">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="header-img">
                            <img v-bind:src="basic.avatar" alt="">
                        </div>
                        <div class="user-mes">
                            <div class="user_name">
                                <span class="spanlabel">编号：</span>
                                <span class="spancolor"> {{basic.user_no}}</span>
                            </div>
                            <div class="user_name">
                                <span class="spanlabel">姓名：</span>
                                <span class="spancolor"> {{basic.relname}}</span>
                            </div>
                            <div class="user_name">
                                <span class="spanlabel">门店：</span>
                                <span class="spancolor"> {{basic.store_name}}</span>
                            </div>
                            <div class="user_name">
                                <span class="spanlabel">角色：</span>
                                <span class="spancolor"> {{basic.desc}}</span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="title" style="font-size: 18px;">当前业绩</div>
                        <div class="number">{{basic.current_score}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="title" style="font-size: 18px;">潜在业绩</div>
                        <div class="number">{{basic.latent_score}}</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="18">
                    <div class="grid-content">
                        <el-card class="box-card" shadow="always">
                            <div slot="header" class="clearfix">
                                <span style="font-size: 18px; text-align: center;">业绩排行榜</span>
                            </div>
                            <div class="table-button">
                                <el-button v-for="(item, index) in dataStatus.dataStatusList"
                                            size="small"
                                           :key="index"
                                           :type="dataStatus.status == item.value ? 'primary' : ''"
                                           @click="search(item.value)">{{ item.label }}
                                </el-button>
                                <!-- <el-button type="primary"
                                           :plain="ranking.dataStatus == 1 ? false : true"
                                           @click="search(1)">周排行</el-button>
                                <el-button type="primary"
                                           :plain="ranking.dataStatus == 2 ? false : true"
                                           @click="search(2)">月排行</el-button> -->
                            </div>
                            <div class="table-wrap">
                                <el-table :data="ranking.list" style="width: 100%">
                                    <el-table-column  label="" width="40">
                                        <template scope="scope">
                                            <i class='iconfont icon-first' v-show='scope.row.rank*1==1'></i>
                                            <i class='iconfont icon-second' v-show='scope.row.rank*1==2'></i>
                                            <i class='iconfont icon-third' v-show='scope.row.rank*1==3'></i>
                                            <!-- <i class='el-icon-star-off' v-show='scope.row.rank*1==4'></i> -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="rank" label="排名" width="180"></el-table-column>
                                    <el-table-column prop="real_name" label="姓名" width="180"></el-table-column>
                                    <el-table-column prop="store_name" label="门店" width="180"></el-table-column>
                                    <el-table-column prop="score" label="业绩"></el-table-column>
                                </el-table>
                            </div>
                            <div class="table-pagination">
                                <el-pagination
                                        layout="prev, pager, next, jumper, total"
                                        :page-size="ranking.pageSize"
                                        :current-page.sync="ranking.pageNum"
                                        :total ="ranking.total"
                                        @current-change="handleCurrentChangeSearch">
                                </el-pagination>
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-card class="box-card" shadow="always">
                            <div slot="header" class="clearfix" style="font-size: 18px;">优质房源</div>
                            <div v-for="(item, index) in goodHouseList" :key="index" class="text item highQuality">
                                <router-link tag="a" target="_blank" :to="'/admin/houseDetails/'+item.id">{{ item.xiaoquName }}</router-link>
                            </div>
                        </el-card>
                        <el-card class="box-card" shadow="always">
                            <div slot="header" class="clearfix" style="font-size: 18px;">最新房源</div>
                            <div v-for="(item, index) in newsList" :key="index" class="text item highQuality">
                                <router-link tag="a" target="_blank" :to="'/admin/houseDetails/'+item.id">{{ item.xiaoquName }}</router-link>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>
<script>
import HomeApi from '../api/api_home.js';
import { setRole, setToken } from '../util/global'
    import _axios from '../axios/axios.js'
export default {
    data() {
        return {
            basic:{
                avatar:'',
                relname:'',
                user_no:'',
                store_name:'',
                desc:'',
                current_score:'',
                latent_score:''
            },
            dataStatus:{
                status: 1,
                dataStatusList: [
                    {
                        value: 1,
                        label: '周排行'
                    },
                    {
                        value: 2,
                        label: '月排行'
                    }
                ],
            },
            
            ranking:{
                dataStatus: 1,
                list:[
                    {
                        rank: '',
                        real_name: '',
                        store_name: '',
                        score:''
                    }
                ],
                total: 0,
                pageSize:10,
                pageNum:1
            },

            goodHouseList:[
                {
                    id: '',
                    xiaoquName: ''
                }
            ],
            newsList:[
                {
                    id: '',
                    xiaoquName: ''
                },

            ],
        };
    },
    mounted:function(){
        var that = this;
        HomeApi.userinfo().then(function (result) {
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.basic=result.data;
        }).catch(error => {
            console.log('userinfo_error');
        });

        HomeApi.goodhouse().then(function (result) {
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.goodHouseList=result.data;
        }).catch(error => {
            console.log('goodHouseList_error');
        });

        HomeApi.addhouseList().then(function (result) {
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.newsList=result.data;
        }).catch(error => {
            console.log('addhouseList_error');
        });

        var postData = {
            type: 1,
            page: 1,
            size: 10,
        };
        HomeApi.rank(postData).then(function (result) {
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.ranking=result.data;
        // console.log(that.ranking)
        }).catch(error => {
            console.log('rank_error');
        })
    },
    methods: {
        handleCurrentChangeSearch(val){
            this.ranking.pageNum = val;
            this.doSearch();
        },
        doSearch(){
            var that = this;
            var postData = {
                type: this.dataStatus.status,
                page: this.ranking.pageNum,
                size: 10,
            };
            // console.log(postData)
            HomeApi.rank(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.ranking=result.data;
            }).catch(error => {
                console.log('rank_error');
            })
            // _axios.JH_mes('', postData)
            //     .then(res => {
            //         if(typeof(res) != "object") res = JSON.parse(res);
            //         if(res.success){
            //             console.log(res.data);
            //             that.ranking.dataList = [];
            //         }else{
            //             console.log(res);
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });

        },
        search(status){
            this.ranking.pageNum = 1;
            // this.ranking.dataStatus = status;
            this.dataStatus.status = status;
            this.doSearch();
        }
    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.home {
    .spanlabel{
        color:#c51010;
        display:inline-block;
        /*width:50px;*/
    }
    .spancolor{
        color: #909399;
    }

    /*border:1px solid red;*/
    .home-template{
        width: 100%;
        padding: 25px 50px;
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            /*border: 1px solid #d7d7d7;*/
            border-right: none;
            .grid-content-col8{
                height: 140px;
                box-shadow: 0px 0px 10px #e3e3e3;
                overflow: hidden;
                .header-img{
                    float: left;
                    width: 120px;
                    height: 120px;
                    margin: 10px 10px 0 10px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 100px;
                    }
                }
                .user-mes{
                    float: left;
                    height: 120px;
                    margin: 10px 30px 0;
                    .user_name{
                        height: 30px;
                        line-height: 30px;
                        font-size: 15px;
                    }
                }
                .title{
                    font-size: 15px;
                    padding: 30px 0 10px 50px ;
                }
                .number{
                    font-size: 30px;
                    padding: 0 50px;
                    color: #c51010;;
                }

            }
            .grid-content {
                .table-button{
                    padding: 0 10px;
                    .el-button{
                        width: 88px;
                        &:nth-child(1){
                            border-top-left-radius: 50px;
                            border-bottom-left-radius: 50px;
                        }
                        &:nth-child(2){
                            border-top-right-radius: 50px;
                            border-bottom-right-radius: 50px;
                        }
                    }
                }
                .table-wrap{
                    margin: 20px 10px;
                    /*box-shadow: 0px 0px 10px #e3e3e3;*/
                    border: 1px solid #f2f2f2;
                }
                .table-pagination{
                    text-align: right;
                }
                .box-card{
                    .highQuality{
                        margin-bottom:10px;
                    }
                    &:nth-child(2) {
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>
