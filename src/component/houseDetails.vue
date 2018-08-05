<template>
    <section class="house-details">
        <div class="house-template">
            <el-tag type="success" >房源编号：{{houseDataForm.number}}</el-tag>

            <el-row :gutter="25">
                <el-col :span="15">
                    <ul class="mes-concent">
                        <li>
                            <div class="upload-big">
                                <!--<el-upload-->
                                        <!--class="img-uploader"-->
                                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                        <!--list-type="picture-card"-->
                                        <!--multiple-->
                                        <!--:show-file-list="false"-->
                                        <!--:data="uploadData"-->
                                        <!--:on-success="handleSuccess"-->
                                        <!--:on-error="handleError">-->
                                    <!--<i class="el-icon-plus uploader-icon"></i>-->
                                <!--</el-upload>-->
                                <div v-show="houseDataForm.imgurl ==null || houseDataForm.imgurl.length == 0" class="blockCover" >暂无图片</div>
                                <div v-show="houseDataForm.imgurl !=null || houseDataForm.imgurl.length > 0" class="imgCover">
                                    <img :src="coverUrl" alt="暂无图片">
                                </div>
                                <el-carousel v-show="houseDataForm.imgurl !=null && houseDataForm.imgurl.length > 0"
                                             class="carousel-wrap"
                                             indicator-position="none"
                                             :interval="5000"
                                             type="card"
                                             height="110px"
                                             @change="coverHandel"
                                             >
                                    <el-carousel-item v-for="(item, index) in houseDataForm.imgurl" :key="index">
                                        <img @click="carouselClick" :src="item" alt="" >
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="mes-wrap">
                                <div class="house-location">
                                    <span>{{ houseDataForm.xiaoquName }}</span>
                                    <span class="icon-love">
                                        <i :class="houseDataForm.likeType=='0'?'iconfont icon-love-b1':'iconfont icon-love-b'" @click="likeIt"></i>
                                    </span>
                                </div>
                                <div class="house-price">
                                    <span class="span1"> {{ houseDataForm.priceText }}</span>
                                    <span class="span2">{{ houseDataForm.priceOneText }}</span>
                                </div>
                                <!-- <div class="house-price"></div> -->
                                <div class="house-basis-mes">
                                    <div class="basis-mes">
                                        <div>户型</div>
                                        <div>{{ houseDataForm.huxing }}</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>面积</div>
                                        <div>{{houseDataForm.areas}}m²</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>朝向</div>
                                        <div>{{ houseDataForm.chaoxiang }}</div>
                                    </div>
                                    <div class="basis-mes">
                                        <div>楼层</div>
                                        <div>{{ houseDataForm.floor }}</div>
                                    </div>
                                </div>
                                <div class="house-other-mes">
                                    <div class="other-mes">
                                        <div>挂牌时间: <span>{{ houseDataForm.createTime }}</span></div>
                                         <div>有无钥匙: <span>{{ houseDataForm.iskey==1?"有":"无" }}</span></div>
                                        <div>房主信息:
                                            <span class="span" @click="ownerHandle">查看</span>
                                            <el-popover
                                                    placement="right"
                                                    width="600"
                                                    transition="el-zoom-in-center"
                                                    trigger="click">
                                                <div class="table-template">
                                                    <el-table :data="ownerHistoryData.list">
                                                        <el-table-column prop="createTime" label="查看时间"></el-table-column>
                                                        <el-table-column prop="clickRelName" label="查看人"></el-table-column>
                                                    </el-table>
                                                </div>
                                                <div  style="padding: 0 20px 20px;text-align: right;">
                                                    <el-pagination
                                                            layout="prev, pager, next, jumper, total"
                                                            :page-size="ownerHistoryData.pageSize"
                                                            :current-page.sync="ownerHistoryData.pageNum"
                                                            :total ="ownerHistoryData.total"
                                                            @current-change="ownerHistoryChangeSearch">
                                                    </el-pagination>
                                                </div>
                                                <span class="span" @click="ownerHistoryHandle" slot="reference">历史记录</span>
                                            </el-popover>
                                        </div>
                                    </div>
                                    <div class="other-mes">
                                        <div>维护人: <span>{{ houseDataForm.recordrelName==''?"暂无": radiusForm.recordrelName }}</span></div>
                                        <div>房屋等级: <span>{{ houseDataForm.grade }}</span></div>
                                        <div>地址:
                                            <span class="span" @click="placeHandle">查看</span>
                                            <el-popover
                                                    placement="right"
                                                    width="600"
                                                    transition="el-zoom-in-center"
                                                    trigger="click">
                                                <div class="table-template">
                                                    <el-table :data="placeHistoryData.list">
                                                        <el-table-column prop="createTime" label="查看时间"></el-table-column>
                                                        <el-table-column prop="clickRelName" label="查看人"></el-table-column>
                                                    </el-table>
                                                </div>
                                                <div style="padding: 0 20px 20px;text-align: right;">
                                                    <el-pagination
                                                            layout="prev, pager, next, jumper, total"
                                                            :page-size="placeHistoryData.pageSize"
                                                            :current-page.sync="placeHistoryData.pageNum"
                                                            :total ="placeHistoryData.total"
                                                            @current-change="placeHistoryChangeSearch">
                                                    </el-pagination>
                                                </div>
                                                <span class="span" @click="placeHistoryHandle" slot="reference">历史记录</span>
                                            </el-popover>
                                        </div>
                                    </div>
                                    <div class="other-mes" style="margin-top:10px">
                                        <span><el-tag v-show="houseDataForm.isshare=='1'?true:false">共享池</el-tag></span>
                                        <span><el-tag v-show="otherForm.isspecial=='1'?true:false" type="warning" >特殊房源</el-tag></span>
                                        <span><el-tag v-show="otherForm.isfine=='1'?true:false" type="success">优质房源</el-tag></span>
                                        <span><el-tag v-show="otherForm.state=='1'?true:false" type="danger">无效房源</el-tag></span>
                                    </div>
                                </div>

                            </div>
                        </li>
                        <li>
                            <div class="radius-wrap">
                                <div class="radius-block">
                                    <div><i class="iconfont icon-luru"></i></div>
                                    <div>录入</div>
                                    <div class="radius-data">{{ radiusForm.createrelName==''|| radiusForm.createrelName==null?"暂无":radiusForm.createrelName }}</div>
                                </div>
                                <div class="radius-block" :class="houseDataForm.isshare=='0'?'radius-block': 'radius-block radius-data-btn'">
                                    <div><i class="iconfont icon-maintain"></i></div>
                                    <div>维护</div>
                                    <div class="radius-data">{{ radiusForm.recordrelName==''|| radiusForm.recordrelName==null?"暂无": radiusForm.recordrelName}}</div>
                                    <el-button type="text"
                                               size="small"
                                               icon="el-icon-plus"
                                               v-show="houseDataForm.isshare=='0'?false:true"
                                               @click="weihuHandel">
                                    </el-button>
                                </div>

                                <div :class="houseDataForm.examineState=='0' ? 'radius-block ' :(houseDataForm.explorationTimeType=='1'&& houseDataForm.user_type=='0') ? 'radius-block ' : (radiusForm.explorationrelName!=null && radiusForm.explorationrelName!='')? 'radius-block ' : 'radius-block radius-data-btn'">
                                    <div><i class="iconfont icon-xiangji"></i></div>
                                    <div>实勘</div>
                                    <div class="radius-data">{{ radiusForm.explorationrelName=='' || radiusForm.explorationrelName==null?"暂无": radiusForm.explorationrelName}}</div>
                                    <el-button type="text"
                                               size="small"
                                               icon="el-icon-plus"
                                               v-show="houseDataForm.examineState=='0' ? false :(houseDataForm.explorationTimeType=='1'&& houseDataForm.user_type=='0') ? false : (radiusForm.explorationrelName!=null && radiusForm.explorationrelName!='')? false : true"
                                               @click="examineHandel">
                                    </el-button>
                                </div>
                                <div class="radius-block radius-data-btn" >
                                    <div><i class="iconfont icon-method-draw-image"></i></div>
                                    <div>钥匙</div>
                                    <div class="radius-data">{{ radiusForm.keyrelName==''|| radiusForm.keyrelName==null?"暂无": radiusForm.keyrelName}}</div>
                                    <el-button type="text"
                                               size="small"
                                               icon="el-icon-plus"
                                               @click="keyHandel">
                                    </el-button>
                                </div>
                                <div class="radius-block">
                                    <div><i class="iconfont icon-v"></i></div>
                                    <div>独家</div>
                                    <div class="radius-data">{{ radiusForm.exclusiverelName==''|| radiusForm.exclusiverelName==null?"暂无":radiusForm.exclusiverelName }}</div>
                                </div>
                            </div>

                        </li>
                    </ul>
                </el-col>
                <el-col :span="9">
                    <div class="tab-content">
                        <el-tabs v-model="editableTabsValue" type="border-card" >
                            <el-tab-pane label="跟进" name="1">
                                <el-table :data="traceForm.list" :show-header="false" style="width: 100%">
                                    <el-table-column prop="createTime" label="日期"></el-table-column>
                                    <el-table-column prop="userRelName" label="维护人"></el-table-column>
                                    <el-table-column prop="content" label="内容"></el-table-column>
                                </el-table>
                                <div class="pagination-template">
                                    <el-pagination
                                            layout="prev, pager, next, jumper, total"
                                            :page-size="traceForm.pageSize"
                                            :current-page.sync="traceForm.pageNum"
                                            :total ="traceForm.total"
                                            @current-change="handleCurrentChangeSearch">
                                    </el-pagination>
                                </div>
                                <div class="trace-template">
                                    <div class="trace-title">跟进</div>
                                    <div class="trace-textarea">
                                        <el-input type="textarea" :rows="4" placeholder="请输入反馈" v-model="traceForm.textMes"></el-input>
                                    </div>
                                </div>
                                <div class="trace-button">
                                    <el-button type="primary" size="mini" @click="submitTrace">提交</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="带看" name="2">
                                <el-table :data="lookForm.list" :show-header="false" style="width: 100%">
                                    <el-table-column prop="createTime" label="日期"></el-table-column>
                                    <el-table-column prop="userRelName" label="维护人"></el-table-column>
                                </el-table>
                                <div class="pagination-template">
                                    <el-pagination
                                            layout="prev, pager, next, jumper, total"
                                            :page-size="lookForm.pageSize"
                                            :current-page.sync="lookForm.pageNum"
                                            :total ="lookForm.total"
                                            @current-change="handleCurrentChangeSearch1">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane :disabled = "houseDataForm.user_type=='0'?true:false" label="修改" name="3" >
                                <el-form :model="editForm" ref="editForm" label-width="45px" class="demo-ruleForm">
                                    <el-form-item label="价格:">
                                        <el-input placeholder="请输入" v-model="editForm.price"></el-input>
                                    </el-form-item>
                                    <el-row :gutter="1">
                                        <el-col :span="1">
                                            <el-form-item label="户型:">
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-form-item label="" label-width="30px">
                                                <el-input placeholder="请输入室" v-model="editForm.huxingshi"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-form-item label="室" label-width="30px">
                                                <el-input placeholder="请输入厅" v-model="editForm.huxingting"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-form-item label="厅" label-width="30px">
                                                <el-input placeholder="请输入卫" v-model="editForm.huxingwei"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-form-item label="卫" label-width="30px">
                                                <el-input placeholder="请输入厨" v-model="editForm.huxingchu"></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <span style="text-align: center; line-height: 40px">
                                            厨
                                        </span>
                                    </el-row>
                                    <!-- <el-form-item label="户型:">
                                        <el-col :span="6">
                                            <el-input placeholder="请输入室" v-model="editForm.huxingshi"></el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-input placeholder="请输入厅" v-model="editForm.huxingting"></el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-input placeholder="请输入卫" v-model="editForm.huxingwei"></el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-input placeholder="请输入厨" v-model="editForm.huxingchu"></el-input>
                                        </el-col>
                                    </el-form-item> -->
                                    <el-form-item label="面积:">
                                        <el-input placeholder="请输入" v-model="editForm.areas"></el-input>
                                    </el-form-item>
                                    <el-form-item label="朝向:">
                                        <!-- <el-input placeholder="请输入" v-model="editForm.chaoxiang"></el-input> -->
                                        <el-select v-model="editForm.chaoxiang" placeholder="请选择" style="width:100%">
                                            <el-option
                                                v-for="item in chaoxiangList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="楼层:">
                                        <el-input placeholder="请输入" v-model="editForm.floor"></el-input>
                                    </el-form-item>
                                    <div style="text-align: right">
                                        <el-button type="primary" size="mini" @click="editSubmit">提交</el-button>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane :disabled = "houseDataForm.user_type=='0'?true:false" label="其他" name="4" >
                                <el-form :model="otherForm"
                                         ref="otherForm"
                                         label-width="100px"
                                         class="demo-ruleForm"
                                         label-position="left">
                                    <el-form-item label="特殊房源:">
                                        <el-switch v-model="otherForm.isspecial==0 || otherForm.isspecial==2 || otherForm.isspecial==null?false:true" disabled></el-switch>
                                        <el-tag type="warning" v-show="otherForm.isspecial>1?true:false">等待审核中</el-tag>
                                        <el-button type="text" size="mini"
                                                   @click="isspecialHandel"
                                                   v-show="otherForm.isspecial>1?false:true">审核
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item label="无效房源:">
                                        <el-switch v-model="otherForm.state==0 || otherForm.state==2 || otherForm.state==null?false:true" disabled></el-switch>
                                        <el-tag type="warning" v-show="otherForm.state>1?true:false">等待审核中</el-tag>
                                        <el-button type="text" size="mini"
                                                   @click="stateHandel"
                                                   v-show="otherForm.state>1?false:true">审核
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item label="优质房源:">
                                        <el-switch v-model="otherForm.isfine==0 || otherForm.isfine==2 || otherForm.isfine==null?false:true" disabled></el-switch>
                                        <el-tag type="warning" v-show="otherForm.isfine>1?true:false">等待审核中</el-tag>
                                        <el-button type="text" size="mini"
                                                   @click="isfineHandel"
                                                   v-show="otherForm.isfine>1?false:true">审核
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item label="房源转让:">
                                        <el-button type="text" size="mini"
                                                   @click="transferHandel">选择转让人
                                        </el-button>
                                    </el-form-item>
                                </el-form>

                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>

                <el-dialog :title="'房主信息 '+'( 已看 '+ownerForm.clickcount+' / 20 )'" :visible.sync="ownerVisible" width="40%">
                    <el-form :model="ownerForm" ref="ownerForm" label-width="60px" class="ownerForm">
                        <div class="row">
                            <span>姓名：</span>
                            <span>{{ ownerForm.owner }}</span>
                        </div>
                        <div class="row">
                            <span>电话：</span>
                            <span>{{ ownerForm.phone }}</span>
                        </div>
                        <div class="row">
                            <span>姓名：</span>
                            <span>{{ ownerForm.owner1 }}</span>
                        </div>
                        <div class="row">
                            <span>姓名：</span>
                            <span>{{ ownerForm.phone1 }}</span>
                        </div>

                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="ownerVisible = false">退 出</el-button>
                    </span>
                </el-dialog>
                <el-dialog :title="'地址信息 '+'( 已看 '+placeForm.clickcount+' / 20 )'" :visible.sync="placeVisible" width="40%">
                    <el-form :model="placeForm" ref="placeForm" label-width="60px" class="ownerForm">
                       <div class="row">
                            <span>地址：</span>
                            <span>{{ placeForm.addressText }}</span>
                        </div>
                    </el-form>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="placeVisible = false">退 出</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="实勘添加" :visible.sync="examineVisible" width="80%"  >
                    <el-form :model="examineForm" ref="examineForm" label-width="60px"
                             class="demo-ruleForm examine-form" v-loading="examineLoading">
                        <el-form-item label="室:">
                            <el-upload
                                    action=""
                                    list-type="picture-card"
                                    :limit="examineForm.shilimit"
                                    :auto-upload="false"
                                    :on-change="handleChangeImg1"
                                    :on-remove="handleRemove1"
                                    :on-exceed="handleExceed"
                                    :http-request="uploadImg">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="examineForm.dialogVisible">
                                <img width="100%" :src="examineForm.dialogImageUrl" alt="">
                            </el-dialog>
                            <!--<el-upload-->
                                    <!--v-for="(item, index) in examineForm.bedroom"-->
                                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                    <!--:show-file-list="false"-->
                                    <!--list-type="picture-card"-->
                                    <!--:headers="curToken"-->
                                    <!--:on-change='changeUpload'>-->
                                <!--<img v-if="item.imgUrl != ''" :src="item.imgUrl" alt="">-->
                                <!--<i v-else class="el-icon-plus"></i>-->
                            <!--</el-upload>-->
                        </el-form-item>
                        <el-form-item label="厅:">
                            <el-upload
                                    action=""
                                    list-type="picture-card"
                                    :limit="examineForm.tinglimit"
                                    :auto-upload="false"
                                    :on-change="handleChangeImg2"
                                    :on-remove="handleRemove2"
                                    :on-exceed="handleExceed"
                                    :http-request="uploadImg">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="examineForm.dialogVisible">
                                <img width="100%" :src="examineForm.dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="卫:">
                            <el-upload
                                    action=""
                                    list-type="picture-card"
                                    :limit="examineForm.weilimit"
                                    :auto-upload="false"
                                    :on-change="handleChangeImg3"
                                    :on-remove="handleRemove3"
                                    :on-exceed="handleExceed"
                                    :http-request="uploadImg">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="examineForm.dialogVisible">
                                <img width="100%" :src="examineForm.dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="厨:">
                            <el-upload
                                    action=""
                                    list-type="picture-card"
                                    :limit="examineForm.chulimit"
                                    :auto-upload="false"
                                    :on-change="handleChangeImg4"
                                    :on-remove="handleRemove4"
                                    :on-exceed="handleExceed"
                                    :http-request="uploadImg">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="examineForm.dialogVisible">
                                <img width="100%" :src="examineForm.dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="户型图:">
                            <el-upload
                                    action=""
                                    list-type="picture-card"
                                    :limit="examineForm.huxinglimit"
                                    :auto-upload="false"
                                    :on-change="handleChangeImg5"
                                    :on-remove="handleRemove5"
                                    :on-exceed="handleExceed"
                                    :http-request="uploadImg">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="examineForm.dialogVisible">
                                <img width="100%" :src="examineForm.dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="其他:">
                            <el-upload
                                    action=""
                                    list-type="picture-card"
                                    :limit="examineForm.otherlimit"
                                    :auto-upload="false"
                                    :on-change="handleChangeImg6"
                                    :on-remove="handleRemove6"
                                    :on-exceed="handleExceed"
                                    :http-request="uploadImg">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="examineForm.dialogVisible">
                                <img width="100%" :src="examineForm.dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="examineVisible = false">退 出</el-button>
                        <el-button type="primary" @click="uploadImg">提交审核</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="房源转让" :visible.sync="transferVisible" width="80%">
                    <div class="transfer-wrap">
                        <div class="transfer-wrap-header">
                            <el-input placeholder="请输入编号后六位或全名" v-model="transferForm.usertext" clearable></el-input>
                            <el-button class="m-btn-addMenu" type="primary" icon="el-icon-search" @click="searchTransfer">查询</el-button>
                        </div>
                        <div class="transfer-wrap-table">
                            <el-table :data="transferForm.personList" style="width: 100%">
                                <el-table-column prop="user_no" label="编号"></el-table-column>
                                <el-table-column prop="relname" label="姓名"></el-table-column>
                                <el-table-column label="操作">
                                    <!--<template scope="scope">-->
                                        <!--<el-checkbox v-model="scope.row.checked"-->
                                                     <!--:disabled="scope.row.disabled"-->
                                                     <!--@change="checkTransfer(scope.row)">选择-->
                                        <!--</el-checkbox>-->
                                    <!--</template>-->
                                    <template scope="scope">
                                        <el-button size="mini" type="text" @click="submitTransfer(scope.row)">转让</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <!--<span slot="footer" class="dialog-footer">-->
                        <!--<el-button @click="transferVisible = false">退 出</el-button>-->
                        <!--<el-button type="primary" @click="finishTransfer">确 定</el-button>-->
                    <!--</span>-->
                </el-dialog>


                <el-dialog :visible.sync="bigImgVisble" width="100%">
                    <el-carousel autoplay="false" arrow="always"
                                 @change="coverHandel1">
                        <el-carousel-item v-for="(item, index) in houseDataForm.imgurl" :key="index">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </el-dialog>
            </el-row>
        </div>
    </section>
