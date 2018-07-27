<template>
    <section class="houseResource">
        <!--<el-row class="wrap" :gutter="24">-->
            <!--<el-col :span="24" class="warp-breadcrum">-->
        <div class="house_template">
            <div class="house_search">
                <div class="house_search_header">
                    <el-input size="medium" v-model="formData.searchText" placeholder="请输入内容"></el-input>
                    <el-button size="medium"  type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    <el-button type="primary" icon="el-icon-plus" class="add_button" @click="alertAdd.visible=true">新增房源</el-button>
                </div>
                <div class="house_search_block">
                    <el-form :model="formData" ref="formData" class="form-wrap">
                        <el-form-item label="范围:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.rangeTypeList"
                                       @click="searchRangeType(index, formData.rangeTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>

                        <el-form-item label="类型:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.typeList"
                                       @click="searchType(index, formData.typeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>

                        <el-form-item label="位置:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.positionTypeList"
                                       @click="searchPositionType(index, formData.positionTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>


                        <el-form-item v-if="formData.type == 1" label="价格:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.priceTypeSellList"
                                       @click="searchPriceType(index, formData.priceTypeSellList)">
                                {{ item.name }}
                            </el-button>
                             <el-input size="mini" v-model="formData.priceUp" placeholder="请输入"></el-input> 万 -
                            <el-input size="mini" v-model="formData.priceDown" placeholder="请输入"></el-input> 万
                            <el-button type="text" @click="search">确定</el-button>
                        </el-form-item>

                        <el-form-item v-else label="价格:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.priceTypeRentList"
                                       @click="searchPriceType(index, formData.priceTypeRentList)">
                                {{ item.name }}
                            </el-button>
                             <el-input size="mini" v-model="formData.priceUp" placeholder="请输入"></el-input> 元 -
                            <el-input size="mini" v-model="formData.priceDown" placeholder="请输入"></el-input> 元
                            <el-button type="text" @click="search">确定</el-button>
                        </el-form-item>




                        <el-form-item label="面积:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.areaTypeList"
                                       @click="searchAreaType(index, formData.areaTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="房型:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.huxingTypeList"
                                       @click="searchUnitType(index, formData.huxingTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="朝向:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.chaoxiangTypeList"
                                       @click="searchTowardType(index, formData.chaoxiangTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="楼层:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.floorTypeList"
                                       @click="searchFloorType(index, formData.floorTypeList)">
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
                <el-table :data="tableData.list"  size="medium" style="width: 100%" @row-click="examineById">
                    <el-table-column fixed label="标题图" width="180">
                        <template scope="scope">
                            <img class="imageUrl" :src="scope.row.titleimg" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="xiaoquName" label="楼盘名称" width="180"></el-table-column>
                    <el-table-column prop="huxing" label="户型"></el-table-column>
                    <el-table-column prop="areas" label="面积"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column prop="floor" label="楼层"></el-table-column>
                    <el-table-column prop="chaoxiang" label="朝向"></el-table-column>
                    <el-table-column prop="recordrelName" label="维护人"></el-table-column>
                </el-table>
                <div class="table-pagination">
                   <el-pagination
                            layout="prev, pager, next, jumper, total"
                            :page-size="tableData.pageSize"
                            :current-page.sync="tableData.pageNum"
                            :total ="tableData.total"
                            @current-change="handleCurrentChangeSearch">
                    </el-pagination>
                </div>
            </div>



        </div>

            <!--</el-col>-->
        <!--</el-row>-->
        <el-dialog
          title="新增房源"
          :visible.sync="alertAdd.visible"
          width="80%"
          >
          <div >

            <el-form :model="alertAdd.ruleForm" :rules="alertAdd.rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">

                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="价钱" prop="price">
                            <el-input v-model="alertAdd.ruleForm.price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="面积" prop="areas">
                            <el-input v-model="alertAdd.ruleForm.areas">></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1" style="text-align: center; line-height: 40px">
                        m2
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="朝向" prop="chaoxiang">
                            <el-select v-model="alertAdd.ruleForm.chaoxiang" style="width: 100%;" placeholder="请选择房屋朝向">
                                <el-option label="正南" value="1"></el-option>
                                <el-option label="正北" value="2"></el-option>
                                <el-option label="正东" value="3"></el-option>
                                <el-option label="正西" value="4"></el-option>
                                <el-option label="东南" value="5"></el-option>
                                <el-option label="西南" value="6"></el-option>
                                <el-option label="东北" value="7"></el-option>
                                <el-option label="西北" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" >
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="户型" prop="add_room">
                            <el-input v-model="alertAdd.ruleForm.huxingshi" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="室" label-width="40px" prop="add_hall">
                            <el-input v-model="alertAdd.ruleForm.huxingting"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="厅" label-width="40px" prop="add_toilet">
                            <el-input v-model="alertAdd.ruleForm.huxingwei"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="卫" label-width="40px" prop="add_kitchen">
                            <el-input v-model="alertAdd.ruleForm.huxingchu"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1" style="text-align: center; line-height: 40px">
                        厨
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="有无钥匙" prop="iskey">
                            <el-select v-model="alertAdd.ruleForm.iskey" style="width: 100%;" placeholder="请选择有无钥匙">
                                <el-option label="有钥匙" value="1"></el-option>
                                <el-option label="无钥匙" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="隐藏面积" prop="hiddenarea">
                            <el-input v-model="alertAdd.ruleForm.hiddenarea"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1" style="text-align: center; line-height: 40px">
                        m2
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房屋等级" prop="grade">
                            <el-select v-model="alertAdd.ruleForm.grade" style="width: 100%;" placeholder="请选择房屋等级">
                                <el-option label="A" value="1"></el-option>
                                <el-option label="B" value="2"></el-option>
                                <el-option label="C" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房屋类型" prop="type">
                            <el-select v-model="alertAdd.ruleForm.type" style="width: 100%;" placeholder="请选择房屋类型">
                                <el-option label="买卖" value="1"></el-option>
                                <el-option label="租赁" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg" >
                  <el-col :span="1" >
                  </el-col>
                  <el-col :span="10">
		              <el-form-item label="大连市" prop="addressSelectedOptions">
		                <el-cascader
		                	style="width: 100%;"
                            placeholder="请选择地市街道"
									    :options="alertAdd.ruleForm.addressOptions"
									    v-model="alertAdd.ruleForm.addressSelectedOptions"
                            @change="handleChange"
                            filterable

									    >
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
                            @select="handleSelect"
                        ></el-autocomplete>

		              </el-form-item>
		              </el-col>
                  <el-col :span="3" >
                  </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="" prop="numfloor">
                            <el-input v-model="alertAdd.ruleForm.numfloor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="号楼" label-width="50px" prop="numunit">
                            <el-input v-model="alertAdd.ruleForm.numunit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="单元" label-width="50px" prop="floor">
                            <el-input v-model="alertAdd.ruleForm.floor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="层 /" label-width="50px" prop="maxfloor">
                            <el-input v-model="alertAdd.ruleForm.maxfloor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="层(顶层)" label-width="80px" prop="numhousehold">
                            <el-input v-model="alertAdd.ruleForm.numhousehold"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1" style="text-align: center; line-height: 40px">
                        号
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="10" >
                        <el-form-item label="房主信息">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房主姓名" prop="owner">
                            <el-input v-model="alertAdd.ruleForm.owner"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房主电话" prop="phone">
                            <el-input v-model="alertAdd.ruleForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房主姓名" prop="owner1">
                            <el-input v-model="alertAdd.ruleForm.owner1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房主电话" prop="phone1">
                            <el-input v-model="alertAdd.ruleForm.phone1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
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
    import HouseApi from '../api/api_house.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
