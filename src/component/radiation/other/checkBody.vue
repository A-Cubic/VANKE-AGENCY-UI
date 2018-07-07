<template>
    <section class="checkBody">
        <header class="this_header">
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>放射设置</el-breadcrumb-item>
                <el-breadcrumb-item>其他</el-breadcrumb-item>
                <el-breadcrumb-item>检查部位</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section class="topCy">
        	<h2 class="total">
		        <el-button type="primary" @click="newBody = true" class="btn">新建</el-button>
	        	<el-button class='refresh' type="primary" :loading="false">
        		<!-- <i class="icon el-icon-loading"></i> -->
                刷新
	        	</el-button>共 <em class="em">1000</em> 条记录
	        </h2>
	        <section class="this_section">
	            <template>
	                <el-table stripe class="this_table" :data="tableData3" border style="width:100%" height="100%">
	                    <el-table-column label="操作" width="150">
	                        <template scope="scope">
	                            <el-button size="mini" :plain="true" type="success" icon="edit"  @click="resetBody=true"></el-button>
	                            <el-popover placement="top" width="160">
	                                <p>您确定要删除这段信息吗？</p>
	                                <div style="text-align: right; margin: 0">
	                                    <el-button size="mini" type="text" @click="">取消</el-button>
	                                    <el-button type="primary" size="mini" @click="">确定</el-button>
	                                </div>
	                                <el-button size="mini" :plain="true" type="danger" icon="delete" slot="reference"></el-button>
	                            </el-popover>
	                            <el-button size="mini" :plain="true" type="success" icon="warning" @click="show_alert('look_campus')"></el-button>
	                            <el-button size="mini" :plain="true" type="success" icon="menu" @click="show_alert('look_admin')"></el-button>
	                        </template>
	                    </el-table-column>
	                    <el-table-column prop="date" label="院区编号">
	                    </el-table-column>
	                    <el-table-column prop="name" label="院区名称">
	                    </el-table-column>
	                    <el-table-column prop="address" label="院区等级">
	                    </el-table-column>
	                    <el-table-column prop="address" label="地区">
	                    </el-table-column>
	                    <el-table-column prop="address" label="联系电话">
	                    </el-table-column>
	                </el-table>
	            </template>
	        </section>
        </section>
        <section class="botCy">
        	<section class="all">
        		<section class="left">
        			<h2 class="total">
        				<el-button type="primary" @click="newsplit = true" class="btn">新建</el-button>
			        	<el-button class='refresh' type="primary" :loading="false">
        		<!-- <i class="icon el-icon-loading"></i> -->
                刷新
			        	</el-button>共 <em class="em">1000</em> 条记录
        			</h2>
        			<section class="this_sectionone">
        				<template>
			                <el-table stripe class="this_table" :data="tableData3" border style="width:100%" height="100%">
			                    <el-table-column label="操作" width="150">
			                        <template scope="scope">
				                        <el-button size="mini" :plain="true" type="success" icon="edit" @click="resetsplit=true"></el-button>
			                            <el-popover placement="top" width="160">
			                                <p>您确定要删除这段信息吗？</p>
			                                <div style="text-align: right; margin: 0">
			                                    <el-button size="mini" type="text" @click="">取消</el-button>
			                                    <el-button type="primary" size="mini" @click="">确定</el-button>
			                                </div>
			                                <el-button size="mini" :plain="true" type="danger" icon="delete" slot="reference"></el-button>
			                            </el-popover>
			                            <el-button size="mini" :plain="true" type="success" icon="warning" @click="show_alert('look_campus')"></el-button>
			                            <el-button size="mini" :plain="true" type="success" icon="menu" @click="show_alert('look_admin')"></el-button>
			                        </template>
			                    </el-table-column>
			                    <el-table-column prop="date" label="院区编号">
			                    </el-table-column>
			                    <el-table-column prop="name" label="院区名称">
			                    </el-table-column>
			                    <el-table-column prop="address" label="院区等级">
			                    </el-table-column>
			                    <el-table-column prop="address" label="地区">
			                    </el-table-column>
			                    <el-table-column prop="address" label="联系电话">
			                    </el-table-column>
			                </el-table>
			            </template>
        			</section>
        		</section>
        		<section class="right">
        			<h2 class="total2">
        				<el-button type="primary" @click="newdata = true" class="btn">新建</el-button>
			        	<el-button class='refresh' type="primary" :loading="false">
        		<!-- <i class="icon el-icon-loading"></i> -->
                刷新
			        	</el-button>共 <em class="em">1000</em> 条记录
        			</h2>
        			<section class="this_sectiontwo">
        				<template>
			                <el-table stripe class="this_table" :data="tableData3" border style="width: 100%" height="100%">
			                    <el-table-column label="操作" width="150">
			                        <template scope="scope">
			                            <el-button size="mini" :plain="true" type="success" icon="edit" @click="resetdata=true"></el-button>
			                            <el-popover placement="top" width="160">
			                                <p>您确定要删除这段信息吗？</p>
			                                <div style="text-align: right; margin: 0">
			                                    <el-button size="mini" type="text" @click="">取消</el-button>
			                                    <el-button type="primary" size="mini" @click="">确定</el-button>
			                                </div>
			                                <el-button size="mini" :plain="true" type="danger" icon="delete" slot="reference"></el-button>
			                            </el-popover>
			                            <el-button size="mini" :plain="true" type="success" icon="warning" @click="show_alert('look_campus')"></el-button>
			                            <el-button size="mini" :plain="true" type="success" icon="menu" @click="show_alert('look_admin')"></el-button>
			                        </template>
			                    </el-table-column>
			                    <el-table-column prop="date" label="院区编号">
			                    </el-table-column>
			                    <el-table-column prop="name" label="院区名称">
			                    </el-table-column>
			                    <el-table-column prop="address" label="院区等级">
			                    </el-table-column>
			                    <el-table-column prop="address" label="地区">
			                    </el-table-column>
			                    <el-table-column prop="address" label="联系电话">
			                    </el-table-column>
			                </el-table>
			            </template>
        			</section>
        		</section>
        	</section>
        </section>
        <!-- 弹窗 -->
        <div class="dialog">
        <!-- 新建检查部位 -->
            <el-dialog size="tiny" title="新建检查部位" v-model="newBody" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" :rules="rules" label-width="85px"  ref='form'>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="检查类型:" prop="jclx">
                                <el-select v-model="form.jclx">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="父级部位:" prop="fjbw">
                                <el-select v-model="form.fjbw">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="部位代码:" prop="bwdm">
                                <el-input v-model="form.bwdm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="检查部位:" prop="jcbw">
                                <el-input v-model="form.jcbw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="英文名称:" prop="ywmc">
                                <el-input v-model="form.ywmc"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="拼音缩写:" prop="pysx">
                                <el-input v-model="form.pysx"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="检查项目:" prop="jcxm">
                                <el-select v-model="form.jcxm">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="HIS编码:" prop="his">
                                <el-input v-model="form.his"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="使用频率:" prop="sypl">
                                <el-input v-model="form.sypl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="基本部位:" prop="jbbw">
                                <el-input v-model="form.jbbw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="检查费用:" prop="jcfy">
                                <el-input v-model="form.jcfy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="拆分数:" prop="cfs">
                                <el-input v-model="form.cfs"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="胶片数:" prop="jps">
                                <el-input v-model="form.jps"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="胶片规格:" prop="jpgg">
                                <el-select v-model="form.jpgg">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="检查方法:" prop="jcff">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="注意事项:" prop="zyss">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button type="primary" @click="newBody = false">保存并新建</el-button>
                    <el-button @click="newBody = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 编辑检查部位 -->
            <el-dialog size="tiny" title="编辑检查部位" v-model="resetBody" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" :rules="rules" label-width="85px"  ref='form'>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="检查类型:" prop="jclx">
                                <el-select v-model="form.jclx">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="父级部位:" prop="fjbw">
                                <el-select v-model="form.fjbw">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="部位代码:" prop="bwdm">
                                <el-input v-model="form.bwdm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="检查部位:" prop="jcbw">
                                <el-input v-model="form.jcbw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="英文名称:" prop="ywmc">
                                <el-input v-model="form.ywmc"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="拼音缩写:" prop="pysx">
                                <el-input v-model="form.pysx"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="检查项目:" prop="jcxm">
                                <el-select v-model="form.jcxm">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="HIS编码:" prop="his">
                                <el-input v-model="form.his"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="使用频率:" prop="sypl">
                                <el-input v-model="form.sypl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="基本部位:" prop="jbbw">
                                <el-input v-model="form.jbbw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="检查费用:" prop="jcfy">
                                <el-input v-model="form.jcfy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="拆分数:" prop="cfs">
                                <el-input v-model="form.cfs"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="胶片数:" prop="jps">
                                <el-input v-model="form.jps"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="胶片规格:" prop="jpgg">
                                <el-select v-model="form.jpgg">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="检查方法:" prop="jcff">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="注意事项:" prop="zyss">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button @click="resetBody = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 新建拆分部位 -->
            <el-dialog size="tiny" title="新建拆分部位" v-model="newsplit" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" :rules="rules" label-width="85px"  ref='form'> 
                    <el-row>
                        <el-col :span="22" offset="5">
                            <el-form-item label="检查类型:" prop="jps">
                                <span>CR</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22" offset="5">
                            <el-form-item label="检查部位:" prop="jpgg">
                                <span>胸正侧位</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22" offset="5">
                            <el-form-item label="拆分部位:" prop="cfbw">
                                <el-select v-model="form.cfbw">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button type="primary" @click="newsplit = false">保存并新建</el-button>
                    <el-button @click="newsplit = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 编辑拆分部位 -->
            <el-dialog size="tiny" title="编辑拆分部位" v-model="resetsplit" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" :rules="rules" label-width="85px"  ref='form'>
                    <el-row>
                        <el-col :span="22" offset="5">
                            <el-form-item label="检查类型:" prop="jps">
                                <span>CR</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22" offset="5">
                            <el-form-item label="检查部位:" prop="jpgg">
                                <span>胸正侧位</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22" offset="5">
                            <el-form-item label="拆分部位:" prop="cfbw">
                                <el-select v-model="form.cfbw">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button @click="resetsplit = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 新建部位参数 -->
            <el-dialog size="tiny" title="新建部位参数" v-model="newdata" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" :rules="rules" label-width="85px"  ref='form'>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="检查类型:" >
                                <span>CR</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="检查部位:" >
                                <span>胸正侧位</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="拆分部位:" >
                                <span>胸侧位</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="参数名称:" prop="csmc">
                                <el-select v-model="form.csmc">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="参 数 值:" prop="csz">
                                <el-input v-model="form.csz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="参数单位:" prop="csdw">
                                <span>mAs</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button type="primary" @click="newdata = false">保存并新建</el-button>
                    <el-button @click="newdata = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 编辑部位参数 -->
            <el-dialog size="tiny" title="编辑部位参数" v-model="resetdata" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" :rules="rules" label-width="85px"  ref='form'>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="检查类型:" >
                                <span>CR</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="检查部位:" >
                                <span>胸正侧位</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="拆分部位:" >
                                <span>胸侧位</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="参数名称:" prop="csmc">
                                <el-select v-model="form.csmc">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="参 数 值:" prop="csz">
                                <el-input v-model="form.csz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="参数单位:" prop="csdw">
                                <span>mAs</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button @click="resetdata = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>
