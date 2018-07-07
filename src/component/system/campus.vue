<template>
    <section class="campus">
        <header class="this_header">
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>院区管理</el-breadcrumb-item>
            </el-breadcrumb>
            <nav class="this_nav">
<!--                 <span class="demonstration">选择地区:</span>
                <el-cascader placeholder="请输入或者选择地区" :options="options" filterable change-on-select></el-cascader>
                <span class="demonstration">院区编号:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                <span class="demonstration">院区名称:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <el-button type="primary" @click="dialogFormVisible = true" class="btn">查询</el-button>
                <el-button :plain="true" type="info" @click="dialogFormVisible = false;resetForm('form')" class="btn">重 置</el-button>
            </nav>
        </header>
        <h2 class="total">
            <el-button type="primary"  @click="show_alert('new_region')" class="btn">新建</el-button>
            <el-button class='refresh' type="primary" :loading="false">
                <!-- <i class="icon el-icon-loading"></i> -->
                刷新
            </el-button>共 <em class="em">1000</em> 条记录
        </h2>
        <section class="this_section">
            <template>
                <el-table stripe class="this_table" :data="tableData3" border style="width: 100%">
                    <el-table-column label="操作" width="150">
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
        <aside class="alert">
            <el-dialog  title="管理员" v-model="alert.look_admin">
                <section class="alert_conetnt">
                    <el-row>
                        <el-col :span="12">
                            <span class="six">院区编号:</span>
                            <span></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">院区名称:</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span class="six">省份:</span>
                            <span></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">地级市:</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <span class="six">区/县:</span>
                        </el-col>
                    </el-row>
                    <hr class="hr">
                    <el-row>
                        <el-col :span="12">
                            <span class="six">管理员用户:</span>
                            <span></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">默认密码:</span>
                            <span>8888888</span>
                            <el-button class="reset" type="primary" size="mini">重置密码</el-button>
                        </el-col>
                    </el-row>
                </section>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="hide_alert('look_admin')">关 闭</el-button>
                </div>
            </el-dialog>
            <el-dialog  title="查看院区" v-model="alert.look_campus">
                <section class="alert_conetnt">
                    <el-row>
                        <el-col :span="12">
                            <span class="six">总院:</span>
                            <span></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">上级医院:</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span class="six">院区编号:</span>
                            <span></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">院区名称:</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span class="six">院区等级:</span>
                            <span></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">联系电话:</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span class="six">省份:</span>
                            <span></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">地级市:</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span class="six">区/县:</span>
                            <span></span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">上级医院:</span>
                        </el-col>
                    </el-row>
                    <hr class="hr">
                    <el-row>
                        <el-col :span="12">
                            <span class="six">登记工作站:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">机房工作站:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span class="six">诊断工作站:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">统计工作站:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span class="six">系统工作站:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">WokeList:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span class="six">QA工作站:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="six">存档工作站:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <span class="six">链接设备数:</span>
                            <span>共10套,剩 <em class="em">2</em> 套</span>
                        </el-col>
                    </el-row>
                </section>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="hide_alert('look_campus')">关 闭</el-button>
                </div>
            </el-dialog>
            <el-dialog :close-on-click-modal="false" title="新建院区" top="0px" class="new_region" size="small" v-model="alert.new_region">
                <el-form :rules="rules" ref="form" :model="form" label-width="90px">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item prop="number" label="院区编号:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="name" label="院区名称:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item prop="level" label="院区等级:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="联系电话:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item prop="province" label="省份:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="city" label="地级市:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item prop="area" label="区/县">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <span class="label">医院图标:</span>
                            <el-button type="primary" size="small">添加</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="活动名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="活动名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <hr class="hr">
                    <h1>放射(剩余100天)</h1>
                    <hr class="hr">
                    <el-form-item label="序列号:" class="long">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="注册码:" class="long">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="登记工作站:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="机房工作站;">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="诊断工作站:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="统计工作站:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="系统工作站:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="WokeList:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="QA工作站:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="存档工作站:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="连接设备数:">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button class="btn" type="primary">保存并新建</el-button>
                    <el-button class="btn" @click="hide_alert('new_region')">取 消</el-button>
                </div>
            </el-dialog>
        </aside>
    </section>
</template>
<script>
export default {
    data() {
        return {
            alert: {
                look_admin: false,
                look_campus: false,
                new_region: false
            },
            input: '',
            formLabelWidth: '120px',
            rules: {
                number: [{
                    required: true,
                    message: '请输入院区编号',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '请输入院区名称',
                    trigger: 'blur'
                }],
                level: [{
                    required: true,
                    message: '请输入院区等级',
                    trigger: 'blur'
                }],
                province: [{
                    required: true,
                    message: '请选择省份',
                    trigger: 'change'
                }],
                city: [{
                    required: true,
                    message: '请选择地级市',
                    trigger: 'change'
                }],
                area: [{
                    required: true,
                    message: '请选择区县',
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
@import "../../assets/css/element.less";
.campus {
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
            padding-left: none;
            display: flex;
            align-items: center;
            // flex-wrap:wrap;
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
            margin-right: 1em;
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
            width: 190px;
        }
        .btn{
            margin-left: 1em;
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
            .el-row {
                height: 2.5em;
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