export default {
    install(Vue) {
        Vue.prototype.$message = Message
    },
    data() {
        return {

            formData :{
                searchText: '',  //搜索框
                rangeTypeList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },
                    {
                        name: '范围盘',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '共享池',
                        id: 2,
                        choosed: false,
                    }
                ],
                rangeType:0,
                typeList:[
                    {
                        name: '买卖',
                        id: 1,
                        choosed: true,
                    },
                    {
                        name: '租赁',
                        id: 2,
                        choosed: false,
                    }
                ],
                type:1,
                positionType:0,
                positionTypeList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },
                    {
                        name: '中山区',
                        id: 210202,
                        choosed: false,
                    },
                    {
                        name: '西岗区',
                        id: 210203,
                        choosed: false,
                    },
                    {
                        name: '沙河口区',
                        id: 210204,
                        choosed: false,
                    },
                    {
                        name: '甘井子区',
                        id: 210211,
                        choosed: false,
                    },
                    {
                        name: '旅顺口区',
                        id: 210212,
                        choosed: false,
                    },
                    {
                        name: '金州',
                        id: 210213,
                        choosed: false,
                    },
                    {
                        name: '长海县',
                        id: 210224,
                        choosed: false,
                    },
                    {
                        name: '瓦房店',
                        id: 210281,
                        choosed: false,
                    },
                    {
                        name: '普兰店',
                        id: 210282,
                        choosed: false,
                    },
                    {
                        name: '庄河',
                        id: 210283,
                        choosed: false,
                    },
                    // {
                    //     name: '高新园区',
                    //     id: 11,
                    //     choosed: false,
                    // },
                    // {
                    //     name: '开发区',
                    //     id: 12,
                    //     choosed: false,
                    // }
                ],
                priceType:0,
                priceUp: '',
                priceDown: '',
                priceTypeSellList:[
                    {
                        name: '不限',
                        value: '',
                        id: 0,
                        choosed: true,
                    },{
                        name: '30万以下',
                        value: '-300000',
                        id: 1,
                        choosed: false,
                    },{
                        name: '30万-40万',
                        value: '300000-400000',
                        id: 2,
                        choosed: false,
                    },{
                        name: '40万-50万',
                        value: '400000-500000',
                        id: 3,
                        choosed: false,
                    },{
                        name: '50万-60万',
                        value: '500000-600000',
                        id: 4,
                        choosed: false,
                    },{
                        name: '60万-80万',
                        value: '600000-800000',
                        id: 5,
                        choosed: false,
                    },{
                        name: '80万-100万',
                        value: '800000-1000000',
                        id: 6,
                        choosed: false,
                    },{
                        name: '100万-150万',
                        value: '1000000-1500000',
                        id: 7,
                        choosed: false,
                    },{
                        name: '150万-200万',
                        value: '1500000-2000000',
                        id: 8,
                        choosed: false,
                    },{
                        name: '200万以上',
                        value: '2000000-',
                        id: 9,
                        choosed: false,
                    },
                ],  //出售
                priceTypeRentList:[
                    {
                        name: '不限',
                        value: '',
                        id: 0,
                        choosed: true,
                    },{
                        name: '500元以下',
                        value: '-500',
                        id: 1,
                        choosed: false,
                    },{
                        name: '500元-800元',
                        value: '500-800',
                        id: 2,
                        choosed: false,
                    },{
                        name: '800元-1500元',
                        value: '800-1500',
                        id: 3,
                        choosed: false,
                    },{
                        name: '1500元-2000元',
                        value: '1500-2000',
                        id: 4,
                        choosed: false,
                    },{
                        name: '2000元-3000元',
                        value: '2000-3000',
                        id: 5,
                        choosed: false,
                    },{
                        name: '3000元-5000元',
                        value: '3000-5000',
                        id: 6,
                        choosed: false,
                    },{
                        name: '5000元以上',
                        value: '5000-',
                        id: 7,
                        choosed: false,
                    }
                ],  //租赁
                areaType: 0,
                areaTypeList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },
                    {
                        name: '50平米以下',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '50-70平米',
                        id: 2,
                        choosed: false,
                    },
                    {
                        name: '70-90平米',
                        id: 3,
                        choosed: false,
                    },
                    {
                        name: '90-110平米',
                        id: 4,
                        choosed: false,
                    },
                    {
                        name: '110-130平米',
                        id: 5,
                        choosed: false,
                    },
                    {
                        name: '130-150平米',
                        id: 6,
                        choosed: false,
                    },
                    {
                        name: '150-200平米',
                        id: 7,
                        choosed: false,
                    },
                    {
                        name: '200平米以上',
                        id: 8,
                        choosed: false,
                    }
                ],
                huxingType: 0,
                huxingTypeList:[
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
                    },
                    {
                        name: '五室',
                        id: 5,
                        choosed: false,
                    },
                    {
                        name: '五室以上',
                        id: 6,
                        choosed: false,
                    }
                ],
                chaoxiangType: 0,
                chaoxiangTypeList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },
                    {
                        name: '正南',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '正北',
                        id: 2,
                        choosed: false,
                    },
                    {
                        name: '正东',
                        id: 3,
                        choosed: false,
                    },
                    {
                        name: '正西',
                        id: 4,
                        choosed: false,
                    },
                    {
                        name: '东南',
                        id: 5,
                        choosed: false,
                    },
                    {
                        name: '西南',
                        id: 6,
                        choosed: false,
                    },
                    {
                        name: '东北',
                        id: 7,
                        choosed: false,
                    },
                    {
                        name: '西北',
                        id: 8,
                        choosed: false,
                    },
                    // {
                    //     name: '南北',
                    //     id: 9,
                    //     choosed: false,
                    // },
                    // {
                    //     name: '东西',
                    //     id: 10,
                    //     choosed: false,
                    // }
                ],
                floorType: 0,
                floorTypeList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },{
                        name: '低',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '中',
                        id: 2,
                        choosed: false,
                    },
                    {
                        name: '高',
                        id: 3,
                        choosed: false,
                    }
                ],
            },
            tableData: {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                list: [
                {
                    id: 0,
                    titleimg: '',
                    xiaoquName: '',
                    huxing: '',
                    areas: '',
                    price: '',
                    floor: '',
                    chaoxiang: '',
                    recordrelName: ''
                }
                ],
            },

            alertAdd:{
                active:0,
                visible:false,
                ruleForm: {
                    price: '',
                    areas: '',
                    chaoxiang: '',
                    huxingshi: '',
                    huxingting: '',
                    huxingwei: '',
                    huxingchu: '',
                    iskey: '',
                    hiddenarea: '',
                    grade: '',
                    type: '',
                	addressOptions:[{
                		value: '',
					          label: '',
					          children: [{
					            value: '',
					            label: ''}]
                	}],
                    xiaoquOptions:[],
                    xiaoquName: '',
                	addressSelectedOptions:[],
                    regionCode: '',
                    streetId: '',
                    floor: '',
                    maxfloor: '',
                    numfloor: '',
                    numunit: '',
                    numhousehold: '',
                    owner: '',  //房主姓名*
                    phone: '',  //房主电话*
                    owner1: '',  //房主姓名
                    phone1: '',  //房主姓名
                },
                rules: {
                    price: [
                      { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                    areas: [
                      { required: true, message: '请输入面积', trigger: 'blur' },
                    ],
                    chaoxiang: [
                      { required: true, message: '请选择朝向', trigger: 'change' },
                    ],
                    huxingshi: [
                      { required: true, message: '请输入卧室数量', trigger: 'blur' },
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
                    iskey: [
                      { required: true, message: '请选择有无钥匙', trigger: 'change' },
                    ],
                    hiddenarea: [
                      { required: true, message: '请输入隐藏面积', trigger: 'blur' },
                    ],
                    grade: [
                      { required: true, message: '请选择房屋等级', trigger: 'change' },
                    ],
                    type: [
                      { required: true, message: '请选择房屋类型', trigger: 'change' },
                    ],
                    addressSelectedOptions: [
                      { required: true, message: '请选择市区街道', trigger: 'change' },
                    ],
                    xiaoquName: [
                      { required: true, message: '请输入小区', trigger: 'blur' },
                    ],
                    numfloor: [
                      { required: true, message: '请输入楼号', trigger: 'blur' },
                    ],
                    numunit: [
                      { required: true, message: '请输入单元', trigger: 'blur' },
                    ],
                    floor: [
                      { required: true, message: '请输入楼层', trigger: 'blur' },
                    ],
                    maxfloor: [
                      { required: true, message: '请输入总楼层', trigger: 'blur' },
                    ],
                    numhousehold: [
                      { required: true, message: '请输入门牌号', trigger: 'blur' },
                    ],
                    owner:[
                      { required: true, message: '请添加房主姓名', trigger: 'blur' },
                    ],
                    phone:[
                      { required: true, message: '请添加房主电话', trigger: 'blur' },
                    ]
                },
                examineForm:{
                    bedroom: [
                        {
                            imgId: 0,
                            imgUrl: ''
                        },
                        {
                            imgId: 1,
                            imgUrl: ''
                        },
                    ],
                    sittingRoom: [
                        {
                            imgId: 1,
                            imgUrl: ''
                        },
                    ],
                    toilet: [
                        {
                            imgId: 0,
                            imgUrl: ''
                        }
                    ],
                    kitchen: [
                        {
                            imgId: 1,
                            imgUrl: ''
                        },
                    ],
                    houseTypeImg: [
                        {
                            imgId: 0,
                            imgUrl: ''
                        }
                    ],
                    other: [
                        {
                            imgId: 1,
                            imgUrl: ''
                        },
                    ],
                },
            }

        };
    },

    computed: {
        priceTypeList(){
            var priceTypeList =[];
            if(this.formData.type==1){
                priceTypeList=[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },{
                        name: '30万以下',
                        id: 1,
                        choosed: false,
                    },{
                        name: '30万-40万',
                        id: 2,
                        choosed: false,
                    },{
                        name: '40万-50万',
                        id: 3,
                        choosed: false,
                    },{
                        name: '50万-60万',
                        id: 4,
                        choosed: false,
                    },{
                        name: '60万-80万',
                        id: 5,
                        choosed: false,
                    },{
                        name: '80万-100万',
                        id: 6,
                        choosed: false,
                    },{
                        name: '100万-150万',
                        id: 7,
                        choosed: false,
                    },{
                        name: '150万-200万',
                        id: 8,
                        choosed: false,
                    },{
                        name: '200万',
                        id: 9,
                        choosed: false,
                    },
                ]
            }else{
                priceTypeList=[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },{
                        name: '500元以下',
                        id: 1,
                        choosed: false,
                    },{
                        name: '500元-800元',
                        id: 2,
                        choosed: false,
                    },{
                        name: '800元-1500元',
                        id: 3,
                        choosed: false,
                    },{
                        name: '1500元-2000元',
                        id: 4,
                        choosed: false,
                    },{
                        name: '2000元-3000元',
                        id: 5,
                        choosed: false,
                    },{
                        name: '3000元-5000元',
                        id: 6,
                        choosed: false,
                    },{
                        name: '5000元以上',
                        id: 7,
                        choosed: false,
                    }
                ]
            }
            return priceTypeList;
        }
    },
    mounted:function(){
        var that = this;
        var postData = {

            page: 1,
            size: 10,
            type: '1'
        };
        HouseApi.houselist(postData).then(function (result) {
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.tableData=result.data;
        }).catch(error => {
            console.log('houselist_error');
        });

        HouseApi.regionslist().then(function (result) {
            console.log(result)
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.alertAdd.ruleForm.addressOptions=result.data;
        }).catch(error => {
            console.log('regionslist_error');
        });

        HouseApi.xiaoqulist().then(function (result) {
            if(typeof(result) != "object"){result = JSON.parse(result)}
            that.alertAdd.ruleForm.xiaoquOptions=result.data;
        }).catch(error => {
            console.log('xiaoqulist_error');
        });

    },

    methods: {
        querySearch(queryString, cb) {
            var restaurants = this.alertAdd.ruleForm.xiaoquOptions;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            //var that = this;
            // console.log(this.alertAdd.ruleForm.xiaoquName);
            //console.log(this.alertAdd.ruleForm.addressSelectedOptions);
        },
        handleChange(item){
            var that = this;
            that.alertAdd.ruleForm.regionCode = item[0];
            that.alertAdd.ruleForm.streetId = item[1];
        },
	    resetForm(formName) {
	        this.$refs[formName].resetFields();
        },

        submitAdd(ruleForm){
            var that = this;
        	if(this.alertAdd.active == 0){
        		  this.$refs[ruleForm].validate((valid) => {
                  if (valid) {
                      console.log('submit!!');
                        this.$confirm('确定新增该房源?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                            HouseApi.addhouse(this.alertAdd.ruleForm).then(function (result) {
                                console.log(result);
                                if(typeof(result) != "object"){result = JSON.parse(result)}

                                Message({
                                    message: "新增房源成功",
                                    type: 'success'
                                });
                                that.alertAdd.visible=false;
                                resetForm(ruleForm);
                            }).catch(error => {
                                console.log('addhouse_error');
                            });
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
        	}
        },

        search(){
            var that = this;
            var postData = {
                priceUp: this.formData.priceUp,
                priceDown: this.formData.priceDown,
                searchText: this.formData.searchText,
                rangeType: this.formData.rangeType,
                type: this.formData.type,
                positionType: this.formData.positionType,
                priceType: this.formData.priceType,
                areaType: this.formData.areaType,
                huxingType: this.formData.huxingType,
                chaoxiangType: this.formData.chaoxiangType,
                floorType: this.formData.floorType,
                page: 1,
                size: 10
            }
            HouseApi.houselist(postData).then(function (result) {
                console.log(result)
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.tableData=result.data;
            }).catch(error => {
                console.log('houselist_error');
            });
        },

        //范围
        searchRangeType(index, list){
           var id = this.getId(index, list);
           this.formData.rangeType = id;
           this.search();
        },
        //类型
        searchType(index, list){
            var that = this;
            that.formData.priceUp = '';
            that.formData.priceDown = '';
            var id = this.getId(index, list);
            this.formData.type = id;
            this.formData.priceType = 0;
            this.formData.priceTypeSellList.forEach((item) => {
                item.choosed = false;
                if(that.formData.priceTypeSellList.indexOf(item) == 0){
                    item.choosed = true;
                };
            })
            this.formData.priceTypeRentList.forEach((item) => {
                item.choosed = false;
                if(that.formData.priceTypeRentList.indexOf(item) == 0){
                    item.choosed = true;
                };
            })
            this.search();
        },
        //位置
        searchPositionType(index, list){
           var id = this.getId(index, list);
           this.formData.positionType = id;
           this.search();
        },
        //价格
        searchPriceType(index, list){
           var id = this.getId(index, list);
           this.formData.priceType = id;
           if(index == 0){
               this.formData.priceUp = '';
               this.formData.priceDown = '';
           }
           else if(index == 1){
            var strBefore;
            if(this.formData.type==1){
                strBefore = list[index].name.split('万');
            }else{
                strBefore = list[index].name.split("元");
            }
               this.formData.priceUp = '';
               this.formData.priceDown = strBefore[0];
           }
           else if(index == list.length-1){
            var strLater
                if(this.formData.type==1){
                    strLater = list[index].name.split("万");
                }else{
                    strLater = list[index].name.split("元");
                }
               this.formData.priceUp = strLater[0];
               this.formData.priceDown = '';
           }
           else{
               var strs = list[index].name.split("-");
               this.formData.priceUp = strs[0].substr(0, strs[0].length-1);
               this.formData.priceDown = strs[1].substr(0, strs[1].length-1);
           }
           this.search();
        },
        //面积
        searchAreaType(index, list){
           var id = this.getId(index, list);
           this.formData.areaType = id;
           this.search();
        },
        //房型
        searchUnitType(index, list){
           var id = this.getId(index, list);
           this.formData.huxingType = id;
           this.search();
        },
        //朝向
        searchTowardType(index, list){
           var id = this.getId(index, list);
           this.formData.chaoxiangType = id;
           this.search();
        },
        //楼层
        searchFloorType(index, list){
           var id = this.getId(index, list);
           this.formData.floorType = id;
           this.search();
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
        getValue(index, list){
            var value = '';
            list.forEach((item) => {
                item.choosed = false;
            });
            list[index].choosed = true;
            value = list[index].value;
            return value;
        },

        handleCurrentChangeSearch(val){
            var that = this;
            var postData = {
                priceUp: this.formData.priceUp,
                priceDown: this.formData.priceDown,
                searchText: this.formData.searchText,
                rangeType: this.formData.rangeType,
                type: this.formData.type,
                positionType: this.formData.positionType,
                priceType: this.formData.priceType,
                areaType: this.formData.areaType,
                huxingType: this.formData.huxingType,
                chaoxiangType: this.formData.chaoxiangType,
                floorType: this.formData.floorType,
                page: this.tableData.pageNum,
                size: 10
            }
            HouseApi.houselist(postData).then(function (result) {
                console.log(result)
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.tableData=result.data;
            }).catch(error => {
                console.log('houselist_error');
            });
        },

        examineById(row){
            console.log(row.id);
            this.$router.push({path: '/admin/houseDetails/'+row.id})
        },

        changeUpload(){

        }, //上传Change
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
            box-shadow: 0px 0px 10px #e3e3e3;
            // border: 1px solid #d7d7d7;
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
                        .el-input{
                            width: 100px;
                            .el-input__inner{
                                text-align: center;
                            }
                        }

                    }
                }
            }

        }

        .house_table{
            margin-top: 20px;
            padding: 20px;
            box-shadow: 0px 0px 10px #e3e3e3;
            // border: 1px solid #d7d7d7;
            .el-table{
                /*border: 1px solid #d7d7d7;*/
                .imageUrl{
                    height: 100px;
                    width: 150px;
                    // border: 1px solid #d7d7d7
                }
            }
            .table-pagination{
                margin-top: 20px;
                text-align: right;
            }
        }
    }

    .el-dialog{
    	.examine-form{
                        .el-form-item{
                            overflow: hidden;
                            .el-upload{
                                width: 100px;
                                height: 100px;
                                line-height: 106px;
                                margin-left: 20px;
                                cursor: pointer;
                                float: left;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .el-upload:hover {
                                border-color: #409EFF;
                            }


                        }

                    }
    }


}
</style>
