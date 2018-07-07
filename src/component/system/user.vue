<template>
    <section class="user">
        <header class="this_header">
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
            <nav class="this_nav">
                <span class="demonstration">姓名:</span>
                <el-input placeholder="请输入内容"></el-input>
            </nav>
        </header>
        <h2 class="total">
            <el-button type="primary" @click="dialogFormVisible = true" class="btn">新建</el-button>
        	<el-button class='refresh' type="primary" :loading="false">刷新</el-button>
            共 <em class="em">1000 </em> 条记录
        </h2>
        <section class="this_section">
            <template>
                <el-table stripe class="this_table" :data="tableData3" border style="width: 100%">
                    <el-table-column label="操作" width="130">
                        <template scope="scope">
                            <el-button size="mini" :plain="true" type="success" icon="edit"></el-button>
                            <el-popover placement="top" width="160">
                                <p>您确定要删除这段信息吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="">取消</el-button>
                                    <el-button type="primary" size="mini" @click="">确定</el-button>
                                </div>
                                <el-button size="mini" :plain="true" type="danger" icon="delete" slot="reference"></el-button>
                            </el-popover>
                            <el-button size="mini" :plain="true" type="success" icon="menu" ></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="地区代码" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="地区名称" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="上级代码" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="上级地区名称">
                    </el-table-column>
                </el-table>
            </template>
        </section>
        <aside class="alert">
            <el-dialog :close-on-click-modal="false" class="new_region" size="small" title="新建地区" v-model="dialogFormVisible">
                <el-form ref="form" :rules="rules" :model="form" label-width="90px">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="用户名:" prop="account">
                                <el-input v-model="form.name" class="short"></el-input>
                                <el-button type="primary" size="small">重新获取</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="姓名:"  prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="手机号码:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="短号:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="邮箱:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="性别:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="有效期">
                                <template>
                                    <el-radio class="radio" v-model="radio" label="1">永久</el-radio>
                                    <el-radio class="radio" v-model="radio" label="2">日期范围</el-radio>
                                </template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-date-picker type="datetimerange" placeholder="选择时间范围">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="状态">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <span class="label">输入法:</span>
                            <span class="value">搜狗输入法</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item  prop="role" label="角色:" class="long">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
	                    <el-col :span="24">
	                        <el-form-item label="角色描述:">
	                            <el-input type="textarea" :rows="10" placeholder="请输入内容">
	                            </el-input>
	                        </el-form-item>
	                    </el-col>
	                </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" type="primary" @click="dialogFormVisible = false">保 存</el-button>
                    <el-button class="btn" type="primary" @click="dialogFormVisible = false">保存并新建</el-button>
                    <el-button class="btn" @click="dialogFormVisible = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
        </aside>
    </section>
</template>
<script>
export default {
    data() {
        return {
            radio: '',
            dialogFormVisible: false,
            formLabelWidth: '120px',
            rules: {
                account: [{
                    required: true,
                    message: '请获取用户名',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '请填写姓名',
                    trigger: 'blur'
                }],
                role: [{
                    required: true,
                    message: '请选择角色',
                    trigger: 'change'
                }],
            },
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
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
            // this.$refs[formName].validate((valid) => {
            //   if (valid) {
            //     alert('submit!');
            //   } else {
            //     console.log('error submit!!');
            //     return false;
            //   }
            // });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/element.less";
.user {
    .this_header {
        height: 100px;
        .crumbs {
            width: 96%;
            margin: 10px auto;
        }
        .this_nav {
            background: #f2f2f2;
            width: 96%;
            margin: 10px auto;
            padding: 1em;
            display: flex;
            align-items: center;
            .el-input,
            .el-select {
                width: 193px;
            }
            .demonstration {
                margin-right: 1em;
                margin-left: 1em;
            }
        }
    }
    .total {
        // border:1px solid red;
        font-size: 14px;
        width: 96%;
        margin: 10px auto 0;
        text-align: right;
        // letter-spacing:1px;
        .btn{
            margin-right: 1em;
        }
        .refresh {
            margin-right: 15px;
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
    .alert {
        .el-input,
        .el-select {
            width: 1.6rem;
        }
        .short {
            width: 0.8rem;
        }
        .value{
            width:100px;
            text-align:left;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            line-height:1;
            padding:11px 12px 11px 0;
        }
        .long{
        	.el-input,
        	.el-select {
        	    width: 3.43rem;
        	}
        }
        .btn{
            margin-left: 1em;
        }
    }
}
</style>
