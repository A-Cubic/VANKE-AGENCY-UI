<template>
    <section class="houseResource">
        <!--<el-row class="wrap" :gutter="24">-->
            <!--<el-col :span="24" class="warp-breadcrum">-->
        <div class="house_template">
            <div class="house_search">
                <div class="house_search_header">
                    <el-input size="medium" v-model="formData.searchMes" placeholder="请输入内容"></el-input>
                    <el-button size="medium"  type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button type="primary" icon="el-icon-plus" class="add_button" @click="alertAdd.visible=true">新增房源</el-button>
                </div>
                <div class="house_search_block">
                    <el-form :model="formData" ref="formData" class="form-wrap">
                        <el-form-item label="商圈:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.businessList"
                                       @click="searchHouseType(index, formData.houseTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>
                        

                        <el-form-item label="价格:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.totalPriceList"
                                       @click="searchTotalPrice(index, formData.totalPriceList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>

                        <el-form-item label="面积:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.areaList"
                                       @click="searchTotalPrice(index, formData.totalPriceList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="房型:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.houseTypeList"
                                       @click="searchHouseType(index, formData.houseTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="朝向:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.towardList"
                                       @click="searchHouseType(index, formData.houseTypeList)">
                                {{ item.name }}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="楼层:">
                            <el-button :type="item.choosed == false ? '' : 'primary'"
                                       size="mini"
                                       v-for="(item, index) in formData.floorList"
                                       @click="searchHouseType(index, formData.houseTypeList)">
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
                <el-table :data="tableData.tableList"  size="medium" style="width: 100%" @row-click="examineById">
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
                            :page-size="tableData.pageSize"
                            :current-page.sync="tableData.pageCurrent"
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
                        <el-form-item label="价钱" prop="add_price">
                            <el-input v-model="alertAdd.ruleForm.add_price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="面积" prop="add_area">
                            <el-input v-model="alertAdd.ruleForm.add_area">></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1" style="text-align: center; line-height: 40px">
                        m2
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="朝向" prop="add_orientation">
                            <el-select v-model="alertAdd.ruleForm.add_orientation" style="width: 100%;" placeholder="请选择房屋朝向">
                                <el-option label="正南" value="0"></el-option>
                                <el-option label="正北" value="1"></el-option>
                                <el-option label="正东" value="2"></el-option>
                                <el-option label="正西" value="3"></el-option>
                                <el-option label="东南" value="4"></el-option>
                                <el-option label="西南" value="5"></el-option>
                                <el-option label="东北" value="6"></el-option>
                                <el-option label="西北" value="7"></el-option>
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
                            <el-input v-model="alertAdd.ruleForm.add_room" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="室" label-width="40px" prop="add_hall">
                            <el-input v-model="alertAdd.ruleForm.add_hall"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="厅" label-width="40px" prop="add_toilet">
                            <el-input v-model="alertAdd.ruleForm.add_toilet"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="卫" label-width="40px" prop="add_kitchen">
                            <el-input v-model="alertAdd.ruleForm.add_kitchen"></el-input>
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
                        <el-form-item label="有无钥匙" prop="add_has_key">
                            <el-select v-model="alertAdd.ruleForm.add_has_key" style="width: 100%;" placeholder="请选择有无钥匙">
                                <el-option label="有钥匙" value="0"></el-option>
                                <el-option label="无钥匙" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="隐藏面积" prop="add_hide_area">
                            <el-input v-model="alertAdd.ruleForm.add_hide_area"></el-input>
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
                        <el-form-item label="房屋等级" prop="add_grade">
                            <el-select v-model="alertAdd.ruleForm.add_grade" style="width: 100%;" placeholder="请选择房屋等级">
                                <el-option label="A" value="0"></el-option>
                                <el-option label="B" value="1"></el-option>
                                <el-option label="C" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房屋类型" prop="add_type">
                            <el-select v-model="alertAdd.ruleForm.add_type" style="width: 100%;" placeholder="请选择房屋类型">
                                <el-option label="买卖" value="0"></el-option>
                                <el-option label="租赁" value="1"></el-option>
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
									    :options="alertAdd.ruleForm.addressOptions"
									    v-model="alertAdd.ruleForm.addressSelectedOptions"
									    @change=""
									    >
									  </el-cascader>
		              </el-form-item>
			          </el-col>
			          <el-col :span="10" >
		              <el-form-item label="小区名称" prop="region">
		                <el-autocomplete
                        style="width: 100%;"
                          class="inline-input"
                          v-model="alertAdd.ruleForm.region"
                          :fetch-suggestions="querySearch"
                          placeholder="请输入小区名字"
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
                        <el-form-item label="" prop="add_tower">
                            <el-input v-model="alertAdd.ruleForm.add_tower"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="号楼" label-width="50px" prop="add_unit">
                            <el-input v-model="alertAdd.ruleForm.add_unit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="单元" label-width="50px" prop="add_layer">
                            <el-input v-model="alertAdd.ruleForm.add_layer"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="层 /" label-width="50px" prop="add_allLayer">
                            <el-input v-model="alertAdd.ruleForm.add_allLayer"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="层(顶层)" label-width="80px" prop="add_mark">
                            <el-input v-model="alertAdd.ruleForm.add_mark"></el-input>
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
                        <el-form-item label="房主信息" prop="add_owner_mes">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房主姓名" prop="add_owner_name">
                            <el-input v-model="alertAdd.ruleForm.add_owner_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房主电话" prop="add_owner_phone">
                            <el-input v-model="alertAdd.ruleForm.add_owner_phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" >
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="1" >
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房主姓名" prop="add_owner_name_bak">
                            <el-input v-model="alertAdd.ruleForm.add_owner_name_bak"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="房主电话" prop="add_owner_phone_bak">
                            <el-input v-model="alertAdd.ruleForm.add_owner_phone_bak"></el-input>
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
export default {
    data() {
        return {
            
            formData :{
                searchMes: '',  //搜索框
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
                areaList:[
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
                areaId: 0,
                businessList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },
                    {
                        name: '中山',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '西岗',
                        id: 2,
                        choosed: false,
                    },
                    {
                        name: '沙河口',
                        id: 3,
                        choosed: false,
                    },
                    {
                        name: '甘井子',
                        id: 4,
                        choosed: false,
                    },
                    {
                        name: '旅顺口',
                        id: 5,
                        choosed: false,
                    },
                    {
                        name: '金州',
                        id: 6,
                        choosed: false,
                    },
                    {
                        name: '长海',
                        id: 7,
                        choosed: false,
                    },
                    {
                        name: '瓦房店',
                        id: 8,
                        choosed: false,
                    },
                    {
                        name: '普兰店',
                        id: 9,
                        choosed: false,
                    },
                    {
                        name: '庄河',
                        id: 10,
                        choosed: false,
                    },
                    {
                        name: '高新园区',
                        id: 11,
                        choosed: false,
                    },
                    {
                        name: '开发区',
                        id: 12,
                        choosed: false,
                    }
                ],
                businessId: 0,
                towardList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },
                    {
                        name: '东',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '东南',
                        id: 2,
                        choosed: false,
                    },
                    {
                        name: '南',
                        id: 3,
                        choosed: false,
                    },
                    {
                        name: '西南',
                        id: 4,
                        choosed: false,
                    },
                    {
                        name: '西',
                        id: 5,
                        choosed: false,
                    },
                    {
                        name: '西北',
                        id: 6,
                        choosed: false,
                    },
                    {
                        name: '北',
                        id: 7,
                        choosed: false,
                    },
                    {
                        name: '东北',
                        id: 8,
                        choosed: false,
                    },
                    {
                        name: '南北',
                        id: 9,
                        choosed: false,
                    },
                    {
                        name: '东西',
                        id: 10,
                        choosed: false,
                    }
                ],
                towardId: 0,
                floorList:[
                    {
                        name: '不限',
                        id: 0,
                        choosed: true,
                    },{
                        name: '地下室',
                        id: 1,
                        choosed: false,
                    },
                    {
                        name: '一层',
                        id: 2,
                        choosed: false,
                    },
                    {
                        name: '顶层',
                        id: 3,
                        choosed: false,
                    },
                    {
                        name: '其他',
                        id: 4,
                        choosed: false,
                    },
                ],
                floorId: 0,
            },
            tableData: {
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
            },
            
            alertAdd:{
                active:0,
                visible:true,
                ruleForm: {
                	add_price: '',
                	add_area: '',
                	add_orientation:'',

                	add_room:'',
                	add_hall:'',
                	add_toilet:'',
                	add_kitchen:'',

                	add_has_key:'',
                	add_hide_area:'',

                	add_grade:'',
                	add_type:'',

                	addressOptions:[{
                		value: 'zhinan',
					          label: '中山区',
					          children: [{
					            value: 'shejiyuanze',
					            label: '人民街道'}]
                	}],
                	addressSelectedOptions:[],
                    region:'',

                	add_tower: '',
                	add_unit: '',
                	add_layer: '',
                	add_allLayer: '',
                	add_mark: '',

                	add_owner_name: '',  //房主姓名*
                	add_owner_phone: '',  //房主电话*
                	add_owner_name_bak: '',  //房主姓名
                	add_owner_phone_bak: '',  //房主姓名
                },
                rules: {
                    add_price: [
                      { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                    add_area: [
                      { required: true, message: '请输入面积', trigger: 'blur' },
                    ],
                    add_orientation: [
                      { required: true, message: '请选择朝向', trigger: 'change' },
                    ],

                    add_room: [
                      { required: true, message: '请输入卧室数量', trigger: 'blur' },
                    ],
                    add_hall: [
                      { required: true, message: '请输入厅数量', trigger: 'blur' },
                    ],
                    add_toilet: [
                      { required: true, message: '请输入卫生间数量', trigger: 'blur' },
                    ],
                    add_kitchen: [
                      { required: true, message: '请输入厨房数量', trigger: 'blur' },
                    ],

                    add_has_key: [
                      { required: true, message: '请选择有无钥匙', trigger: 'change' },
                    ],
                    add_hide_area: [
                      { required: true, message: '请输入隐藏面积', trigger: 'blur' },
                    ],

                    add_grade: [
                      { required: true, message: '请选择房屋等级', trigger: 'change' },
                    ],
                    add_type: [
                      { required: true, message: '请选择房屋类型', trigger: 'change' },
                    ],
                    addressSelectedOptions: [
                      { required: true, message: '请选择市区街道', trigger: 'change' },
                    ],
                    region: [
                      { required: true, message: '请选择小区', trigger: 'blur' },
                    ],
                    add_tower: [
                      { required: true, message: '请输入楼号', trigger: 'blur' },
                    ],
                    add_unit: [
                      { required: true, message: '请输入单元', trigger: 'blur' },
                    ],
                    add_layer: [
                      { required: true, message: '请输入楼层', trigger: 'blur' },
                    ],
                    add_allLayer: [
                      { required: true, message: '请输入总楼层', trigger: 'blur' },
                    ],
                    add_mark: [
                      { required: true, message: '请输入门牌号', trigger: 'blur' },
                    ],


                    add_owner_name:[
                      { required: true, message: '请添加房主姓名', trigger: 'blur' },
                    ],
                    add_owner_phone:[
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
    },
    

    methods: {

        querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
	    	resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
       
        submitAdd(ruleForm){
        	if(this.alertAdd.active == 0){
        		  this.$refs[ruleForm].validate((valid) => {
                  if (valid) {
                      console.log('submit!!');
                        this.$confirm('确定新增该房源?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          //  确定新增接口
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
            var postData = {
                searchMes: this.formData.searchMes,
                houseTypeId: this.formData.houseTypeId,
                totalPriceId: this.formData.totalPriceId,
            }
            console.log(postData);
        },
        searchHouseType(index, list){
           var id = this.getId(index, list);
           this.formData.houseTypeId = id;
           this.search();
        }, //房型
        searchTotalPrice(index, list){
           var id = this.getId(index, list);
           this.formData.totalPriceId = id;
           this.search();
        }, //价格
        getId(index, list){
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
