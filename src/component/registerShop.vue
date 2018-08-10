<template>
    <section class="registerShop">
        <el-row class="register-template" :gutter="0">
            <el-col class="register-content" :span="24">
                <el-row class="achievements-template" :gutter="0">
                    <el-col class="achievements-content" :span="24">
                        <div class="search-header">
                            <el-button type="primary" icon="el-icon-plus" @click="addStorePop">新增门店</el-button>
                        </div>
                        <div class="table-template">
                            <el-table :data="resultData.list" border>
                                <el-table-column prop="storeName" label="门店名称"></el-table-column>
                                <el-table-column prop="storeAdress" label="门店地址"></el-table-column>
                                <el-table-column label="操作">
                                    <template scope="scope">
                                        <el-button size="mini" type="danger" icon="el-icon-edit" circle @click="editItem(scope.row)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="table-pagination">
                            <el-pagination
                                    layout="prev, pager, next, jumper, total"
                                    :page-size="resultData.pageSize"
                                    :current-page.sync="resultData.pageNum"
                                    :total ="resultData.total"
                                    @current-change="handleCurrentChangeSearch">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>


                <el-dialog :title="addStoreSign==1?'新增门店':'修改门店'" :visible.sync="addStoreVisible" width="50%">
                    <el-form label-position="left"
                             label-width="100px"
                             :model="registerForm"
                             :rules="ruleForm"
                             ref="registerForm">

                        <el-form-item label="门店名称:" prop="storeName">
                            <el-input v-model="registerForm.storeName"  placeholder="门店名称（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="门店地址:" prop="storeAdress" >
                            <el-input v-model="registerForm.storeAdress" placeholder="门店地址（必填）"></el-input>
                        </el-form-item>
                        <el-form-item label="门店范围:" prop="streetId">
                            <el-tree
                                    :data="regionTree"
                                    node-key="value"
                                    ref="tree"
                                    show-checkbox
                                    accordion
                                    :props="defaultProps"
                                    >
                            </el-tree>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button style="margin-right: 10px" @click="resetForm('registerForm');addStoreVisible=false">取 消</el-button>
                        <el-button type="primary" v-show="addStoreSign==1?true:false" @click="submitForm('registerForm')">确 定</el-button>
                        <el-button type="primary" v-show="addStoreSign==2?true:false" @click="editForm('registerForm')">确 定</el-button>
                    </span>
                </el-dialog>

            </el-col>
        </el-row>
    </section>

</template>

<script>
    import RegisterShopApi from '../api/api_registerShop.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
    export default {
        install(Vue) {
            Vue.prototype.$message = Message
        },
        name: "register",
        data(){
            return{
                addStoreVisible:false,
                addStoreSign:1,
                storeId:0,
                resultData:{
                    list: [

                    ],
                    pageSize: 10,
                    total: 0,
                    pageNum: 1,
                },
                registerForm:{
                    storeName: '',
                    storeAdress: '',
                    streetId: [],
                    storeRangeList:[],
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                regionTree: [

                ],


                ruleForm: {
                    storeName: [
                        { required: true, message: '请输入门店名称', trigger: 'blur' },
                    ],
                    storeAdress: [
                        { required: true, message: '请输入门店地址', trigger: 'blur' },
                    ],
                    streetId: [
                        { required: true, message: '请选择门店覆盖范围', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.doSearchResult();
            this.doSearch();
        },
        methods:{
            addStorePop(){
                var that = this;
                that.addStoreSign=1;
                that.addStoreVisible=true;
                that.registerForm.storeName= '';
                that.registerForm.storeAdress= '';
                that.registerForm.streetId=[];
                that.registerForm.storeRangeList=[];

                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys([],true);
                });
            },
            editItem(row){
                var that = this;
                that.addStoreSign=2;
                that.addStoreVisible=true;
                that.registerForm.storeName=row.storeName;
                that.registerForm.storeAdress=row.storeAdress;
                that.storeId=row.id;
                var ids=[];
                row.storeRangeList.forEach((item) => {
                    that.registerForm.streetId.push(item.streetId);
                    ids.push(item.streetId);
                })
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(ids,true);
                });

            },
            handleCurrentChangeSearch(val){
                this.resultData.pageNum = val;
                this.doSearchResult();
            },
            doSearchResult(){
                var that = this;
                var postData = {
                    page: this.resultData.pageNum,
                    size: this.resultData.pageSize
                };
                RegisterShopApi.searchStore(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.resultData=result.data;
                }).catch(error => {
                    console.log('searchStore_error');
                });
            },
            doSearch(){
                var that = this;
                var postData = {

                };
                RegisterShopApi.regionslist(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.regionTree=result.data;
                }).catch(error => {
                    console.log('regionslist_error');
                });
            },
            editForm(formName) {
                this.registerForm.streetId = this.$refs.tree.getCheckedKeys(true);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var that = this;
                        var postData = {
                            storeName: this.registerForm.storeName,
                            storeAdress: this.registerForm.storeAdress,
                            id: this.storeId,
                            streetId: this.registerForm.streetId,
                        };
                        RegisterShopApi.updateStore(postData).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                           if(result.data=='1'){
                                that.resetForm(formName);
                                Message({message: '门店修改成功!', type: 'success'});
                                that.addStoreVisible=false;
                                that.doSearchResult();
                            }else {
                                Message.error('门店修改失败！');
                            }
                        }).catch(error => {
                            console.log('insertStore_error');
                        });
                    } else {
                        // Message.error('请填写完整信息!');
                        // return false;
                    }
                });
            },
            submitForm(formName) {
                this.registerForm.streetId = this.$refs.tree.getCheckedKeys(true);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var that = this;
                        var postData = that.registerForm;
                        RegisterShopApi.insertStore(postData).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            if(result.data=='0'){
                                Message.error('门店已存在');
                            }else if(result.data=='1'){
                                that.resetForm(formName);
                                Message({message: '门店注册成功!', type: 'success'});
                                that.addStoreVisible=false;
                                that.doSearchResult();
                            }else {
                                Message.error('注册失败！');
                            }
                        }).catch(error => {
                            console.log('insertStore_error');
                        });
                    } else {
                        // Message.error('请填写完整信息!');
                        // return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$refs.tree.setCheckedKeys([]);
            }
        }

    }
</script>

<style lang="less" >
    @import "../assets/css/element.less";
    .table-template{
        margin: 20px;
        /*box-shadow: 0px 0px 10px #e3e3e3;*/
        min-height: 100px;
    }
    .table-pagination{
        padding: 0 20px 20px;
        text-align: right;
    }
    .search-header{
        border-bottom: 1px solid #f2f2f2;
        padding: 20px;
        span{
            margin-left: 10px;
            &:first-child {
                margin-left: 0;
            }
        }
        .el-button{
            margin-left: 10px;
        }
    }
    .registerShop {
        .register-template{
            width: 100%;
            padding: 25px 50px;
            background: #fff;
            .register-content{
                min-height: 200px;
                box-shadow: 0px 0px 10px #e3e3e3;
                .el-card{
                    border: none;
                    box-shadow: none;
                    /*.clearfix{*/
                        /*span{*/
                            /*font-size: 16px;*/
                        /*}*/

                    /*}*/
                    .el-form{
                        max-width: 620px;
                        margin: auto;
                        .el-input{
                            width: 520px;
                        }
                    }
                    .register-button{
                        text-align: right;
                        margin-top: 20px;
                    }
                }
            }
        }
    }

</style>
