<template>
    <section class="houseResource">
        <!--<el-row class="wrap" :gutter="24">-->
            <!--<el-col :span="24" class="warp-breadcrum">-->
        <div class="house_template">
            <div class="house_search">
                <div class="house_search_header">
                    <el-input size="medium" v-model="searchMes" placeholder="请输入内容"></el-input>
                    <el-button size="medium" type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button type="text" icon="el-icon-plus" class="add_button">新增</el-button>
                </div>
                <div class="house_search_block">
                    <el-form :model="formData" ref="formData" class="form-wrap">
                        <el-form-item label="面积:">
                        </el-form-item>
                        <el-form-item label="房型:">
                            <el-button :type="item.choosed == false ? '' : 'danger'"
                                       size="mini"
                                       v-for="(item, index) in formData.houseTypeList"
                                       @click="searchHouseType(index, formData.houseTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>

                        <el-form-item label="价格:">
                            <el-button :type="item.choosed == false ? '' : 'danger'"
                                       size="mini"
                                       v-for="(item, index) in formData.totalPriceList"
                                       @click="searchTotalPrice(index, formData.totalPriceList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
            <div style="margin-top: 20px">
                房源列表
            </div>

            <div class="house_table">

                <el-table :data="tableData" size="medium" style="width: 100%" @row-click="examineById">
                    <el-table-column label="标题图" width="180">
                        <template scope="scope">
                            <img class="imageUrl" :src="scope.row.imageUrl" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="houseName" label="楼盘名称" width="180"></el-table-column>
                    <el-table-column prop="houseType" label="户型"></el-table-column>
                    <el-table-column prop="area" label="面积"></el-table-column>
                    <el-table-column prop="price" label="总价"></el-table-column>
                    <el-table-column prop="floor" label="楼层"></el-table-column>
                    <el-table-column prop="orientation" label="朝向"></el-table-column>
                    <el-table-column prop="followUp" label="跟进"></el-table-column>
                    <el-table-column prop="people" label="维护人"></el-table-column>

                </el-table>

            </div>

        </div>

            <!--</el-col>-->
        <!--</el-row>-->
    </section>
</template>
<script>
export default {
    data() {
        return {
            searchMes: '',
            formData :{
                houseTypeList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },
                    {
                        name: '一室',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '两室',
                        id: 2,
                        choosed: false,
                    },
                    {
                        name: '三室',
                        id: 3,
                        choosed: false,
                    },
                    {
                        name: '四室',
                        id: 4,
                        choosed: false,
                    }
                ],
                houseTypeId: 0,
                totalPriceList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },
                    {
                        name: '100万以下',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '100万-150万',
                        id: 2,
                        choosed: false,
                    },
                    {
                        name: '150万-200万',
                        id: 3,
                        choosed: false,
                    },
                    {
                        name: '200万-250万',
                        id: 4,
                        choosed: false,
                    }
                ],
                totalPriceId: 0,
            },
            tableData: [
                {
                    id: 0,
                    imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531038527286&di=e32f5bc68986d591090cb2d8e687b5b8&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F87%2F08%2F55a0dcd4ab768_1024.jpg',
                    houseName: '万科翡翠之光',
                    houseType: '2-2-1',
                    area: '91平',
                    price: '180万',
                    floor: '5层',
                    orientation: '南',
                    followUp: 1,
                    people: '郭铁柱'
                },
                {
                    id: 1,
                    imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2714851461,2662863538&fm=27&gp=0.jpg',
                    houseName: '万科翡翠书院',
                    houseType: '2-1-1',
                    area: '71平',
                    price: '150万',
                    floor: '7层',
                    orientation: '南北',
                    followUp: 2,
                    people: '李二蛋'
                }
            ]

        };
    },

    computed: {
    },
    

    methods: {
        search(){
            var postData = {
                houseTypeId: this.formData.houseTypeId,
                totalPriceId: this.formData.totalPriceId,
            }
            console.log(postData);
        },
        searchHouseType(index, list){
           var id = this.doSearch(index, list);
           this.formData.houseTypeId = id;
           this.search();
        }, //房型
        searchTotalPrice(index, list){
           var id = this.doSearch(index, list);
           this.formData.totalPriceId = id;
           this.search();
        }, //价格
        doSearch(index, list){
            var id = 0;
            list.forEach((item) => {
                item.choosed = false;
            });
            list[index].choosed = true;
            id = list[index].id;
            return id;
        },


        examineById(row){
            console.log(row.id);
            this.$router.push({path: '/admin/houseDetails/'+row.id})
        }
    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";

.houseResource {
	/*border:1px solid red;*/
    .house_template{
        width: 100%;
        padding: 25px 50px;
        .house_search{
            padding: 20px;
            border: 1px solid #d7d7d7;
            .house_search_header{
                position: relative;

                .el-input{
                    width: 220px;
                }
                .add_button{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0px;
                    margin: auto;
                }
            }
            .house_search_block{
                .form-wrap{
                    margin-top: 15px;
                    .el-form-item{
                        margin: 0;
                        padding: 0;
                        .el-button{
                            /*margin-left: 10px;*/
                            border: none;
                        }

                    }
                }
            }

        }

        .house_table{
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #d7d7d7;
            .el-table{
                /*border: 1px solid #d7d7d7;*/
                .imageUrl{
                    height: 100px;
                    width: 150px;
                    border: 1px solid #d7d7d7
                }
            }
        }
    }


}
</style>