</template>
<script>
    import { getToken } from '../util/global';
    import HouseApi from '../api/api_house.js';
    import Vue from 'vue';
    import { Message } from 'element-ui';
    export default {
        install(Vue) {
            Vue.prototype.$message = Message
        },
        name: "house-details",
        props: ['id'],
        data() {
            return {
                examineLoading:false,
                editableTabsValue:'1',
                bigImgVisble:false,

                ownerHistoryData:{
                    pageNum: 1,
                    pageSize: 5,
                    total: 0,
                    list: [

                    ],
                },
                placeHistoryData:{
                    pageNum: 1,
                    pageSize: 5,
                    total: 0,
                    list: [

                    ],
                },
                houseDataForm: {
                    number:'',
                    imgurl:[],
                    xiaoquName:'',
                    price: '',
                    priceText:'',
                    priceOneText:'',
                    huxing: '',
                    areas: '',
                    chaoxiang: '',
                    floor: '',
                    createTime: '',
                    iskey: '',
                    recordrelName: '',
                    grade: '',
                    isshare:'',
                    likeType:'',
                    user_type:'',
                    examineState:'',
                    explorationTimeType:''
                },  //左侧头部数据

                ownerVisible: false, //房主信息dialog
                ownerForm: {
                    owner: '',
                    phone: '',
                    owner1: '',
                    phone1: '',
                    clickcount:0
                },
                placeVisible: false, //地址信息dialog
                placeForm: {
                    addressText: '',
                    clickcount:0
                },
                uploadData:{},  //提交postData
                curToken: {Authorization: getToken()},
                coverUrl: '',
                carouselList:[
                    {
                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2604583878,933342668&fm=27&gp=0.jpg'
                    },
                    {
                        imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3497046269,138674714&fm=27&gp=0.jpg'
                    },
                    {
                        imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=621015648,1160215088&fm=27&gp=0.jpg'
                    }

                ],  //走马灯
                radiusForm:{
                    createrelName: '',
                    recordrelName: '',
                    explorationrelName: '',
                    keyrelName: '',
                    exclusiverelName: '',
                },  //圆框标签

                examineVisible: false, //实勘dialog
                examineForm:{
                    dialogImageUrl: '',
                    dialogVisible: false,
                    shilimit:1,
                    tinglimit:1,
                    weilimit:1,
                    chulimit:1,
                    huxinglimit:1,
                    otherlimit:1,
                    bedroom: [],
                    sittingRoom: [ ],
                    toilet: [],
                    kitchen: [],
                    houseTypeImg: [],
                    other: [],
                },

                traceForm: {
                    pageNum: 1,
                    pageSize: 5,
                    total: 0,
                    list: [
                        {
                            createTime: '',
                            userRelName: '',
                            content:''
                        }
                    ],
                    textMes: ''
                },  //跟进
                lookForm:{
                    pageNum: 1,
                    pageSize: 5,
                    total: 0,
                    list: [
                        {
                            createTime: '',
                            userRelName: ''
                        }
                    ],
                },  //带看
                editForm:{
                    price: '',
                    huxingshi: '',  //需求几室
                    huxingting: '',  //需求几厅
                    huxingwei: '',  //需求几卫
                    huxingchu: '',  //需求几厨
                    areas: '',
                    chaoxiang: '',

                    floor: '',
                },
                chaoxiangList: [
                    {
                        label: '正南',
                        value: '1',
                    },
                    {
                        label: '正北',
                        value: '2',
                    },
                    {
                        label: '正东',
                        value: '3',
                    },
                    {
                        label: '正西',
                        value: '4',
                    },
                    {
                        label: '东南',
                        value: '5',
                    },
                    {
                        label: '西南',
                        value: '6',
                    },
                    {
                        label: '东北',
                        value: '7',
                    },
                    {
                        label: '西北',
                        value: '8',
                    },
                ],
                //修改
                otherForm: {
                     isspecial: '0',
                     state: '0',
                     isfine: '0',
                },
                transferVisible: false,  //转让dialog
                transferForm: {
                    usertext:'',
                    personList: [
                        {
                            relname: '',
                            user_no: '',
                            username: ''
                        }
                    ],
                    chooseName: '',
                    chooseCode: '',
                    chooseAcc: '',
                },
                checkTransferList: [],
            };
        },
        mounted:function(){
            var that = this;
            var postData = {
                id: this.id
            };
            HouseApi.housedetail(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.houseDataForm=result.data;
                that.otherForm=result.data;
                that.radiusForm=result.data;
                that.editForm = result.data;

                that.examineForm.bedroom=[];
                that.examineForm.sittingRoom=[];
                that.examineForm.toilet=[];
                that.examineForm.kitchen=[];
                that.examineForm.houseTypeImg=[];
                that.examineForm.other=[];
                that.examineForm.shilimit = parseInt(that.houseDataForm.huxingshi);
                that.examineForm.tinglimit = parseInt(that.houseDataForm.huxingting);
                that.examineForm.weilimit = parseInt(that.houseDataForm.huxingwei);
                that.examineForm.chulimit = parseInt(that.houseDataForm.huxingchu);
            }).catch(error => {
                console.log('housedetail_error'+error);
            });

            var postData1 = {
                page: 1,
                size: 5,
                houseId: this.id
            };
            HouseApi.looklist(postData1).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.lookForm=result.data;
            }).catch(error => {
                console.log('looklist_error');
            });

            HouseApi.recordlist(postData1).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.traceForm=result.data;
            }).catch(error => {
                console.log('recordlist_error');
            });
        },
        computed: {

        },
        filter:{
        },
        methods: {
            searchownerHistory(){
                var that = this;
                var postData = {
                    houseId: this.id,
                    type:'1',
                    page:this.ownerHistoryData.pageNum,
                    size:this.ownerHistoryData.pageSize,
                };

                HouseApi.getHistory(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.ownerHistoryData = result.data;
                }).catch(error => {
                    console.log('getHistory_error'+error);
                });
            },
            searchplaceHistory(){
                var that = this;
                var postData = {
                    houseId: this.id,
                    type:'1',
                    page:this.placeHistoryData.pageNum,
                    size:this.placeHistoryData.pageSize,
                };

                HouseApi.getHistory(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.placeHistoryData = result.data;
                }).catch(error => {
                    console.log('getHistory_error'+error);
                });
            },
            ownerHistoryHandle(){
                this.ownerHistoryData.pageNum=1;
                this.searchownerHistory();
            },
            placeHistoryHandle(){
                this.placeHistoryData.pageNum=1;
                this.searchplaceHistory();
            },
            ownerHistoryChangeSearch(val){
                this.ownerHistoryData.pageNum=val;
                this.searchownerHistory();
            },
            placeHistoryChangeSearch(val){
                this.placeHistoryData.pageNum=val;
                this.searchplaceHistory();
            },

            coverHandel(index){
                this.coverUrl = this.houseDataForm.imgurl[index];
            },  //走马灯切换
            carouselClick(index){
              console.log(index);
            },
            coverHandel1(index){
                this.coverUrl = this.houseDataForm.imgurl[index];
            },  //走马灯切换
            likeIt(){
                var that = this;
                var isLike = this.houseDataForm.likeType;
                var postData = {
                    houseId: this.id
                };
                if(isLike == '0'){
                    HouseApi.likeInsert(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.houseDataForm.likeType = '1';
                        Message({
                            type: 'success',
                            message: '关注成功!'
                        });
                    }).catch(error => {
                        console.log('likeInsert_error'+error);
                    });
                }else{
                    HouseApi.likeDelete(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.houseDataForm.likeType = '0';
                        Message({
                            type: 'success',
                            message: '取消关注!'
                        });
                    }).catch(error => {
                        console.log('likeDelete_error'+error);
                    });

                }
            },  //点赞

            ownerHandle(){
                var that = this;
                if(this.houseDataForm.isshare=='1'){
                    Message.error("房源为共享池房源，无法查看房主信息！");
                }else{
                    var postData = {
                        houseId: this.id
                    };
                    HouseApi.detailPhone(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        if(result.data=='您今日查询联系信息的次数已用完'){
                            Message.error("您今日查询联系信息的次数已用完");
                        }else{
                            that.ownerForm=result.data;
                            that.ownerVisible = true;
                        }
                    }).catch(error => {
                        console.log('detailPhone_error'+error);
                    });
                }

            },  //查看房主信息

            placeHandle(){
                var that = this;

                if(this.houseDataForm.isshare=='1'){
                    Message.error("房源为共享池房源，无法查看地址信息！");
                }else{
                    var postData = {
                        houseId: this.id
                    };
                    HouseApi.detailAddress(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        if(result.data=='您今日查询房屋地址的次数已用完'){
                            Message.error("您今日查询房屋地址的次数已用完");
                        }else{
                            that.placeForm=result.data;
                            that.placeVisible = true;
                        }
                    }).catch(error => {
                        console.log('detailAddress_error');
                    });
                }

            },  //查看地址信息

            examineHandel(){
                if(this.houseDataForm.isshare=='1'){
                    Message.error("此房源是共享房源，不能添加实勘图！");
                    return;
                }
                this.examineVisible = true;
            },  //实勘填图

            weihuHandel(){
                this.$confirm('此操作将维护人更改为当前用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var that = this;
                    var hid = this.id;
                    var postData = {
                        id: hid
                    };
                    HouseApi.updateIsShare(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        var postData1 = {
                            id: hid
                        };
                        HouseApi.housedetail(postData1).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            that.houseDataForm=result.data;
                            that.otherForm=result.data;
                            that.radiusForm=result.data;
                            that.editForm = result.data;
                            that.examineForm.shilimit = parseInt(that.houseDataForm.huxingshi);
                            that.examineForm.tinglimit = parseInt(that.houseDataForm.huxingting);
                            that.examineForm.weilimit = parseInt(that.houseDataForm.huxingwei);
                            that.examineForm.chulimit = parseInt(that.houseDataForm.huxingchu);
                        }).catch(error => {
                            console.log('housedetail_error');
                        });
                        Message({
                            type: 'success',
                            message: '你已成为此房源维护人'
                        });
                    }).catch(error => {
                        console.log('updateKey_error'+error);
                    });

                }).catch(() => {
//                    Message({
//                        type: 'info',
//                        message: '已取消更改!'
//                    });
                });
            },//添加维护人（共享池状态）
            keyHandel(){
                if(this.houseDataForm.isshare=='1'){
                    Message.error("此房源是共享房源，不能添加钥匙所有人！");
                    return;
                }
                this.$confirm('此操作将钥匙所有人更改为当前用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var that = this;
                    var postData = {
                        id: this.id
                    };
                    HouseApi.updateKey(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.houseDataForm.iskey = "1";
                        that.radiusForm.keyrelName=result.data;
                        Message({
                            type: 'success',
                            message: '更改成功!'
                        });
                    }).catch(error => {
                        console.log('updateKey_error'+error);
                    });

                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消更改!'
                    });
                });
            },  //修改钥匙所有人

            editSubmit(){
                var that = this;
                var hid = this.id;
                var postData = {
                    id: hid,
                    price:this.editForm.price,
                    huxingshi: this.editForm.huxingshi,
                    huxingting: this.editForm.huxingting,
                    huxingchu: this.editForm.huxingchu,
                    huxingwei: this.editForm.huxingwei,
                    areas: this.editForm.areas,
                    chaoxiang: this.editForm.chaoxiang,
                    floor: this.editForm.floor
                };
                HouseApi.updateHouse(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    if(result.data=='1'){
                        var postData1 = {
                            id: hid
                        };
                        HouseApi.housedetail(postData1).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            that.houseDataForm=result.data;
                            that.otherForm=result.data;
                            that.radiusForm=result.data;
                            that.editForm = result.data;
                            that.examineForm.shilimit = parseInt(that.houseDataForm.huxingshi);
                            that.examineForm.tinglimit = parseInt(that.houseDataForm.huxingting);
                            that.examineForm.weilimit = parseInt(that.houseDataForm.huxingwei);
                            that.examineForm.chulimit = parseInt(that.houseDataForm.huxingchu);
                        }).catch(error => {
                            console.log('housedetail_error');
                        });
                        Message({
                            message: '修改成功!',
                            type: 'success'
                        });
                    }else{
                        Message.error('修改失败!');
                    }
                }).catch(error => {
                    console.log('updateKey_error'+error);
                });

            },  //修改提交
            transferHandel(){
                this.transferForm.usertext = '';
                this.transferForm.personList = [];
                this.transferForm.chooseName = '';
                this.transferForm.chooseCode = '';
                this.transferForm.chooseAcc = '';
                this.transferVisible = true;
            },  //点击转让
            isspecialHandel(){
                var that = this;
                var isData = this.otherForm.isspecial;
                var isData1 ;
                var text = '申请审核此房源为特殊房源, 是否继续?';
                if(isData=='0'){
                    isData1='1';
                }else if(isData=='1'){
                    isData1='0';
                    text = '申请审核取消特殊房源, 是否继续?';
                }
                this.$confirm(text, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var postData = {
                        id: this.id,
                        isspecial:isData1
                    };
                    HouseApi.updateSpecial(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.otherForm.isspecial = result.data;
                        Message({
                            type: 'success',
                            message: '申请成功，请等待审核!'
                        });
                    }).catch(error => {
                        console.log('updateSpecialy_error'+error);
                    });

                }).catch(() => {
                    // Message({
                    //     type: 'info',
                    //     message: '已取消更改!'
                    // });
                });
            },
            stateHandel(){
                var that = this;
                var isData = this.otherForm.state;
                var isData1 ;
                var text = '申请审核此房源为无效房源, 是否继续?';
                if(isData=='0'){
                    isData1='1';
                }else if(isData=='1'){
                    isData1='0';
                    text = '申请审核取消无效房源, 是否继续?';
                }
                this.$confirm(text, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var postData = {
                        id: this.id,
                        state:isData1
                    };
                    HouseApi.updateState(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.otherForm.state = result.data;
                        Message({
                            type: 'success',
                            message: '申请成功，请等待审核!'
                        });
                    }).catch(error => {
                        console.log('updateState_error'+error);
                    });

                }).catch(() => {
                    // Message({
                    //     type: 'info',
                    //     message: '已取消更改!'
                    // });
                });
            },
            isfineHandel(){
                var that = this;
                var isData = this.otherForm.isfine;
                var isData1 ;
                var text = '申请审核此房源为优质房源, 是否继续?';
                if(isData=='0'){
                    isData1='1';
                }else if(isData=='1'){
                    isData1='0';
                    text = '申请审核取消优质房源, 是否继续?';
                }
                this.$confirm(text, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var postData = {
                        id: this.id,
                        isfine:isData1
                    };
                    HouseApi.updateFine(postData).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.otherForm.isfine = result.data;
                        Message({
                            type: 'success',
                            message: '申请成功，请等待审核!'
                        });
                    }).catch(error => {
                        console.log('updateFine_error'+error);
                    });

                }).catch(() => {
                    // Message({
                    //     type: 'info',
                    //     message: '已取消更改!'
                    // });
                });
            },
            searchTransfer(){
                var that = this;
                var postData = {
                    usertext: this.transferForm.usertext
                };
                HouseApi.searchUser(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.transferForm.personList=result.data;
                }).catch(error => {
                    console.log('searchUser_error');
                });
            },  //查找用户
            // checkTransfer(item){
            //     var that = this;
            //     that.transferForm.chooseName = item.relname;
            //     that.transferForm.chooseCode = item.user_no;
            //     that.transferForm.chooseAcc = item.username;
            //     console.log(item.username);
            // },  //选择用户
            submitTransfer(item){
                var that = this;
                var hid = this.id;
                var postData = {
                    id: hid,
                    recordUserName: item.username
                };
                HouseApi.updateRecordUser(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.transferVisible = false;
                    Message({
                        message: '转让成功!',
                        type: 'success'
                    });
                    that.editableTabsValue = '1';
                    var postData1 = {
                        id: hid
                    };
                    HouseApi.housedetail(postData1).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.houseDataForm=result.data;
                        that.otherForm=result.data;
                        that.radiusForm=result.data;
                        that.editForm = result.data;
                    }).catch(error => {
                        console.log('housedetail_error');
                    });
                }).catch(error => {
                    Message.error('转让失败!')
                });


            },  //确定选择
