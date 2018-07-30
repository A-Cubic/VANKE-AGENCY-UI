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
                                {{basic.relname}}
                            </div>
                            <div class="user_name">
                                {{basic.user_no}}
                            </div>
                            <div class="user_name">
                                {{basic.store_name}}
                            </div>
                            <div class="user_name">
                                {{basic.desc}}
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="title">当前业绩</div>
                        <div class="number">{{basic.current_score}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="title">潜在业绩</div>
                        <div class="number">{{basic.latent_score}}</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="18">
                    <div class="grid-content">
                        <el-card class="box-card" shadow="always">
                            <div slot="header" class="clearfix">
                                <span>业绩排行榜</span>
                            </div>
                            <div class="table-button">
                                <el-button type="primary"
                                           :plain="ranking.dataStatus == 1 ? false : true"
                                           @click="search(1)">周排行</el-button>
                                <el-button type="primary"
                                           :plain="ranking.dataStatus == 2 ? false : true"
                                           @click="search(2)">月排行</el-button>
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
                            <div slot="header" class="clearfix">优质房源</div>
                            <div v-for="(item, index) in goodHouseList" :key="index" class="text item">
                                <router-link tag="a" target="_blank" :to="'/admin/houseDetails/'+item.id">{{ item.xiaoquName }}</router-link>
                            </div>
                        </el-card>
                        <el-card class="box-card" shadow="always">
                            <div slot="header" class="clearfix">最新资讯</div>
                            <div v-for="(item, index) in newsList" :key="index" class="text item">
                                {{ item.news }}
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
                    id: 0,
                    xiaoquName: ''
                }
            ],
            newsList:[
                {
                    id: 0,
                    news: '暂无'
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

        var postData = {
            type: 1,
            page: 1,
            size: 10,
        };
        HomeApi.rank(postData).then(function (result) {
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.ranking=result.data;
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
                type: this.ranking.dataStatus,
                page: this.ranking.pageNum,
                size: 10,
            };
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
            this.ranking.dataStatus = status;
            this.doSearch();

        }
    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.home {
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
                    margin: 10px 0 0;
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
                        width: 120px;
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
                    &:nth-child(2) {
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>
