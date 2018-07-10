<template>
    <section class="home">
        <div class="home-template">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content-col8">
                        <div class="header-img">
                            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2604583878,933342668&fm=27&gp=0.jpg" alt="">
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">当前业绩</div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content-col8">潜在业绩</div>
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
                                <el-button type="danger" plain>月</el-button>
                                <el-button type="danger" plain>周</el-button>
                            </div>
                            <div class="table-wrap">
                                <el-table
                                        :data="tableData"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="date"
                                            label="日期"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="姓名"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="address"
                                            label="地址">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="table-pagination">
                                <el-pagination
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, prev, pager, next, jumper"
                                        :total="400">
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
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],

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
                height: 120px;
                box-shadow: 0px 0px 10px #e3e3e3;
               .header-img{
                   width: 100px;
                   height: 100px;
                   img{
                       width: 100%;
                       height: 100%;
                       border-radius: 100px;
                   }
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
                    border: 1px solid #d7d7d7;
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
