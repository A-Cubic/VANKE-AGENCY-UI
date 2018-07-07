<template>
    <section class="contrastAgent">
        <header class="this_header">
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>放射设置</el-breadcrumb-item>
                <el-breadcrumb-item>其他</el-breadcrumb-item>
                <el-breadcrumb-item>造影剂</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section class="topCy">
        	<h2 class="total">
		        <el-button type="primary" @click="newAgent = true" class="btn">新建</el-button>
	        	<el-button class='refresh' type="primary" :loading="false">
	        		<!--<i class="icon el-icon-loading"></i>-->
	        		刷新
	        	</el-button>共 <em class="em">1000</em> 条记录
	        </h2>
	        <section class="this_section">
	            <template>
	                <el-table stripe class="this_table" :data="tableData3" border style="width: 100%" height="100%">
	                    <el-table-column label="操作" width="180">
	                        <template scope="scope">
	                            <el-button size="mini" :plain="true" type="success" icon="edit" @click="reAgent=true"></el-button>
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
        	<h2 class="total">
		        <el-button type="primary" @click="newdata = true;data=true" class="btn">新建</el-button>
	        		<el-button class='refresh' type="primary" :loading="false">
	        		<!--<i class="icon el-icon-loading"></i>-->
	        		刷新
	        	</el-button>共 <em class="em">1000</em> 条记录
	        </h2>
	        <section class="this_section">
	            <template>
	                <el-table stripe class="this_table" :data="tableData3" border style="width: 100%" height="100%">
	                    <el-table-column label="操作" width="180">
	                        <template scope="scope">
	                            <el-button size="mini" :plain="true" type="success" icon="edit" @click="newdata=true;data=false"></el-button>
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
         <div class="alert">
        <!-- 新建造影剂 -->
            <el-dialog size="tiny" title="新建造影剂" v-model="newAgent" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" :rules="rules" label-width="85px"  ref='form'>
                    <el-row>
                        <el-col :span="15" offset="2">
                            <el-form-item label="造影剂:" prop="zyj">
                                <el-input v-model="form.jcbw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="15" offset="2">                   	
	                    	<el-form-item>
	                            <el-checkbox v-model="checked">默认</el-checkbox>
	                        </el-form-item>
                        </el-col>                       
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button type="primary" @click="newAgent = false">保存并新建</el-button>
                    <el-button @click="newAgent = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
        <!-- 编辑造影剂 -->
        <el-dialog size="tiny" title="编辑造影剂" v-model="reAgent" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" :rules="rules" label-width="85px"  ref='form'>
                    <el-row>
                        <el-col :span="15" offset="2">
                            <el-form-item label="造影剂:" prop="zyj">
                                <el-input v-model="form.jcbw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="15" offset='2'>                   	
	                    	<el-form-item>
	                            <el-checkbox v-model="checked">默认</el-checkbox>
	                        </el-form-item>
                        </el-col>                       
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button @click="reAgent = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
        <!-- 新建造影剂参数 -->       
            <el-dialog size="tiny" title="新建造影剂参数" v-model="newdata" :close-on-click-modal="false">
                <el-form label-position="right" :model="form" ref='form' :rules="rules" label-width="85px">
                    <el-row>
                        <el-col :span="15" offset="2">
                            <el-form-item label="造影剂:">
                                <span>造影剂1</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="15" offset="2">
                            <el-form-item label="参数类型:" prop="cslx">
                                <el-input v-model="form.cslx"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="15" offset="2">
                            <el-form-item label="参数:" prop="cs">
                                <el-select v-model="form.cs">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="15" offset='2'>                   	
	                    	<el-form-item>
	                            <el-checkbox v-model="checked">默认</el-checkbox>
	                        </el-form-item>
                        </el-col>                       
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button type="primary" @click="newdata = false"  v-if="data?true:false">保存并新建</el-button>
                    <el-button @click="newdata = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
        <!-- 编辑造影剂参数 -->
            <!--<el-dialog size="tiny" title="新建造影剂参数" v-model="redata">
                <el-form label-position="left" :model="form" :rules="rules" label-width="85px">
                    <el-row>
                        <el-col :span="15" offset="2">
                            <el-form-item label="造影剂:">
                                <span>造影剂1</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14" offset="2">
                            <el-form-item label="参数类型:" prop="cslx">
                                <el-input v-model="form.cslx"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="15" offset="2">
                            <el-form-item label="参数:" prop="cs">
                                <el-select v-model="form.cs">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" offset="2">
                            <el-checkbox v-model="checked">默认</el-checkbox>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button @click="redata = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>-->
        </div>

    </section>
</template>
<script>
export default {
    data() {
            return {
                input: '',
                newAgent:false,
                reAgent:false,
                newdata:false,
                redata:false,
                formLabelWidth: '120px',
                rules: {
                    zyj: [{
                        required: true,
                        message: '请输入造影剂名称',
                        trigger: 'blur'
                    }],
                    name: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }],
                    region: [{
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }],
                    date1: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    date2: [{
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                    }],
                    type: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }],
                    resource: [{
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }],
                    cslx: [{
                        required: true,
                        message: '请填写参数类型',
                        trigger: 'blur'
                    }],
                    cs: [{
                        required: true,
                        message: '请选择参数',
                        trigger: 'change'
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
                    cs:''
                },
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
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
<style lang="less">

.contrastAgent {
    
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
    .alert {
        .el-select {
            width: 100%;
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
