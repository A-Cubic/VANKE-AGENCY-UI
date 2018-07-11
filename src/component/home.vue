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
                                你叫狗剩
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="title">当前业绩</div>
                        <div class="number">786</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="title">潜在业绩</div>
                        <div class="number">1234</div>
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
                                           :plain="dataStatus == 0 ? false : true"
                                           @click="search(0)">周</el-button>
                                <el-button type="primary"
                                           :plain="dataStatus == 1 ? false : true"
                                           @click="search(1)">月</el-button>
                            </div>
                            <div class="table-wrap">
                                <el-table :data="dataList" style="width: 100%">
                                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                    <el-table-column prop="address" label="地址"></el-table-column>
                                </el-table>
                            </div>
                            <div class="table-pagination">
                                <el-pagination
                                        layout="prev, pager, next, jumper, total"
                                        :page-size="page_size"
                                        :current-page.sync="page_no"
                                        :total ="total_row"
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
                            <div slot="header" class="clearfix">资讯</div>
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
            dataStatus: 0,
            dataList:[
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '大连市甘井子区'
                },
                {
                    date: '2016-05-04',
                    name: '王小龙',
                    address: '大连市金州区'
                },
                {
                    date: '2016-05-01',
                    name: '王小豹',
                    address: '大连市西岗区'
                },
                {
                    date: '2016-05-03',
                    name: '王小狼',
                    address: '大连市中山区'
                },
            ],
            total_row: 0,
            page_no: 1,
            page_size: 10,

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
                    news: '万科樱花园促销'
                },
                {
                    id: 1,
                    news: '万科溪之谷大酬宾'
                },
                {
                    id: 2,
                    news: '万科新开盘'
                }
            ],
        };
    },
    methods: {
        handleCurrentChangeSearch(val){
            this.page_no = val;
            this.doSearch();
        },
        doSearch(){
            var that = this;
            var postData = {
                status: this.dataStatus,
            };
            // _axios.JH_mes('', postData)
            //     .then(res => {
            //         if(typeof(res) != "object") res = JSON.parse(res);
            //         if(res.success){
            //             console.log(res.data);
            //             that.dataList = [];
            //         }else{
            //             console.log(res);
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
        },
        search(status){
            this.page_no = 1;
            this.dataStatus = status;
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
