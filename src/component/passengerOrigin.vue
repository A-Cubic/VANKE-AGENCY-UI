<template>
    <section class="passengerOrigin">
        <div class="passenger_template">
            <div class="passenger_search">
                <div class="passenger_search_header">
                    <el-input size="medium" v-model="searchMes" placeholder="请输入内容"></el-input>
                    <el-button size="medium" type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button type="text" icon="el-icon-plus" class="add_button">新增</el-button>
                </div>
                <div class="passenger_search_block">
                    <el-form :model="formData" ref="formData" class="form-wrap">
                        <el-form-item label="星级:">
                            <el-button :type="item.choosed == false ? '' : 'danger'"
                                       size="mini"
                                       v-for="(item, index) in formData.passengeLevelList"
                                       @click="searchPassengeLevel(index, formData.passengeLevelList)">
                                <span>{{ item.name }}</span>
                                <span v-show="index != 0">({{ item.number }})</span>
                            </el-button>
                        </el-form-item>

                        <el-form-item label="进度:">
                            <el-button :type="item.choosed == false ? '' : 'danger'"
                                       size="mini"
                                       v-for="(item, index) in formData.scheduleList"
                                       @click="searchSchedule(index, formData.scheduleList)">
                                <span>{{ item.name }}</span>
                                <span v-show="index != 0">({{ item.number }})</span>
                            </el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
            <div style="margin-top: 20px">
                客源列表
            </div>

            <div class="passenger_table">

                <el-table :data="tableData" size="medium" style="width: 100%" @row-click="examineById">
                    <el-table-column label="姓名" width="180">
                        <template scope="scope">
                            <div>
                                {{scope.row.name}}
                            </div>
                            <div>
                                <i v-for="it in scope.row.level" class="el-icon-star-on"></i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="need" label="需求" width="180"></el-table-column>
                    <el-table-column prop="schedule" label="进度"></el-table-column>
                    <el-table-column prop="appoint" label="约看"></el-table-column>
                    <el-table-column prop="lead" label="带看"></el-table-column>
                    <el-table-column prop="entrust_time" label="委托时间"></el-table-column>
                    <el-table-column prop="maintain_time" label="上次维护时间"></el-table-column>
                </el-table>

            </div>

        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                searchMes: '',
                formData :{
                    passengeLevelList:[
                        {
                            name: '不限',
                            id: 0,
                            choosed: true,
                            number: 0,
                        },
                        {
                            name: '一般',
                            id: 1,
                            choosed: false,
                            number: 12,
                        },
                        {
                            name: '极差',
                            id: 2,
                            choosed: false,
                            number: 8,
                        },
                        {
                            name: '暂不关注',
                            id: 3,
                            choosed: false,
                            number: 1,
                        }
                    ],
                    passengeLevelId: 0,
                    scheduleList:[
                        {
                            name: '不限',
                            id: 0,
                            choosed: true,
                            number: 0
                        },
                        {
                            name: '未看',
                            id: 1,
                            choosed: false,
                            number: 12
                        },
                        {
                            name: '已看',
                            id: 2,
                            choosed: false,
                            number: 5
                        },
                        {
                            name: '二看',
                            id: 3,
                            choosed: false,
                            number: 2
                        },
                        {
                            name: '三看',
                            id: 4,
                            choosed: false,
                            number: 0
                        }
                    ],
                    scheduleId: 0,
                },
                tableData: [
                    {
                        id: 0,
                        name: '李狗剩',
                        level: 2,
                        need: '南北通透, 高层, 有电梯',
                        schedule: 1,
                        appoint: '暂无',
                        lead: '一次',
                        entrust_time: '无',
                        maintain_time: '20分钟前'
                    },
                    {
                        id: 1,
                        name: '刘翠花',
                        level: 3,
                        need: '南向, 高层, 有电梯, 公共面积少',
                        schedule: 2,
                        appoint: '一次',
                        lead: '一次',
                        entrust_time: '2018-07-20',
                        maintain_time: '一个小时前'
                    }
                ]

            };
        },

        computed: {
        },


        methods: {
            search(){
                var postData = {
                    passengeLevelId: this.formData.passengeLevelId,
                    scheduleId: this.formData.scheduleId,
                }
                console.log(postData);
            },

            searchPassengeLevel(index, list){
                var id = this.doSearch(index, list);
                this.formData.passengeLevelId = id;
                this.search();
            }, //房型
            searchSchedule(index, list){
                var id = this.doSearch(index, list);
                this.formData.scheduleId = id;
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
                this.$router.push({path: '/admin/passengerDetails/'+row.id})
            }
        }
    };
</script>
<style lang="less">
    @import "../assets/css/element.less";
    .passengerOrigin {
        /*border:1px solid red;*/
        .passenger_template{
            width: 100%;
            padding: 25px 50px;
            .passenger_search{
                padding: 20px;
                border: 1px solid #d7d7d7;
                .passenger_search_header{
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
                .passenger_search_block{
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

            .passenger_table{
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
