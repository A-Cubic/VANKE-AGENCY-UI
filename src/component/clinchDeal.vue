<template>
    <section class="clinch-deal">
        <el-row class="clinch-template" :gutter="0">
            <el-col class="clinch-content" :span="24">
                <div class="search-header">
                    <span>合同编号: </span>
                    <el-input v-model="searchForm.contractnumber" placeholder="请输入合同编号"></el-input>
                    <span>缴费类型: </span>
                    <el-select v-model="searchForm.type" placeholder="请选择缴费状态">
                        <el-option
                                v-for="item in searchForm.payOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <span>成交状态: </span>
                    <el-select v-model="searchForm.state" placeholder="请选择成交状态">
                        <el-option
                                v-for="item in searchForm.dealOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addForm.addFormVisible=true">创建</el-button>
                </div>
                <div class="table-template">
                    <el-table :data="tableForm.list" border>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item prop="buyIntermediaryPrice" label="买方服务费（应缴）">
                                        <span>{{ props.row.buyIntermediaryPrice }}</span>
                                    </el-form-item>
                                    <el-form-item prop="sellIntermediaryPrice" label="卖方服务费（应缴）">
                                        <span>{{ props.row.sellIntermediaryPrice }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyLoanPrice" label="买方贷款费（应缴）">
                                        <span>{{ props.row.buyLoanPrice }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyIntermediaryPayment" label="买方服务费（实缴）">
                                        <span>{{ props.row.buyIntermediaryPayment }}</span>
                                    </el-form-item>
                                    <el-form-item prop="sellIntermediaryPayment" label="卖方服务费（实缴）">
                                        <span>{{ props.row.sellIntermediaryPayment }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyLoanPayment" label="买方贷款费（实缴）">
                                        <span>{{ props.row.buyLoanPayment }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyIntermediaryLack" label="买方服务费（欠缴）">
                                        <span>{{ props.row.buyIntermediaryLack }}</span>
                                    </el-form-item>
                                    <el-form-item prop="sellIntermediaryLack" label="卖方服务费（欠缴）">
                                        <span>{{ props.row.sellIntermediaryLack }}</span>
                                    </el-form-item>
                                    <el-form-item prop="buyLoanLack" label="买方贷款费（欠缴）">
                                        <span>{{ props.row.buyLoanLack }}</span>
                                    </el-form-item>
                                    <el-form-item prop="code" label="证明（点击跳转详情）">
                                        <span> <el-button size="mini" type="text" @click="linkImg(props.row)">查看证明照片</el-button></span>
                                    </el-form-item>
                                    <el-form-item prop="code" label="房源（点击跳转详情）">
                                        <span> <el-button size="mini" type="text" @click="linkHouse(props.row)">查看房源</el-button></span>
                                    </el-form-item>
                                    <el-form-item prop="code" label="客源（点击跳转详情）">
                                        <span> <el-button size="mini" type="text" @click="linkGuest(props.row)">查看客源</el-button></span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" label="成交编号"></el-table-column>
                        <el-table-column prop="contractnumber" label="合同编号"></el-table-column>
                        <el-table-column prop="buytype" label="类型" :formatter="formatter"></el-table-column>
                        <el-table-column prop="createTime" label="创建日期"></el-table-column>
                        <el-table-column prop="createrelName" label="创建人"></el-table-column>
                        <el-table-column prop="type" label="缴费状态">
                            <template slot-scope="scope">
                                <el-tag
                                        :type="scope.row.type === '0' ? 'danger' : 'success'"
                                        disable-transitions>{{scope.row.state== '0'?'欠缴':'已缴清'}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="成交状态">
                            <template slot-scope="scope">
                                <el-tag
                                        :type="scope.row.state === '1' ? 'primary' :scope.row.state === '2'?'warning': 'success'"
                                        disable-transitions>{{scope.row.state== '1'?'创建':scope.row.state== '2'?'等待审核':'成交完成'}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini" type="text" @click="allotHandle(scope.row)">业绩分配</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table-pagination">
                    <el-pagination
                            layout="prev, pager, next, jumper, total"
                            :page-size="tableForm.pageSize"
                            :current-page.sync="tableForm.pageNum"
                            :total ="tableForm.total"
                            @current-change="handleCurrentChangeSearch">
                    </el-pagination>
                </div>
            </el-col>

            <el-dialog title="新增成交表单" :visible.sync="addForm.addFormVisible" width="80%">
                <el-tabs tab-position="left"
                         style="height: 600px;"
                         v-model="editableTabsValue"
                         :stretch="true"
                         :before-leave="tabLeaveHandle">
                        <el-tab-pane  label="添加房源">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-edit-outline"></i> 添加房源</span>
                            <el-scrollbar style="height: 600px;">
                                <div class="look-detail-wrap">
                                    <div class="look-detail-wrap-header">
                                        <el-input placeholder="请输入小区名称" v-model="addForm.addHouseForm.searchHouseForm.xiaoquName" clearable></el-input>
                                        <el-input placeholder="请输入房源编号" v-model="addForm.addHouseForm.searchHouseForm.number" clearable></el-input>
                                        <el-button  type="primary" icon="el-icon-search" @click="searchHouseList">查询</el-button>
                                    </div>
                                    <div class="look-detail-wrap-table">
                                        <el-table :data="addForm.addHouseForm.houseTableData.list" style="width: 100%">
                                            <el-table-column label="标题图">
                                                <template scope="scope">
                                                    <img style="height: 100px;width: 150px;" :src="scope.row.titleimg" alt="">
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="number" label="编号"></el-table-column>
                                            <el-table-column prop="xiaoquName" label="小区"></el-table-column>
                                            <el-table-column prop="areas" label="面积"></el-table-column>
                                            <el-table-column prop="floor" label="楼层"></el-table-column>
                                            <el-table-column prop="price" label="价格"></el-table-column>
                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button size="mini" type="danger" @click="selectedHouse(scope.row)" icon="el-icon-plus" circle></el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="table-pagination" style=" margin-top: 20px;text-align: right;">
                                            <el-pagination
                                                    layout="prev, pager, next, jumper, total"
                                                    :page-size="addForm.addHouseForm.houseTableData.pageSize"
                                                    :current-page.sync="addForm.addHouseForm.houseTableData.pageNum"
                                                    :total ="addForm.addHouseForm.houseTableData.total"
                                                    @current-change="handleHouseTableDataChangeSearch">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane  label="添加客源">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-edit-outline"></i> 添加客源</span>
                            <el-scrollbar style="height: 600px;">
                                <div class="passenger_table">
                                    <div class="passenger-wrap-header">
                                        <el-input placeholder="请输入客源姓名或编号" v-model="addForm.addGuestForm.searchGuestForm.searchText" clearable></el-input>
                                        <el-button class="m-btn-addMenu" type="primary" icon="el-icon-search" @click="searchGuestList">查询</el-button>
                                    </div>
                                    <div class="passenger-wrap-table">
                                        <el-table :data="addForm.addGuestForm.guestTableData.list" style="width: 100%">
                                            <el-table-column fixed label="姓名" width="180">
                                                <template scope="scope">
                                                    <div>
                                                        {{scope.row.guestname}}
                                                    </div>
                                                    <div>
                                                        <i v-for="it in (scope.row.guestgrade=='A'?3:scope.row.guestgrade=='B'?2:1)" class="el-icon-star-on"></i>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="remarks" label="备注"></el-table-column>
                                            <el-table-column prop="createTime" label="委托时间"></el-table-column>
                                            <el-table-column prop="recordTime" label="上次维护时间"></el-table-column>
                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <el-button size="mini" type="danger" @click="selectedGuest(scope.row)" icon="el-icon-plus" circle></el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="table-pagination" style=" margin-top: 20px;text-align: right;">
                                            <el-pagination
                                                    layout="prev, pager, next, jumper, total"
                                                    :page-size="addForm.addGuestForm.guestTableData.pageSize"
                                                    :current-page.sync="addForm.addGuestForm.guestTableData.pageNum"
                                                    :total ="addForm.addGuestForm.guestTableData.total"
                                                    @current-change="handleGuestTableDataChangeSearch">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane  label="基本信息">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-edit-outline"></i> 基本信息</span>
                            <el-form :model="addForm.addFormData"
                                     status-icon
                                     ref="addFormData"
                                     :rules="addForm.rules"
                                     label-width="120px"
                                     label-position="left"
                                     class="demo-ruleForm"
                                     style="margin-top: 10px">

                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <el-form-item label="合同编号:" prop="contractnumber">
                                            <el-input v-model="addForm.addFormData.contractnumber" placeholder="签订合同编号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="10">
                                    <el-col :span="8">
                                        <el-form-item label="买家服务费:" prop="buyIntermediaryPrice">
                                            <el-input v-model="addForm.addFormData.buyIntermediaryPrice" @change="inputChangeHandle" placeholder="买家服务费金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="实缴金额:" prop="buyIntermediaryPayment">
                                            <el-input v-model="addForm.addFormData.buyIntermediaryPayment" @change="inputChangeHandle" placeholder="实际缴纳金额">
                                                <template slot="append">欠{{addForm.addFormData.buyIntermediaryLack}}</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="10">
                                    <el-col :span="8">
                                        <el-form-item label="买家贷款费:" prop="buyLoanPrice">
                                            <el-input v-model="addForm.addFormData.buyLoanPrice" @change="inputChangeHandle" placeholder="买家贷款费金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="实缴金额:" prop="buyLoanPayment">
                                            <el-input v-model="addForm.addFormData.buyLoanPayment" @change="inputChangeHandle" placeholder="实际缴纳金额">
                                                <template slot="append">欠{{addForm.addFormData.buyLoanLack}}</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="10">
                                    <el-col :span="8">
                                        <el-form-item label="卖家服务费:" prop="sellIntermediaryPrice">
                                            <el-input v-model="addForm.addFormData.sellIntermediaryPrice" @change="inputChangeHandle" placeholder="卖家服务费金额"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="实缴金额:" prop="sellIntermediaryPayment">
                                            <el-input v-model="addForm.addFormData.sellIntermediaryPayment" @change="inputChangeHandle" placeholder="实际缴纳金额">
                                                <template slot="append">欠{{addForm.addFormData.sellIntermediaryLack}}</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="合同信息">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-printer"></i> 合同信息</span>
                            <el-scrollbar style="height: 600px;">
                                <el-form :model="addForm.uploadImgData"
                                         status-icon
                                         label-width="120px"
                                         label-position="left"
                                         class="demo-ruleForm"
                                         style="margin-top: 10px">
                                    <el-form-item label="合同照片">
                                        <div>
                                            <el-upload
                                                    action=""
                                                    list-type="picture-card"
                                                    :limit="addForm.uploadImgData.contractImgLimit"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeImg1"
                                                    :on-remove="handleRemove1"
                                                    :on-exceed="handleExceed"
                                                    :http-request="uploadImg">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                                <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="补充协议照片">
                                        <div>
                                            <el-upload
                                                    action=""
                                                    list-type="picture-card"
                                                    :limit="addForm.uploadImgData.agreementImgLimit"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeImg3"
                                                    :on-remove="handleRemove3"
                                                    :on-exceed="handleExceed"
                                                    :http-request="uploadImg">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                                <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="收据图片">
                                        <div>
                                            <el-upload
                                                    action=""
                                                    list-type="picture-card"
                                                    :limit="addForm.uploadImgData.receiptImgLimit"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeImg4"
                                                    :on-remove="handleRemove4"
                                                    :on-exceed="handleExceed"
                                                    :http-request="uploadImg">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                                <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="贷款合同图片">
                                        <div>
                                            <el-upload
                                                    action=""
                                                    list-type="picture-card"
                                                    :limit="addForm.uploadImgData.loanContractImgLimit"
                                                    :auto-upload="false"
                                                    :on-change="handleChangeImg6"
                                                    :on-remove="handleRemove6"
                                                    :on-exceed="handleExceed"
                                                    :http-request="uploadImg">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                                <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </el-scrollbar>

                        </el-tab-pane>
                        <el-tab-pane label="个人信息">
                            <span slot="label" style="font-size: 16px"><i class="el-icon-mobile-phone"></i> 个人信息</span>
                            <el-form :model="addForm.uploadImgData"
                                     v-loading="addForm.loading"
                                     status-icon
                                     label-width="120px"
                                     label-position="left"
                                     class="demo-ruleForm"
                                     style="margin-top: 10px">
                                <el-form-item label="身份证图片">
                                    <div>
                                        <el-upload
                                                action=""
                                                list-type="picture-card"
                                                :limit="addForm.uploadImgData.identityProveImgLimit"
                                                :auto-upload="false"
                                                :on-change="handleChangeImg5"
                                                :on-remove="handleRemove5"
                                                :on-exceed="handleExceed"
                                                :http-request="uploadImg">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                            <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </el-form-item>

                                <el-form-item label="产权证照片">
                                    <div>
                                        <el-upload
                                                action=""
                                                list-type="picture-card"
                                                :limit="addForm.uploadImgData.houseProveImgLimit"
                                                :auto-upload="false"
                                                :on-change="handleChangeImg2"
                                                :on-remove="handleRemove2"
                                                :on-exceed="handleExceed"
                                                :http-request="uploadImg">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="addForm.uploadImgData.dialogVisible">
                                            <img width="100%" :src="addForm.uploadImgData.dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                </el-tabs>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="backHandle">{{editableTabsValue==0?'取消':'上一步'}}</el-button>
                    <el-button v-show="editableTabsValue=='0'?false:editableTabsValue=='1'?false:true" type="primary" @click="nextHandle">{{editableTabsValue==4?'保存':'下一步'}}</el-button>
                </span>
            </el-dialog>

            <el-dialog title="业绩分配" :visible.sync="allotForm.allotFormVisible" @close="closeHandle" width="60%">
                <div class="table-template">
                    <el-table :data="allotForm.allotList" >
                        <el-table-column prop="userrelname" label="姓名"></el-table-column>
                        <el-table-column prop="rolenum" label="角色">
                            <template slot-scope="scope">
                                <el-tag
                                        :type="scope.row.rolenum=='1'?'':scope.row.rolenum=='2'?'success':scope.row.rolenum=='3'?'warning':scope.row.rolenum=='4'?'info':scope.row.rolenum=='5'?'info':scope.row.rolenum=='6'?'danger':'danger'"
                                        disable-transitions>{{scope.row.rolenum=='1'?'录入':scope.row.rolenum=='2'?'维护':scope.row.rolenum=='3'?'钥匙':scope.row.rolenum=='4'?'实勘':scope.row.rolenum=='5'?'独家':scope.row.rolenum=='6'?'促成':'合作'}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="proportion" label="占比（%）" >
                            <template slot-scope="scope" >
                                <el-input size="mini"
                                          v-if="scope.row.sign==0"
                                          v-model="scope.row.proportion"
                                          placeholder="合作人占比">
                                    <i slot="suffix" class="el-input__icon el-icon-check" @click="proportionChange(scope.row,scope.$index)"></i>
                                </el-input>

                                <div v-else>{{scope.row.proportion}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="金额"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini"
                                           type="danger"
                                           icon="el-icon-close"
                                           :disabled="scope.row.rolenum<7?true:false"
                                           circle @click="deleteUserHandle(scope.row,scope.$index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="warning" icon="el-icon-plus" @click="addHezuoHandle">合作人</el-button>
                    <el-button type="danger" icon="el-icon-upload2" @click="submitAllot">提交审核</el-button>
                </span>
            </el-dialog>

            <el-dialog title="分配人选择" :visible.sync="allotForm.addUserForm.addUserFormVisible" width="50%">
                <div class="transfer-wrap">
                    <div class="transfer-wrap-header">
                        <el-input placeholder="请输入编号后六位或全名" v-model="allotForm.addUserForm.searchMes" clearable></el-input>
                        <el-button class="m-btn-addMenu"  icon="el-icon-search" type="primary" @click="searchTransfer">查询</el-button>
                    </div>
                    <div class="transfer-wrap-table">
                        <el-table :data="allotForm.addUserForm.addUserList" style="width: 100%">
                            <el-table-column prop="user_no" label="编号"></el-table-column>
                            <el-table-column prop="relname" label="姓名"></el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="mini" type="danger" icon="el-icon-check" circle  @click="submitTransfer(scope.row)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-dialog>
            <el-dialog title="图片列表" :visible.sync="popUpImg.popUpImgVisible" width="60%">
                <div class="audit-dialog-template" >
                    <el-form :model="popUpImg" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="合同">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in popUpImg.contractImgList"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="贷款合同">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in popUpImg.loanContractImgList"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="收据">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in popUpImg.receiptImgList"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="补充协议">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in popUpImg.agreementImgList"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="身份证">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in popUpImg.identityProveImgList"
                                 :key="index">
                        </el-form-item>
                        <el-form-item label="产权证">
                            <img :src="img"
                                 alt=""
                                 v-for="(img, index) in popUpImg.houseProveImgList"
                                 :key="index">
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </el-row>
    </section>
</template>
<script>
    import ClinchDealApi from '../api/api_clinchDeal.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
export default {
    install(Vue) {
        Vue.prototype.$message = Message
    },
    data() {
        return {
            activeName: '1',
            editableTabsValue:'0',
            searchForm: {
                contractnumber: '',
                type: '',
                payOption: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '0',
                        label: '欠缴'
                    },
                    {
                        value: '1',
                        label: '已缴清'
                    }
                ],
                state: '',
                dealOption: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '创建完成'
                    },
                    {
                        value: '2',
                        label: '等待审核'
                    },
                    {
                        value: '3',
                        label: '成交完成'
                    }
                ]
            },

            popUpImg: {
                popUpImgVisible: false,
                contractImgList: [],  //合同图片List
                houseProveImgList: [], //产权证图片List
                loanContractImgList: [], //贷款合同图片List
                identityProveImgList: [], //身份证图片List
                receiptImgList: [], //收据图片List
                agreementImgList: [], //补充协议图片List
            },
            tableForm: {
                list: [
                    {
                        id:'',
                        createTime: '',//创建时间
                        buyIntermediaryPrice: '',//买方服务费
                        sellIntermediaryPrice: '',//卖方服务费
                        buyLoanPrice: '',//买方贷款费
                        buyIntermediaryPayment: '',//买方实缴服务费
                        sellIntermediaryPayment: '',//卖方实缴服务费
                        buyLoanPayment: '',//买房实缴贷款
                        buyIntermediaryLack: '', //买房服务费差价
                        sellIntermediaryLack: '', //卖方服务费差价
                        buyLoanLack: '', //买方贷款差价
                        createrelName: '',//创建人真实姓名
                        number: '',//成交编号
                        contractnumber: '',//合同编号
                        state: '', //成交状态
                        type: '', //应缴费是否结清
                        contractImg: '',  //合同图片
                        houseProveImg: '', //产权证图片
                        loanContractImg: '', //贷款合同图片
                        identityProveImg: '', //身份证图片
                        receiptImg: '', //收据图片
                        agreementImg: '', //补充协议图片
                        contractImgList: [],  //合同图片List
                        houseProveImgList: [], //产权证图片List
                        loanContractImgList: [], //贷款合同图片List
                        identityProveImgList: [], //身份证图片List
                        receiptImgList: [], //收据图片List
                        agreementImgList: [], //补充协议图片List
                        houseId: '',
                        guestId: '',
                    }
                ],
                pageSize: 10,
                total: 0,
                pageNum: 1,
            },

            addForm:{
                addFormVisible: false,
                loading: false,
                addFormData: {
                    buyIntermediaryPrice: 0,//买方服务费
                    sellIntermediaryPrice: 0,//卖方服务费
                    buyLoanPrice: 0,//买方贷款费
                    buyIntermediaryPayment: 0,//买方实缴服务费
                    sellIntermediaryPayment: 0,//卖方实缴服务费
                    buyLoanPayment: 0,//买方实缴贷款
                    buyIntermediaryLack: 0, //买房服务费差价
                    sellIntermediaryLack: 0, //卖方服务费差价
                    buyLoanLack: 0, //买方贷款费差价
                    contractnumber: '',//合同编号
                    contractImgList: [],  //合同图片List
                    houseProveImgList: [], //产权证图片List
                    loanContractImgList: [], //贷款合同图片List
                    identityProveImgList: [], //身份证图片List
                    receiptImgList: [], //收据图片List
                    agreementImgList: [], //补充协议图片List
                    houseId: '',//房源id
                    guestId: '',//客源id
                    buytype: ''
                },
                rules: {
                    contractnumber: [
                        { required: true, message: '请输入合同编号', trigger: 'blur' },
                    ],
                    buyIntermediaryPrice: [
                        { required: true, message: '请输入买方服务费', trigger: 'blur' },
                    ],
                    sellIntermediaryPrice: [
                        { required: true, message: '卖方服务费', trigger: 'blur' },
                    ],
                    buyLoanPrice: [
                        { required: true, message: '买方贷款费', trigger: 'blur' },
                    ],
                    buyIntermediaryPayment: [
                        { required: true, message: '买方实缴服务费', trigger: 'blur' },
                    ],
                    sellIntermediaryPayment: [
                        { required: true, message: '卖方实缴服务费', trigger: 'blur' },
                    ],
                    buyLoanPayment: [
                        { required: true, message: '买房实缴贷款费', trigger: 'blur' },
                    ],
                },

                uploadImgData:{
                    dialogImageUrl: '',
                    dialogVisible: false,
                    contractImgLimit: 5,  //合同图片Limit
                    houseProveImgLimit: 3, //产权证图片Limit
                    loanContractImgLimit: 5, //贷款合同图片Limit
                    identityProveImgLimit: 2, //身份证图片Limit
                    receiptImgLimit: 2, //收据图片Limit
                    agreementImgLimit: 3, //补充协议图片Limit
                    contractImgList: [],  //合同图片List
                    houseProveImgList: [], //产权证图片List
                    loanContractImgList: [], //贷款合同图片List
                    identityProveImgList: [], //身份证图片List
                    receiptImgList: [], //收据图片List
                    agreementImgList: [], //补充协议图片List
                },

                addHouseForm: {
                    houseTableData:{
                        pageSize: 3,
                        pageNum: 1,
                        total: 0,
                        list: [
//                            {
//                                id: '',
//                                number:'',
//                                titleimg: '',
//                                xiaoquName: '',
//                                huxing: '',
//                                areas: '',
//                                price: '',
//                                floor: '',
//                                checked: false,
//                                disabled: false,
//                            }
                        ]
                    },
                    searchHouseForm:{
                        xiaoquName: '',
                        number: '',
                    },
                    selectedHouse :{
                        price:'',
                    }
                },

                addGuestForm: {
                    guestTableData:{
                        pageSize: 3,
                        pageNum: 1,
                        total: 0,
                        list: []
                    },
                    searchGuestForm:{
                        searchText: ''
                    },
                }
            },

            allotForm: {
                allotFormVisible: false,
                allotFormDisabled:false,
                isEdit: false,
                allotFormData:{
                    houseId:'',
                    transactionId:'',
                    userName:'',
                    rolenum:7,
                    proportion:'',
                    price:0,
                    userrelname:'',
                    sign:0
                },
                backData:{
                    houseId:'',
                    transactionId:'',
                },
                allotList: [
                    {
                        sign:1,
                    }
                ],

                addUserForm: {
                    addUserFormVisible: false,
                    searchMes: '',
                    addUserList:[],
                }
            },
        };
    },
    created(){
        this.doSearch();
    },
    methods: {

        closeHandle(){
            this.allotForm.isEdit = false;
        },
        //查找用户
        searchTransfer(){
            var that = this;
            var postData = {
                usertext: this.allotForm.addUserForm.searchMes
            };
            ClinchDealApi.searchUser(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.allotForm.addUserForm.addUserList=result.data;
            }).catch(error => {
                console.log('searchUser_error');
            });
        },
        //确定选择
        submitTransfer(item){
            this.allotForm.allotFormData.userName=item.username;
            this.allotForm.allotFormData.userrelname=item.relname;
            this.allotForm.addUserForm.addUserFormVisible=false;
            this.allotForm.allotList.push(this.allotForm.allotFormData);
            this.allotForm.isEdit=true;
            this.allotForm.addUserForm.searchMes='';
            this.allotForm.addUserForm.addUserList=[];
        },
        proportionChange(row,j){

            var cuPrice,cuPercent,index;
            for(let i=0;i<this.allotForm.allotList.length;i++){
                if(this.allotForm.allotList[i].rolenum==6){
                    cuPrice=this.allotForm.allotList[i].price;
                    cuPercent=this.allotForm.allotList[i].proportion;
                    index=i;
                    break;
                }
            }
            if(!Number.isInteger(parseInt(row.proportion)) || parseInt(row.proportion) <=0 || parseInt(row.proportion) > parseInt(cuPercent)){
                Message.error("参数错误，请重新输入");
                return;
            }

            var newPrcent_hezuo = parseInt(row.proportion);
            var newPrice_hezuo = Math.round(parseInt(cuPrice)*(newPrcent_hezuo/100));
            var newPrice_cucheng = Math.round(parseInt(cuPrice)-newPrice_hezuo);
            var newPrcent_cucheng = Math.round(parseInt(cuPercent)-newPrcent_hezuo);

            this.allotForm.allotList[index].price=newPrice_cucheng;
            this.allotForm.allotList[index].proportion=newPrcent_cucheng;
            this.allotForm.allotList[j].price=newPrice_hezuo;
            this.allotForm.allotList[j].proportion=newPrcent_hezuo;
            this.allotForm.allotList[j].sign=1;
            this.allotForm.isEdit=false;

            var that = this;
            that.allotForm.allotFormData={};
            that.allotForm.allotFormData.proportion='';
            that.allotForm.allotFormData.transactionId = this.allotForm.backData.transactionId;
            that.allotForm.allotFormData.houseId = this.allotForm.backData.houseId;
            that.allotForm.allotFormData.price=0;
            that.allotForm.allotFormData.sign=0;
            that.allotForm.allotFormData.rolenum=7;

        },
        addHezuoHandle(){
            if(this.allotForm.isEdit==true){
                Message.error("请完成当前合作人分配再添加");
            }else{
                this.allotForm.addUserForm.addUserFormVisible=true;
            }

            // this.allotForm.allotList.push(pushData);
            // console.log()
        },
        deleteUserHandle(row,j){
            this.allotForm.isEdit=false;
            if(row.proportion ==null || row.proportion=='' || parseInt(row.proportion)<=0){
                this.allotForm.allotList.splice(j,1);
                return;
            }

            var cuPrice,cuPercent,index;
            for(let i=0;i<this.allotForm.allotList.length;i++){
                if(this.allotForm.allotList[i].rolenum==6){
                    cuPrice=this.allotForm.allotList[i].price;
                    cuPercent=this.allotForm.allotList[i].proportion;
                    index=i;
                    break;
                }
            }
            var newPrcent_hezuo = parseInt(row.proportion);
            var newPrice_hezuo = parseInt(row.price);
            var newPrice_cucheng = Math.round(parseInt(cuPrice)+newPrice_hezuo);
            var newPrcent_cucheng = Math.round(parseInt(cuPercent)+newPrcent_hezuo);

            this.allotForm.allotList[index].price=newPrice_cucheng;
            this.allotForm.allotList[index].proportion=newPrcent_cucheng;

            this.allotForm.allotList.splice(j,1);
        },
        formatter(row, column) {
            return row.buytype=='0'?'买卖':'租赁';
        },
        // 重置新增成交
        resetForm() {
            this.$refs['addFormData'].resetFields();
            this.addForm.uploadImgData.dialogImageUrl='';
            this.editableTabsValue='0';
            this.addForm.addHouseForm.houseTableData.list=[];
            this.addForm.addGuestForm.guestTableData.list=[];

            this.addForm.uploadImgData.contractImgList=[];
            this.addForm.uploadImgData.houseProveImgList=[];
            this.addForm.uploadImgData.loanContractImgList=[];
            this.addForm.uploadImgData.identityProveImgList=[];
            this.addForm.uploadImgData.receiptImgList=[];
            this.addForm.uploadImgData.agreementImgList=[];

        },
        //金额计算
        inputChangeHandle(){
            this.addForm.addFormData.buyIntermediaryLack=this.addForm.addFormData.buyIntermediaryPrice-this.addForm.addFormData.buyIntermediaryPayment;
            this.addForm.addFormData.sellIntermediaryLack=this.addForm.addFormData.sellIntermediaryPrice-this.addForm.addFormData.sellIntermediaryPayment;
            this.addForm.addFormData.buyLoanLack=this.addForm.addFormData.buyLoanPrice-this.addForm.addFormData.buyLoanPayment;
        },
        //确定房源选择
        selectedHouse(item){
            this.addForm.addFormData.houseId = item.id;
            this.addForm.addHouseForm.selectedHouse.price = item.price;
            this.addForm.addFormData.buytype = item.type;
            this.addForm.addFormData.buyIntermediaryPrice=parseInt(this.addForm.addHouseForm.selectedHouse.price)*0.01,//买方服务费
            this.addForm.addFormData.sellIntermediaryPrice=parseInt(this.addForm.addHouseForm.selectedHouse.price)*0.01,//卖方服务费
            this.addForm.addFormData.buyLoanPrice=parseInt(this.addForm.addHouseForm.selectedHouse.price)*0.005,//买方贷款费

            this.addForm.addFormData.buyIntermediaryLack=this.addForm.addFormData.buyIntermediaryPrice-this.addForm.addFormData.buyIntermediaryPayment;
            this.addForm.addFormData.sellIntermediaryLack=this.addForm.addFormData.sellIntermediaryPrice-this.addForm.addFormData.sellIntermediaryPayment;
            this.addForm.addFormData.buyLoanLack=this.addForm.addFormData.buyLoanPrice-this.addForm.addFormData.buyLoanPayment;
            this.nextHandle();
        },
        //确定客源选择
        selectedGuest(item){
            this.addForm.addFormData.guestId = item.id;
            this.nextHandle();
        },

        //房源查询
        searchHouseList(){
            var xiaoquName=this.addForm.addHouseForm.searchHouseForm.xiaoquName;
            var number=this.addForm.addHouseForm.searchHouseForm.number;
            if(xiaoquName.trim()=='' && number.trim()==''){
                Message.error("查询条件不允许都为空");
                return;
            }
            var that = this;
            that.addForm.addHouseForm.houseTableData.pageNum=1;
            var postData = {
                xiaoquName: this.addForm.addHouseForm.searchHouseForm.xiaoquName,
                number: this.addForm.addHouseForm.searchHouseForm.number,
                page: this.addForm.addHouseForm.houseTableData.pageNum,
                size: 3
            };

            ClinchDealApi.searchHouse(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addForm.addHouseForm.houseTableData=result.data;
            }).catch(error => {
                console.log('searchHouse_error');
            });
        },
        handleHouseTableDataChangeSearch(val){
            this.addForm.addHouseForm.houseTableData.pageNum = val;
            var that = this;

            var postData = {
                xiaoquName: this.addForm.addHouseForm.searchHouseForm.xiaoquName,
                number: this.addForm.addHouseForm.searchHouseForm.number,
                page: this.addForm.addHouseForm.houseTableData.pageNum,
                size: 3
            };
            ClinchDealApi.searchHouse(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addForm.addHouseForm.houseTableData=result.data;
            }).catch(error => {
                console.log('searchHouse_error');
            });
        },
        //客源查询
        searchGuestList(){
            var guest=this.addForm.addGuestForm.searchGuestForm.searchText;
            if(guest.trim()=='' ){
                Message.error("查询条件不允许为空");
                return;
            }
            var that = this;
            that.addForm.addGuestForm.guestTableData.pageNum=1;
            var postData = {
                searchText: this.addForm.addGuestForm.searchGuestForm.searchText,
                page: this.addForm.addGuestForm.guestTableData.pageNum,
                size: 3
            };

            ClinchDealApi.searchGuest(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addForm.addGuestForm.guestTableData=result.data;
            }).catch(error => {
                console.log('searchGuest_error');
            });
        },
        handleGuestTableDataChangeSearch(val){
            this.addForm.addGuestForm.guestTableData.pageNum = val;
            var that = this;

            var postData = {
                searchText: this.addForm.addGuestForm.searchGuestForm.searchText,
                page: this.addForm.addGuestForm.guestTableData.pageNum,
                size: 3
            };
            ClinchDealApi.searchGuest(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addForm.addGuestForm.guestTableData=result.data;
            }).catch(error => {
                console.log('searchGuest_error');
            });
        },
        backHandle(){
            if(this.editableTabsValue!=0){
                this.editableTabsValue=(parseInt(this.editableTabsValue)-1)+"";
            }else {
                this.addForm.addFormVisible = false;
            }
        },
        nextHandle(){
            if(this.editableTabsValue<4){
                if(this.editableTabsValue==2){
                    this.$refs['addFormData'].validate((valid) => {
                        if (valid) {
                            this.editableTabsValue=(parseInt(this.editableTabsValue)+1)+"";
                        } else {
                            return false;
                        }
                    });
                }else{
                    this.editableTabsValue=(parseInt(this.editableTabsValue)+1)+"";
                }
            }else{
                this.uploadImg();
            }
        },
        tabLeaveHandle(activeName, oldActiveName){
            var that = this;
            if(activeName != this.editableTabsValue){
                return false;
            }
        },
        // 业绩分配
        allotHandle(row){
            this.allotForm.allotFormVisible=true;
            this.allotForm.backData.transactionId =id;
            this.allotForm.backData.houseId = row.houseId;
            var that = this;
            var id = row.id;

            var postData = {
                transactionId: id,
            };

            ClinchDealApi.getAchievement(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.allotForm.allotList=result.data;

            }).catch(error => {
                console.log('achievementList_error'+error);
            });
        },
        // 业绩分配确定
        submitAllot() {
            if(this.allotForm.isEdit==true){
                Message.error("请完成当前合作人分配再提交");
                return;
            }
            var that = this;
            var postData = that.allotForm.allotList;

            ClinchDealApi.achievementInsert(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                if(result.data=='1'){
                    Message({
                        message: '申请成功!',
                        type: 'success'
                    });
                    that.doSearch();
                    that.allotForm.allotFormVisible=false;
                }

            }).catch(error => {
                console.log('achievementInsert_error'+error);
            });
        },

        // 成交查询
        doSearch() {
            var that = this;
            var postData = {
                contractnumber: this.searchForm.contractnumber,
                type: this.searchForm.type,
                state: this.searchForm.state,
                page: this.tableForm.pageNum,
                size: this.tableForm.pageSize
            };

            ClinchDealApi.searchclinchDeal(postData).then(function (result) {
                if (typeof(result) != "object") {
                    result = JSON.parse(result)
                }
                that.tableForm = result.data;
            }).catch(error => {
                console.log('searchclinchDeal_error');
            });
        },
        search() {
            this.tableForm.pageNum = 1;
            this.doSearch();
        },  //搜索

        handleCurrentChangeSearch(val) {
            this.tableForm.pageNum = val;
            this.doSearch();
        },  //分页change
        linkImg(item){
            this.popUpImg.popUpImgVisible = true;
            this.popUpImg.contractImgList = item.contractImgList;
            this.popUpImg.loanContractImgList = item.loanContractImgList;
            this.popUpImg.houseProveImgList = item.houseProveImgList;
            this.popUpImg.identityProveImgList = item.identityProveImgList;
            this.popUpImg.receiptImgList = item.receiptImgList;
            this.popUpImg.agreementImgList = item.agreementImgList;
        },
        linkHouse(item){
            let routeData = this.$router.resolve({ path: '/admin/houseDetails/'+item.houseId});
            window.open(routeData.href, '_blank');
        },
        linkGuest(item){
            let routeData = this.$router.resolve({ path: '/admin/passengerDetails/'+item.guestId});
            window.open(routeData.href, '_blank');
        },
        compileIt(item) {
            var that = this;
            var postData = {
                code: item.code
            };
            console.log(postData);
            switch (item.status) {
                case 0:
                    that.dialogForm.statusForm1.statusVisible1 = true;
                    break;
                case 1:
                    that.dialogForm.statusForm2.statusVisible2 = true;
                    break;
                case 2:
                    that.dialogForm.statusForm3.statusVisible3 = true;
                    break;
                default:
                    ;
            }
        },  //编辑
        addPerformance() {
            this.dialogForm.addPerformanceForm.addPerformanceVisible = true;
            this.dialogForm.addPerformanceForm.performanceList = [];
            this.dialogForm.addPerformanceForm.performanceCheckList = [];
        },  //添加业绩

        searchPerformance() {
            this.dialogForm.addPerformanceForm.performanceList.push({
                code: '123',
                name: '王小虎',
                checked: false,
                disabled: false,
            });
            this.dialogForm.addPerformanceForm.showPerformanceList.forEach((item) => {
                this.dialogForm.addPerformanceForm.performanceList.forEach((item2) => {
                    if (item.code == item2.code) {
                        item2.checked = true;
                        item2.disabled = true;
                    }
                });
            });
        },  //搜索业绩

        checkIt(item) {
            console.log(item)
            if (item.checked == false) {
                return;
            }
            else {
                var performanceCheckList = this.dialogForm.addPerformanceForm.performanceCheckList;
                performanceCheckList.forEach((item2) => {
                    if (item.code == item2.code) {
                        performanceCheckList.splice(performanceCheckList.indexOf(item2), 1)
                        return;
                    }
                });
                performanceCheckList.push(item);
                this.dialogForm.addPerformanceForm.performanceCheckList = performanceCheckList;
            }
        },  //选择业绩人

        putPerformance() {
            this.dialogForm.addPerformanceForm.performanceCheckList.forEach((item) => {
                this.dialogForm.addPerformanceForm.showPerformanceList.push(item)
            });
            this.dialogForm.addPerformanceForm.addPerformanceVisible = false;
        },  //确定选择业绩人

        //---------------------------------------上传部分 start ------------------------------------------------//
        //新增成交 图片上传
        uploadImg: function (param) {
            this.addForm.loading=true;
            var count = this.addForm.uploadImgData.contractImgLimit.length
                + this.addForm.uploadImgData.houseProveImgLimit.length
                + this.addForm.uploadImgData.loanContractImgLimit.length
                + this.addForm.uploadImgData.identityProveImgLimit.length
                + this.addForm.uploadImgData.receiptImgLimit.length;
            var pcount = this.addForm.uploadImgData.contractImgList.length
                + this.addForm.uploadImgData.houseProveImgList.length
                + this.addForm.uploadImgData.loanContractImgList.length
                + this.addForm.uploadImgData.identityProveImgList.length
                + this.addForm.uploadImgData.receiptImgList.length
                + this.addForm.uploadImgData.agreementImgList.length;
            if (pcount < 6) {
                Message.error("请上传完整数量的图片！");
            } else {
                for(let i=0;i<this.addForm.uploadImgData.contractImgList.length;i++){
                    this.addForm.addFormData.contractImgList.push(this.addForm.uploadImgData.contractImgList[i].base64);
                };
                for(let i=0;i<this.addForm.uploadImgData.houseProveImgList.length;i++){
                    this.addForm.addFormData.houseProveImgList.push(this.addForm.uploadImgData.houseProveImgList[i].base64);
                };
                for(let i=0;i<this.addForm.uploadImgData.loanContractImgList.length;i++){
                    this.addForm.addFormData.loanContractImgList.push(this.addForm.uploadImgData.loanContractImgList[i].base64);
                };
                for(let i=0;i<this.addForm.uploadImgData.identityProveImgList.length;i++){
                    this.addForm.addFormData.identityProveImgList.push(this.addForm.uploadImgData.identityProveImgList[i].base64);
                };
                for(let i=0;i<this.addForm.uploadImgData.receiptImgList.length;i++){
                    this.addForm.addFormData.receiptImgList.push(this.addForm.uploadImgData.receiptImgList[i].base64);
                };
                for(let i=0;i<this.addForm.uploadImgData.agreementImgList.length;i++){
                    this.addForm.addFormData.agreementImgList.push(this.addForm.uploadImgData.agreementImgList[i].base64);
                };

                var that = this;
                var postData = this.addForm.addFormData;

                ClinchDealApi.insertTrans(postData).then(function (result) {
                    that.addForm.loading=false;
                    if (typeof(result) != "object") {result = JSON.parse(result)}
                    Message({
                        message: "新增成交表单成功",
                        type: 'success'
                    });
                    that.addForm.addFormVisible=false;
                    that.resetForm();
                }).catch(error => {
                    console.log('insertTrans_error'+error);
                });

            }
        },

        handleExceed(file, fileList) {
            Message.error("超出上传范围！");
        },

        handleChangeImg1(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.contractImgList.push(bean);
            };
        },
        handleChangeImg2(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.houseProveImgList.push(bean);
            };
        },
        handleChangeImg3(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.agreementImgList.push(bean);
            };
        },
        handleChangeImg4(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.receiptImgList.push(bean);
            };
        },
        handleChangeImg5(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.identityProveImgList.push(bean);
            };
        },
        handleChangeImg6(file, fileList) {
            var that = this;
            var reader = new FileReader();
            var fileUid = file.uid;
            reader.readAsDataURL(file.raw);
            reader.onloadend = function(e){
                var img64 = this.result;
                var bean = {uid:fileUid,base64:img64};
                that.addForm.uploadImgData.loanContractImgList.push(bean);
            };
        },

        handleRemove1(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.contractImgList.length;i++){
                if(this.addForm.uploadImgData.contractImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.contractImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove2(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.houseProveImgList.length;i++){
                if(this.addForm.uploadImgData.houseProveImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.houseProveImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove3(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.agreementImgList.length;i++){
                if(this.addForm.uploadImgData.agreementImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.agreementImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove4(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.receiptImgList.length;i++){
                if(this.addForm.uploadImgData.receiptImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.receiptImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove5(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.identityProveImgList.length;i++){
                if(this.addForm.uploadImgData.identityProveImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.identityProveImgList.splice(i,1);
                    break;
                }
            }
        },
        handleRemove6(file, fileList) {
            var that = this;
            var fileUid = file.uid;
            for(let i=0;i<this.addForm.uploadImgData.loanContractImgList.length;i++){
                if(this.addForm.uploadImgData.loanContractImgList[i].uid==fileUid){
                    that.addForm.uploadImgData.loanContractImgList.splice(i,1);
                    break;
                }
            }
        },


        //---------------------------------------上传部分 end ------------------------------------------------//
    }
};
</script>
<style lang="less">
@import "../assets/css/element.less";
.transfer-wrap{
    .transfer-wrap-header{
        padding: 20px;
        box-shadow: 0px 0px 10px #e3e3e3;
        .el-input{
            width: 200px;
        }
    }
    .transfer-wrap-table{
        padding: 20px;
        margin-top: 20px;
        box-shadow: 0px 0px 10px #e3e3e3;
        img{
            height: 11vw;
        }
    }
}
.audit-dialog-template{
    .auditContent{
        margin-left:36px;
        a{
            color: #c51010;
        }

    }
    .el-form{
        .el-form-item{
            img{
                width: 180px;
                height: 140px;
                margin-left: 10px;
            }
        }
    }
}
.passenger_table{
    margin-top: 20px;
    padding: 20px;
    box-shadow: 0px 0px 10px #e3e3e3;
    // border: 1px solid #d7d7d7;
    .passenger-wrap-table{
        padding: 20px;
    }
    .table-pagination{
        margin-top: 20px;
        text-align: right;
    }
    .passenger-wrap-header{
        padding: 20px;
        overflow: hidden;
        box-shadow: 0px 0px 10px #e3e3e3;
        .el-input{
            width: 200px;
        }
    }
}
.look-detail-wrap{
    .look-detail-wrap-header{
        padding: 20px;
        overflow: hidden;
        box-shadow: 0px 0px 10px #e3e3e3;
        .el-input{
            width: 200px;
        }
    }
    .look-detail-wrap-table{
        padding: 20px;

        /*text-align: center;*/
        img{
            height: 11vw;
        }
    }
}
.clinch-deal {
	/*border:1px solid red;*/
    .el-collapse-item__header {
        height: 48px;
        line-height: 48px;
        color: #303133;
        cursor: pointer;
        border-bottom: 1px solid #dcdfe6;
        font-size: 18px;
        font-weight: 500;
        -webkit-transition: border-bottom-color .3s;
        transition: border-bottom-color .3s;
        outline: 0;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 160px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }
    .clinch-template{
        width: 100%;
        padding: 25px 50px;
        background: #fff;
        .clinch-content{
            min-height: 200px;
            box-shadow: 0px 0px 10px #e3e3e3;
            .search-header{
                border-bottom: 1px solid #f2f2f2;
                padding: 20px;
                span{
                    margin-left: 10px;
                    &:first-child {
                        margin-left: 0;
                    }
                }
                .el-input, .el-select{
                    width: 180px;
                }
                .el-button{
                    margin-left: 10px;
                }
            }
            .total-performance{
                margin: 20px 20px 0 0;
                text-align: right;
            }
            .table-template{
                margin: 20px;
                /*box-shadow: 0px 0px 10px #e3e3e3;*/
                min-height: 100px;
            }
            .table-pagination{
                padding: 0 20px 20px;
                text-align: right;
            }
        }
        .el-dialog{
            .performance-header{
                .el-input{
                    width: 190px;
                }
            }
            .performance-table{
                margin-top: 20px;
            }

        }
    }
}
</style>
