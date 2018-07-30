<template>
    <section class="passengerOrigin">
        <div class="passenger_template">
            <div class="passenger_search">
                <div class="passenger_search_header">
                    <el-input size="medium" v-model="formData.searchText" placeholder="请输入内容"></el-input>
                    <el-button size="medium" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    <el-button type="primary" icon="el-icon-plus" class="add_button" @click="alertAdd.visible=true">新增客源</el-button>
                </div>
                <div class="passenger_search_block">
                    <el-form :model="formData" ref="formData" class="form-wrap">
                        <el-form-item label="范围:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.isShareList"
                                       @click="searchIsShare(index, formData.isShareList)">
                                <span>{{ item.name }}</span>
                                <!-- <span v-show="index != 0">({{ item.number }})</span> -->
                            </el-button>
                        </el-form-item>
                        <el-form-item label="类型:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.typeList"
                                       @click="searchType(index, formData.typeList)">
                                <span>{{ item.name }}</span>
                                <!-- <span v-show="index != 0">({{ item.number }})</span> -->
                            </el-button>
                        </el-form-item>

                        <el-form-item label="星级:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.guestgradeList"
                                       @click="searchGuestgrade(index, formData.guestgradeList)">
                                <span>{{ item.name }}</span>
                                <!-- <span v-show="index != 0">({{ item.number }})</span> -->
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
                    <el-table-column fixed label="姓名" width="180">
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
                    <el-table-column prop="entrust_time" label="委托时间"></el-table-column>
                    <el-table-column prop="maintain_time" label="上次维护时间"></el-table-column>
                </el-table>

            </div>

        </div>
        <el-dialog
          title="新增客源"
          :visible.sync="alertAdd.visible"
          width="80%"
          >
          <div >

            <el-form :model="alertAdd.ruleForm" 
                     :rules="alertAdd.rules" 
                     label-position="left"
                     ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row type="flex" class="row-bg" :gutter="20">
                    <el-col :span="1"></el-col>
                    <el-col :span="10">
                        <el-form-item label="姓名" prop="guestname">
                            <el-input v-model="alertAdd.ruleForm.guestname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="性别" prop="sex">
                            <el-input v-model="alertAdd.ruleForm.sex"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3"></el-col>
                </el-row>
                <el-row type="flex" class="row-bg" :gutter="20">
                    <el-col :span="1"></el-col>
                    <el-col :span="10">
                        <el-form-item label="星级" prop="guestgrade">
                            <el-select v-model="alertAdd.ruleForm.guestgrade" style="width: 100%;" placeholder="请选择星级">
                                <el-option label="A" value="A"></el-option>
                                <el-option label="B" value="B"></el-option>
                                <el-option label="C" value="C"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="类型" prop="type">
                            <el-select v-model="alertAdd.ruleForm.type" style="width: 100%;" placeholder="请选择类型">
                                <el-option label="买" value="0"></el-option>
                                <el-option label="租" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3"></el-col>
                </el-row>
                <el-row type="flex" class="row-bg" :gutter="20">
                    <el-col :span="1"></el-col>
                    <el-col :span="10">
                        <el-form-item label="价位" prop="heartprice">
                            <el-input v-model="alertAdd.ruleForm.heartprice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="alertAdd.ruleForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3"></el-col>
                </el-row>
                <el-row type="flex" class="row-bg" :gutter="20">
                    <el-col :span="1"></el-col>
                    <el-col :span="10">
                        <el-form-item label="备注" prop="remarks">
                            <el-input v-model="alertAdd.ruleForm.remarks"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="面积" prop="areas">
                            <el-input v-model="alertAdd.ruleForm.areas"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3"></el-col>
                </el-row>

                <el-row type="flex" class="row-bg" :gutter="20">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="户型" prop="huxingshi">
                            <el-input v-model="alertAdd.ruleForm.huxingshi" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="室" label-width="40px" prop="huxingting">
                            <el-input v-model="alertAdd.ruleForm.huxingting"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="厅" label-width="40px" prop="huxingwei">
                            <el-input v-model="alertAdd.ruleForm.huxingwei"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="卫" label-width="40px" prop="huxingchu">
                            <el-input v-model="alertAdd.ruleForm.huxingchu"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1" style="text-align: center; line-height: 40px">
                        厨
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg" :gutter="20">
                    <el-col :span="1"></el-col>
                    <el-col :span="10">
                        <el-form-item label="大连市" prop="addressSelectedOptions">
                            <el-cascader
                                style="width: 100%;"
                                placeholder="请选择地市街道"
                                :options="alertAdd.ruleForm.addressOptions"
                                v-model="alertAdd.ruleForm.addressSelectedOptions"
                                @change="handleChange"
                                filterable>
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" >
                        <el-form-item label="小区名称" prop="xiaoquName">
                            <el-autocomplete
                                style="width: 100%;"
                                class="inline-input"
                                v-model="alertAdd.ruleForm.xiaoquName"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入小区名字"
                                @select=""
                                ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3"></el-col>
                </el-row>

                <el-row type="flex" class="row-bg" :gutter="20">
                    <el-col :span="1"></el-col>
                    <el-col :span="10">
                        <el-form-item label="目的用途" prop="purpose">
                            <el-input v-model="alertAdd.ruleForm.purpose"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="自定义" prop="label">
                            <el-input v-model="alertAdd.ruleForm.label"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3"></el-col>
                </el-row>
            </el-form>
            <!-- <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="11">aaa</el-col>
              <el-col :span="11">ss</el-col>
            </el-row> -->
          </div>



          <span slot="footer" class="dialog-footer">
            <el-button @click="alertAdd.visible = false;resetForm('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="submitAdd('ruleForm')">确 定 </el-button>
          </span>
        </el-dialog>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                
                formData :{
                    searchText: '',
                    isShare:0,
                    isShareList:[
                        {
                            name: '不限',
                            id: 0,
                            choosed: true,
                        },{
                            name: '共享池',
                            id: 1,
                            choosed: false,
                        },
                    ],
                    type:0,
                    typeList:[
                        {
                            name: '买卖',
                            id: 0,
                            choosed: true,
                        },{
                            name: '租赁',
                            id: 1,
                            choosed: false,
                        },
                    ],
                    guestgrade:0,
                    guestgradeList:[
                        {
                            name: '不限',
                            id: 0,
                            choosed: true,
                        },{
                            name: '一星',
                            id: 1,
                            choosed: false,
                        },{
                            name: '二星',
                            id: 2,
                            choosed: false,
                        },{
                            name: '三星',
                            id: 3,
                            choosed: false,
                        },
                    ],
                },
                tableData: [
                    {
                        id: 0,
                        name: '李狗剩',
                        level: 2,
                        need: '南北通透, 高层, 有电梯',
                        entrust_time: '无',
                        maintain_time: '20分钟前'
                    },
                    {
                        id: 1,
                        name: '刘翠花',
                        level: 3,
                        need: '南向, 高层, 有电梯, 公共面积少',
                        entrust_time: '2018-07-20',
                        maintain_time: '一个小时前'
                    }
                ],
                alertAdd:{
                    visible:false,
                    ruleForm: {
                        guestname: "李某某",  //客源姓名
                        sex: "男",  //客源性别
                        guestgrade: "A",  //客源星级(A,B,C)
                        type: "0",  //客源类型(0:买,1:租)
                        heartprice: "195万",  //心里价位
                        phone: "1561684151",  //联系电话
                        remarks: "装修好的",  //备注简介
                        areas: "95",  //需求面积
                        addressSelectedOptions:[],
                        addressOptions:[{
                            value: 'zhinan',
                                  label: '中山区',
                                  children: [{
                                    value: 'shejiyuanze',
                                    label: '人民街道'}]
                        }],
                        xiaoquOptions:[],
                        xiaoquName: '',
                        huxingshi: "3",  //需求几室
                        huxingting: "2",  //需求几厅
                        huxingwei: "1",  //需求几卫
                        huxingchu: "1",  //需求几厨
                        // position: "中山街街道",  //需求位置
                        purpose: "住",  //目的用途
                        label: "自定义",  //自定义标签
                    },
                    rules: {
                        guestname: [
                          { required: true, message: '请输入客源姓名', trigger: 'blur' },
                        ],
                        sex: [
                          { required: true, message: '请输入客源性别', trigger: 'blur' },
                        ],
                        guestgrade: [
                          { required: true, message: '请选择客源星级', trigger: 'change' },
                        ],
                        type: [
                          { required: true, message: '请选择客源类型', trigger: 'change' },
                        ],
                        heartprice: [
                          { required: true, message: '请输入心理价位', trigger: 'blur' },
                        ],
                        phone: [
                          { required: true, message: '请输入客源电话', trigger: 'blur' },
                        ],
                        remarks: [
                          { required: true, message: '请输入备注信息', trigger: 'blur' },
                        ],
                        areas: [
                          { required: true, message: '请输入需求面积', trigger: 'blur' },
                        ],

                        addressSelectedOptions: [
                          { required: true, message: '请选择市区街道', trigger: 'change' },
                        ],
                        xiaoquName: [
                          { required: true, message: '请输入小区', trigger: 'blur' },
                        ],

                        huxingshi: [
                          { required: true, message: '请输入室数量', trigger: 'blur' },
                        ],
                        huxingting: [
                          { required: true, message: '请输入厅数量', trigger: 'blur' },
                        ],
                        huxingwei: [
                          { required: true, message: '请输入卫生间数量', trigger: 'blur' },
                        ],
                        huxingchu: [
                          { required: true, message: '请输入厨房数量', trigger: 'blur' },
                        ],

                        purpose: [
                          { required: true, message: '请输入目的用途', trigger: 'blur' },
                        ],
                        label: [
                          { required: true, message: '请输入自定义标签', trigger: 'blur' },
                        ],
                    },
                }

            };
        },

        computed: {
        },


        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitAdd(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                  if (valid) {
                      console.log('submit!!');
                        this.$confirm('确定新增该房源?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                            // HouseApi.addhouse(this.alertAdd.ruleForm).then(function (result) {
                            //     console.log(result);
                            //     if(typeof(result) != "object"){result = JSON.parse(result)}

                            //     Message({
                            //         message: "新增房源成功",
                            //         type: 'success'
                            //     });
                            //     that.alertAdd.visible=false;
                            //     resetForm(ruleForm);
                            // }).catch(error => {
                            //     console.log('addhouse_error');
                            // });
                        }).catch(() => {
                          this.$message({
                            type: 'info',
                            message: '已取消保存'
                          });
                        });
                  } else {
                      console.log('error submit!!');
                      // alert('请填写完成!');
                      return false;
                  }
              });
            },
            search(){
                var postData = {
                    searchText: this.formData.searchText, 
                    isShare: this.formData.isShare,
                    type: this.formData.type,
                    guestgrade: this.formData.guestgrade,
                }
                console.log(postData);
            },
            getId(index, list){
                var id = 0;
                list.forEach((item) => {
                    item.choosed = false;
                });
                list[index].choosed = true;
                id = list[index].id;
                return id;
            },

            //范围
            searchIsShare(index, list){
               var id = this.getId(index, list);
               this.formData.isShare = id;
               this.search();
            },
            // 类型
            searchType(index, list){
                var id = this.getId(index, list);
                this.formData.type = id;
                this.search();
            },
            //星级
            searchGuestgrade(index, list){
                var id = this.getId(index, list);
                this.formData.guestgrade = id;
                this.search();
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
                box-shadow: 0px 0px 10px #e3e3e3;
                // border: 1px solid #d7d7d7;
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
                box-shadow: 0px 0px 10px #e3e3e3;
                // border: 1px solid #d7d7d7;
                .el-table{
                    /*border: 1px solid #d7d7d7;*/
                    
                }
            }
        }


    }
</style>