<script>
export default {
    data() {
            return {
                input: '',
                dialogFormVisible: false,
                twolog:false,
                threelog:false,
                fourlog:false,
                newBody:false,
                newsplit:false,
                newdata:false,
                resetBody:false,
                resetsplit:false,
                resetdata:false,
                formLabelWidth: '120px',
                value: '',
                textarea: '',
                options: [{
		          	value: '选项1',
		          	label: '黄金糕'
		        }, {
		          	value: '选项2',
		          	label: '双皮奶'
		        }, {
		          	value: '选项3',
		          	label: '蚵仔煎'
		        }, {
		          	value: '选项4',
		          	label: '龙须面'
		        }, {
		          	value: '选项5',
		          	label: '北京烤鸭'
		        }],
                rules: {
                    jclx: [{
                        required: true,
                        message: '请选择检查类型',
                        trigger: 'blur'
                    }],
                    fjbw: [{
                        required: false,
                    }],
                    bwdm: [{
                        required: true,
                        message: '请输入部位代码',
                        trigger: 'blur'
                    }],
                    jcbw: [{
                        required: true,
                        message: '请选择检查部位',
                        trigger: 'blur'
                    }],
                    ywmc: [{
                        required: false,
                    }],
                    pysx: [{
                        required: false,
                    }],
                    jcxm: [{
                        required: false,
                    }],
                    his: [{
                        required: false,
                    }],
                    sypl: [{
                        required: false,
                    }],
                    jbbw: [{
                        required: false,
                    }],
                    jcfy: [{
                        required: false,
                    }],
                    cfs: [{
                        required: true,
                        message: '请添加拆分数',
                        trigger: 'blur'
                    }],
                    jps: [{
                        required: false,
                    }],
                    jpgg: [{
                        required: false,
                    }],
                    cfbw: [{
                        required: true,
                        message: '请选择拆分部位',
                        trigger: 'blur'
                    }],
                    csmc: [{
                        required: true,
                        message: '请选择参数名称',
                        trigger: 'blur'
                    }],
                    csz: [{
                        required: true,
                        message: '请添加参数值',
                        trigger: 'blur'
                    }]
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    jclx:'',
                    fjbw:'',
                    jcxm:'',
                    jpgg:''
                },
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            };
        },
        methods: {
            submitForm(formName) {
                   this.$refs[formName].validate((valid) => {
                     if (valid) {
                       alert('submit!');
                     } else {
                       console.log('error submit!!');
                       return false;
                     }
                   });
            },
            resetForm(formName) {
                // this.$refs[formName].resetFields();
            }
        }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/element.less";
.checkBody {
	.td{
		height: 45px!important;
	}
	.el-textarea{
		width: 300px!important;
	}
    .this_header {
        // padding-top: 10px;
        height: 30px;
        .crumbs {
            // margin: 15px 30px;
            width: 96%;
            margin: 10px auto;
        }
        .this_nav {
            background: #f2f2f2;
            width: 96%;
            margin: 10px auto;
            padding: 1em;
            padding-left: none;
            display: flex;
            align-items: center;
            .demonstration {
                margin-right: 1em;
                margin-left: 1em;
            }
            .el-input,
            .el-select {
                width: 190px;
            }
            .btn {
                margin-left: 1em;
            }
            // border-top: 1px solid rgb(238, 246, 243);
            // margin-top: 30px;
        }
    }
    .topCy{
    	height: 50%;
	    display: flex;
	    flex-direction: column;
   		width: 100%;

    	.total {
	        // border:1px solid red;
	        font-size: 14px;
	        width: 96%;
	        margin: 10px auto 0;
	        text-align: right;
	        // letter-spacing:1px;
	        .refresh {
	            margin-right: 1em;
	        }
	        .el-button+.el-button{
	        	margin-left: 1em;
	        }
	    }
	    .this_section {
	        display: flex;
	        width: 96%;
	        margin: 10px auto 0;
	        flex-shrink: 2;
	        height: 100%;
	        .this_table {
	            height: 100%;
	            .el-button+.el-button {
                margin-left: 0;
            }
	            .cell {
	                text-align: center;
	            }
	            .icon {
	                // height: 3;
	                width: 20px;
	                // border:1px solid red;
	                &:hover {
	                    color: #4bc889;
	                }
	            }
	        }
	    }
    }
    .botCy{
    	height: 50%;
	    display: flex;
	    flex-direction: column;
   		width: 100%;
   		.all{
   			width: 96%;
   			display: flex;
	        margin: 10px auto 0;
	        flex-shrink: 2;
	        height: 100%;
	        flex-direction:row;
	        justify-content: space-between;
			.left{
				width: 39%;
				display: flex;
				flex-direction:column;
				.total {
			        // border:1px solid red;
			        font-size: 14px;
			        width: 100%;
			        margin: 10px auto 0;
			        text-align: right;
			        // letter-spacing:1px;
			        .refresh {
			            margin-right: 1em;
			        }
			        .el-button+.el-button{
			        	margin-left: 1em;
			        }
			    }
			    .this_sectionone {
			        display: flex;
			        width: 100%;
			        margin: 10px auto 0;
			        flex-shrink: 2;
			        height: 100%;
			        .this_table {
			            height: 100%;
			            .el-button+.el-button {
                margin-left: 0;
            }
			            .cell {
			                text-align: center;
			            }
			            .icon {
			                // height: 3;
			                width: 20px;
			                // border:1px solid red;
			                &:hover {
			                    color: #4bc889;
			                }
			            }
			        }
			    }
			}
			.right{
				width: 59%;
				display: flex;
				flex-direction:column;
				.total2 {
			        // border:1px solid red;
			        font-size: 14px;
			        width: 100%;
			        margin: 10px auto 0;
			        text-align: right;
			        // letter-spacing:1px;
			        .refresh {
			            margin-right: 1em;
			        }
			        .el-button+.el-button{
			        	margin-left: 1em;
			        }
			    }
			    .this_sectiontwo {
			        display: flex;
			        width: 100%;
			        margin: 10px auto 0;
			        flex-shrink: 2;
			        height: 100%;
			        .this_table {
			            height: 100%;
			            .el-button+.el-button {
                margin-left: 0;
            }
			            .cell {
			                text-align: center;
			            }
			            .icon {
			                // height: 3;
			                width: 20px;
			                // border:1px solid red;
			                &:hover {
			                    color: #4bc889;
			                }
			            }
			        }
			    }
			}
   		}
   		
   	}
    .alert {
        .el-input,
        .el-select {
            width: 190px;
        }
        .long {
            .el-input,
            .el-select {
                width: 543px;
            }
        }
        .alert_conetnt {
            width: 80%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            .tr {
                width: 100%;
                display: flex;
                p {
                    height: 60px;
                    line-height: 60px;
                    width: 100%;
                    .long{
                    	width:500px;
                    }
                    span {
                        font-size: 16px;
                    }
                }

                .td {
                    height: 30px;
                    line-height: 30px;
                    width: 50%;
                    span {
                        font-size: 16px;
                    }
                    .reset {
                        margin-left: 1em;
                    }
                }
                .td2 {
                    height: 64px;
                    line-height: 64px;
                    width: 100%;
                    span {
                        font-size: 16px;
                    }
                    .reset {
                        margin-left: 1em;
                    }
                }
            }
        }
        .new_region {
            .label {
                width: 80px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                line-height: 1;
                padding: 11px 12px 11px 0;
            }
        }
    }
}
</style>
