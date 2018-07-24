<template>
    <section class="personal">
        <div class="personal-template">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-tabs type="border-card">
                            <el-tab-pane label="基本信息">
                                <div class="person-avatar">
                                    <el-upload
                                            class="img-uploader"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card"
                                            multiple
                                            :show-file-list="false"
                                            :data="uploadData"
                                            :on-success="handleSuccess"
                                            :on-error="handleError">
                                        <img v-bind:src="form.avatar" alt="">
                                    </el-upload>
                                    <el-button size="mini" type="text" @click="passHandle">
                                        修改密码
                                    </el-button>
                                </div>
                                <div class="person-form">
                                    <el-form :model="form" status-icon ref="form" label-width="120px" class="demo-ruleForm">
                                        <el-form-item label="账号:">{{form.username}}</el-form-item>
                                        <el-form-item label="工号:">{{form.user_no}}</el-form-item>
                                        <el-form-item label="姓名:">{{form.relname}}</el-form-item>
                                        <el-form-item label="电话:">{{form.phone}}</el-form-item>
                                        <el-form-item label="门店:">{{form.store_name}}</el-form-item>
                                        <el-form-item label="角色:">{{form.desc}}</el-form-item>
                                        <el-form-item label="注册:">{{form.register_time}}</el-form-item>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我维护的房源">

                                <div class="house_table">
                                    <el-table :data="maintainData.tableList"  size="medium" style="width: 100%">
                                        <el-table-column fixed label="标题图" width="180">
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
                                    <div class="table-pagination">
                                        <el-pagination
                                        layout="prev, pager, next, jumper, total"
                                        :page-size="maintainData.pageSize"
                                        :current-page.sync="maintainData.pageCurrent"
                                        :total ="maintainData.total"
                                        @current-change="">
                                        </el-pagination>
                                    </div>
                                </div>

                            </el-tab-pane>
                            <el-tab-pane label="我关注的房源">
                                <div class="house_table">
                                    <el-table :data="attentionData.tableList"  size="medium" style="width: 100%">
                                        <el-table-column fixed label="标题图" width="180">
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
                                    <div class="table-pagination">
                                        <el-pagination
                                        layout="prev, pager, next, jumper, total"
                                        :page-size="attentionData.pageSize"
                                        :current-page.sync="attentionData.pageCurrent"
                                        :total ="attentionData.total"
                                        @current-change="">
                                        </el-pagination>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>

            <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
                <span>修改密码</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </section>
</template>
<script>
import PersonalApi from '../api/api_personal.js';
export default {
    data() {
        return {
            uploadData: {},
            form:{
                relname: '',
                user_no: '',
                phone: '',
                register_time:'',
                avatar:'',
                store_name:'',
                username:'',
                desc:''
            },
            maintainData: {
                pageSize: 10,
                pageCurrent: 1,
                total: 0,
                tableList: [
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
                ],
            },  //我维护的房源 数据

            attentionData: {
                pageSize: 10,
                pageCurrent: 1,
                total: 0,
                tableList: [
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
                ],
            },   //我关注的房源 数据

            dialogVisible: false,
        };
    },
    mounted:function(){
        var that = this;
        PersonalApi.userinfo().then(function (result) {
            console.log(result)
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.form=result.data;
        }).catch(error => {
            console.log('userinfo_error');
        });

    },
    methods: {
        passHandle(){
            this.dialogVisible = true;
        },

        handleSuccess(response, file, fileList) {
            console.log(response, file, fileList);
        },
        handleError(err, file, fileList) {
            console.log(err, file, fileList);
        }
    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";

.personal {
	/*border:1px solid red;*/
    .personal-template {
        width: 100%;
        padding: 25px 50px;
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            .grid-content {
                .el-tabs{
                    min-height: 300px;
                    .el-tab-pane{
                        overflow: hidden;
                        .person-avatar{
                            float: left;
                            text-align: center;
                            margin: 10px 0 0 10px;
                            .img-uploader .el-upload{
                                border: none;
                                width: 100px;
                                height: 100px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 100px;
                                }
                            }
                            .el-button{
                                margin-top: 10px;
                            }

                        }
                        .person-form{
                            float: left;
                            margin-top: 10px;
                            .el-form-item{
                                margin: 0;
                            }
                        }
                        .house_table{
            padding: 20px;
            .el-table{
                .imageUrl{
                    height: 100px;
                    width: 150px;
                }
            }
            .table-pagination{
                margin-top: 20px;
                text-align: right;
            }
        }
                    }


                }
            }
        }
    }
}
</style>
