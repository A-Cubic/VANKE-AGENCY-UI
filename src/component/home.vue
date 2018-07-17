<template>
    <section class="home">
        <div class="home-template">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="header-img">
                            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2604583878,933342668&fm=27&gp=0.jpg" alt="">
                        </div>
                        <div class="user-mes">
                            <div class="user_name">
                                名字：{{basic.name}}
                            </div>
                            <div class="user_name">
                                工号：{{basic.workNum}}
                            </div>
                            <div class="user_name">
                                门店：{{basic.shop}}
                            </div>
                            <div class="user_name">
                                电话：{{basic.phone}}
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="title">当前业绩</div>
                        <div class="number">{{basic.currentResults}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="title">潜在业绩</div>
                        <div class="number">{{basic.potentialResults}}</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="18">
                    <div class="grid-content">
                        <el-card class="box-card" shadow="always">
                            <div slot="header" class="clearfix">
                                <span>排行榜</span>
                            </div>
                            <div class="table-button">
                                <el-button type="primary"
                                           :plain="ranking.dataStatus == 0 ? false : true"
                                           @click="search(0)">周</el-button>
                                <el-button type="primary"
                                           :plain="ranking.dataStatus == 1 ? false : true"
                                           @click="search(1)">月</el-button>
                            </div>
                            <div class="table-wrap">
                                <el-table :data="ranking.dataList" style="width: 100%">
                                    <el-table-column  label="" width="40">
                                        <template scope="scope">
                                            <i class='el-icon-star-off' v-show='scope.row.rank*1==1'></i>
                                            <i class='el-icon-star-on' v-show='scope.row.rank*1==2'></i>
                                            <i class='el-icon-star-off' v-show='scope.row.rank*1==3'></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="rank" label="排名" width="180"></el-table-column>
                                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                    <el-table-column prop="address" label="业绩"></el-table-column>
                                </el-table>
                            </div>
                            <div class="table-pagination">
                                <el-pagination
                                        layout="prev, pager, next, jumper, total"
                                        :page-size="ranking.pageSize"
                                        :current-page.sync="ranking.currentPage"
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
                                {{ item.houseName }}
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
    import _axios from '../axios/axios.js'
export default {
    data() {
        return {
            basic:{
                name:'狗剩',
                workNum:'12345',
                shop:'中华门店',
                phone:'155555555',
                currentResults:'123',
                potentialResults:'1234'
            },
            ranking:{
                dataStatus: 0,
                dataList:[
                    {
                        rank: 1,
                        name: '王小虎',
                        address: '大连市甘井子区'
                    },
                    {
                        rank: 2,
                        name: '王小龙',
                        address: '大连市金州区'
                    },
                    {
                        rank: 3,
                        name: '王小豹',
                        address: '大连市西岗区'
                    },
                    {
                        rank: 4,
                        name: '王小狼',
                        address: '大连市中山区'
                    },
                ],
                total: 0,
                pageSize:10,
                currentPage:1
            },

            goodHouseList:[
                {
                    id: 0,
                    houseName: '万科樱花园'
                },
                {
                    id: 1,
                    houseName: '万科溪之谷'
                },
                {
                    id: 2,
                    houseName: '万科翡翠之光'
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
    methods: {
        handleCurrentChangeSearch(val){
            this.ranking.currentPage = val;
            this.doSearch();
        },
        doSearch(){
            var that = this;
            var postData = {
                status: this.ranking.dataStatus,
            };
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
            this.ranking.currentPage = 1;
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
                        width: 49.6%;
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