//            changeUpload(file, fileList) {
//                var that = this;
////                that.examineForm.bedroom[0].imgUrl = file.url;
////                console.log(fileList)
//            },  //上传

            handleCurrentChangeSearch(val){
                var that = this;
                that.traceForm.pageNum = val;
                var postData = {
                    houseId: this.id,
                    page: val,
                    size: 5,
                };
                HouseApi.recordlist(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.traceForm=result.data;
                }).catch(error => {
                    console.log('recordlist_error');
                });
            },

            handleCurrentChangeSearch1(val){
                var that = this;
                that.lookForm.pageNum = val;
                var postData = {
                    houseId: this.id,
                    page: val,
                    size: 5,
                };
                HouseApi.looklist(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.lookForm=result.data;
                }).catch(error => {
                    console.log('looklist_error');
                });
            },

            //提交跟进
            submitTrace(){
                var that = this;
                var hid = this.id;
                var postData = {
                    houseId: hid,
                    content:this.traceForm.textMes
                };
                HouseApi.insertRecord(postData).then(function (result) {
                    if(typeof(result) != "object"){result = JSON.parse(result)}
                    that.traceForm.textMes='';
                    var postData1 = {
                        page: 1,
                        size: 5,
                        houseId: hid
                    };

                    HouseApi.recordlist(postData1).then(function (result) {
                        if(typeof(result) != "object"){result = JSON.parse(result)}
                        that.traceForm=result.data;
                    }).catch(error => {
                        console.log('recordlist_error'+error);
                    });
                }).catch(error => {
                    console.log('insertRecord'+error);
                });
            },

            handleRemove1(file, fileList) {
                var that = this;
                var fileUid = file.uid;
                for(let i=0;i<this.examineForm.bedroom.length;i++){
                    if(this.examineForm.bedroom[i].uid==fileUid){
                        that.examineForm.bedroom.splice(i,1);
                        break;
                    }
                }
            },
            handleRemove2(file, fileList) {
                var that = this;
                var fileUid = file.uid;
                for(let i=0;i<this.examineForm.sittingRoom.length;i++){
                    if(this.examineForm.sittingRoom[i].uid==fileUid){
                        that.examineForm.sittingRoom.splice(i,1);
                        break;
                    }
                }
            },
            handleRemove3(file, fileList) {
                var that = this;
                var fileUid = file.uid;
                for(let i=0;i<this.examineForm.toilet.length;i++){
                    if(this.examineForm.toilet[i].uid==fileUid){
                        that.examineForm.toilet.splice(i,1);
                        break;
                    }
                }
            },
            handleRemove4(file, fileList) {
                var that = this;
                var fileUid = file.uid;
                for(let i=0;i<this.examineForm.kitchen.length;i++){
                    if(this.examineForm.kitchen[i].uid==fileUid){
                        that.examineForm.kitchen.splice(i,1);
                        break;
                    }
                }
            },
            handleRemove5(file, fileList) {
                var that = this;
                var fileUid = file.uid;
                for(let i=0;i<this.examineForm.houseTypeImg.length;i++){
                    if(this.examineForm.houseTypeImg[i].uid==fileUid){
                        that.examineForm.houseTypeImg.splice(i,1);
                        break;
                    }
                }
            },
            handleRemove6(file, fileList) {
                var that = this;
                var fileUid = file.uid;
                for(let i=0;i<this.examineForm.other.length;i++){
                    if(this.examineForm.other[i].uid==fileUid){
                        that.examineForm.other.splice(i,1);
                        break;
                    }
                }
            },
            handleExceed(file, fileList) {
                Message.error("超出上传范围！");
            },

            handlePictureCardPreview(file) {
                var that = this;
                that.examineForm.dialogImageUrl = file.url;
                that.examineForm.dialogVisible = true;
            },


            handleChangeImg1(file, fileList) {
                var that = this;
                var reader = new FileReader();
                var fileUid = file.uid;
                reader.readAsDataURL(file.raw);
                reader.onloadend = function(e){
                    var img64 = this.result;
                    var bean = {uid:fileUid,base64:img64};
                    that.examineForm.bedroom.push(bean);
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
                    that.examineForm.sittingRoom.push(bean);
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
                    that.examineForm.toilet.push(bean);
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
                    that.examineForm.kitchen.push(bean);
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
                    that.examineForm.houseTypeImg.push(bean);
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
                    that.examineForm.other.push(bean);
                };
            },

            uploadImg:function(param){
                var that = this;
                var hid = this.id;
                var count = this.examineForm.shilimit
                    +this.examineForm.tinglimit
                    +this.examineForm.weilimit
                    +this.examineForm.chulimit
                    +this.examineForm.huxinglimit
                    +this.examineForm.otherlimit;
                var pcount = this.examineForm.bedroom.length
                    +this.examineForm.sittingRoom.length
                    +this.examineForm.toilet.length
                    +this.examineForm.kitchen.length
                    +this.examineForm.houseTypeImg.length
                    +this.examineForm.other.length
                if(pcount<count){
                    Message.error("请上传完整数量的实勘图后，再提交审核。");
                }else{
                    this.$confirm('此操作将提交实勘审核, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.examineLoading = true;
                        var shiImgList=[],tingImgList=[],weiImgList=[],chuImgList=[],huxingImgList=[],otherImgList=[];

                        for(let i=0;i<that.examineForm.bedroom.length;i++){
                            shiImgList.push(that.examineForm.bedroom[i].base64);
                        }
                        for(let i=0;i<that.examineForm.sittingRoom.length;i++){
                            tingImgList.push(that.examineForm.sittingRoom[i].base64);
                        }
                        for(let i=0;i<that.examineForm.toilet.length;i++){
                            weiImgList.push(that.examineForm.toilet[i].base64);
                        }
                        for(let i=0;i<that.examineForm.kitchen.length;i++){
                            chuImgList.push(that.examineForm.kitchen[i].base64);
                        }
                        huxingImgList.push(that.examineForm.houseTypeImg[0].base64);
                        otherImgList.push(that.examineForm.other[0].base64);
                        var postData = {
                            id:hid,
                            shiImgList: shiImgList,
                            tingImgList: tingImgList,
                            weiImgList: weiImgList,
                            chuImgList: chuImgList,
                            huxingImgList: huxingImgList,
                            otherImgList: otherImgList,
                        };
                        HouseApi.updateImg(postData).then(function (result) {

                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            that.examineLoading = false;
                            Message({
                                message: '提交成功，请等待审核',
                                type: 'success'
                            });
                            that.examineVisible = false;
                            var postData1 = {
                                id: hid
                            };
                            HouseApi.housedetail(postData1).then(function (result) {
                                if(typeof(result) != "object"){result = JSON.parse(result)}
                                that.houseDataForm=result.data;
                                that.otherForm=result.data;
                                that.radiusForm=result.data;
                                that.editForm = result.data;
                                that.examineForm.shilimit = parseInt(that.houseDataForm.huxingshi);
                                that.examineForm.tinglimit = parseInt(that.houseDataForm.huxingting);
                                that.examineForm.weilimit = parseInt(that.houseDataForm.huxingwei);
                                that.examineForm.chulimit = parseInt(that.houseDataForm.huxingchu);
                            }).catch(error => {
                                console.log('housedetail_error');
                            });
                        }).catch(error => {
                            console.log('updateImg_error');
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            },
        }
    };
</script>
<style lang="less">
    @import "../assets/css/element.less";
    .house-details {
        /*border:1px solid red;*/
        .house-template{
            width: 100%;
            padding: 25px 50px;
            background: #fff;
            .el-row {
                .mes-concent{
                    list-style-type: none;
                    li{
                        margin-bottom: 20px;
                        overflow: hidden;
                        box-shadow: 0px 0px 10px #e3e3e3;
                        &:last-child {
                            margin-bottom: 0;
                            text-align: center;
                        }
                        .upload-big{
                            width: 45%;
                            padding: 10px;
                            float: left;
                            .blockCover{
                                width: 100%;
                                height: 15vw;
                                line-height: 15vw;
                                text-align: center;
                                cursor: pointer;
                                border: 1px solid #f2f2f2;
                            }
                            .imgCover{
                                width: 100%;
                                height: 15vw;
                                cursor: pointer;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            /*.img-uploader .el-upload{*/
                                /*width: 100%;*/
                                /*height: 15vw;*/
                                /*cursor: pointer;*/
                                /*.uploader-icon {*/
                                    /*font-size: 40px;*/
                                    /*color: #8c939d;*/
                                    /*height: 15vw;*/
                                    /*line-height: 15vw;*/
                                /*}*/
                            /*}*/
                            .carousel-wrap{
                                margin-top: 20px;
                                .el-carousel__item{
                                    height: 100px;
                                    img{
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                        }
                        .mes-wrap{
                            padding: 10px 10px 10px 0;
                            width: 55%;
                            float: left;
                            .house-price,.house-location{
                                padding: 10px 0;
                                border-bottom: 1px solid #d7d7d7;
                                font-size: 25px;
                            }
                            .house-location{
                                span{
                                    font-size: 25px;
                                }
                                .icon-love{
                                    float:right;
                                    margin-right: 20px;
                                }
                            }
                            .house-price{
                                .span1{
                                    font-size:25px;
                                }
                                .span2{
                                    font-size: 20px;
                                    color: #666;
                                    margin-left: 20px;
                                }
                            }
                            .house-basis-mes{
                                padding: 5px 0;
                                border-bottom: 1px solid #d7d7d7;
                                overflow: hidden;
                                .basis-mes{
                                    width: 25%;
                                    float: left;
                                    div{
                                        padding: 5px 0;
                                        &:first-child{
                                            font-size: 15px;
                                        }
                                        &:last-child{
                                            color: #666666;
                                        }
                                    }
                                }
                            }
                            .house-other-mes{
                                padding: 30px 0;
                                overflow: hidden;
                                .other-mes{
                                    div{
                                        height:30px;
                                        .span{
                                            color:#C51010;
                                        }
                                    }

                                    width: 50%;
                                    float: left;
                                    span{
                                        /*color: #666666;*/
                                    }
                                }
                            }
                        }
                        .el-card{
                            border: none;
                        }
                        .radius-wrap{
                            padding: 20px;
                            /*overflow: hidden;*/
                            text-align: center;
                            .radius-block{
                                .radius-data{
                                    color:#666;
                                }
                                width: 8vw;
                                height: 8vw;
                                min-width: 80px;
                                min-height: 80px;
                                margin: 1vw;
                                display: inline-block;
                                box-shadow: 0px 0px 10px #e3e3e3;
                                border-radius: 100px;
                                position: relative;

                                .el-button{
                                    position: absolute;
                                    bottom: 0;
                                    left: 3.1vw;
                                    i{
                                        font-size:1.6vw
                                    }
                                }
                                div{
                                    margin-top: 2px;
                                    &:first-child {
                                        font-size: 16px;
                                    }
                                }
                            }
                            .radius-data-btn{
                                box-shadow: 0px 0px 10px #c51010;
                            }
                        }
                    }
                }
                .tab-content{
                    box-shadow: 0px 0px 10px #e3e3e3;
                    .el-tabs{
                        /*min-height: 310px;*/
                        border: none;
                        box-shadow: none;
                        position: relative;
                        .pagination-template{
                            padding: 10px 0;
                            text-align: right;
                            border-bottom: 1px solid #f2f2f2;
                        }
                        .trace-template{
                            margin-top: 10px;
                            overflow: hidden;
                            .trace-title{
                                float: left;
                                width: 15%;
                            }
                            .trace-textarea{
                                float: left;
                                width: 85%;
                            }
                        }
                        .trace-button{
                            margin-top: 10px;
                            text-align: right;
                        }
                    }
                }
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
                .ownerForm{
                    .row{
                        margin-bottom:10px;
                        font-size:18px;
                    }
                }
                /*.el-dialog{*/
                    /*.examine-form{*/
                        /*.el-form-item{*/
                            /*overflow: hidden;*/
                            /*.el-upload{*/
                                /*width: 100px;*/
                                /*height: 100px;*/
                                /*line-height: 106px;*/
                                /*margin-left: 20px;*/
                                /*cursor: pointer;*/
                                /*float: left;*/
                                /*img{*/
                                    /*width: 100%;*/
                                    /*height: 100%;*/
                                /*}*/
                            /*}*/
                            /*.el-upload:hover {*/
                                /*border-color: #409EFF;*/
                            /*}*/


                        /*}*/

                    /*}*/
                /*}*/
            }
        }
    }
</style>
