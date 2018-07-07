<template>
    <section class="region">
        <header class="this_header">
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>地区管理</el-breadcrumb-item>
            </el-breadcrumb>
            <nav class="this_nav">
                <span class="demonstration">选择地区:</span>
                <el-cascader placeholder="请输入或者选择地区" :options="options" filterable change-on-select></el-cascader>
            </nav>
        </header>
        <h2 class="total">
            <el-button type="primary" class="btn" @click="dialogFormVisible=true">新建</el-button>
            <el-button @click="loading" class='refresh' type="primary" :loading="load">刷新</el-button>
            共 <em class="em">1000</em> 条记录
        </h2>
        <section class="this_section">
            <template>
                <el-table stripe class="this_table" :data="tableData3" border style="width: 100%">
                    <el-table-column label="操作" width="150" prop="id">
                        <template scope="scope">
                            <el-button size="mini" :plain="true" type="success" icon="edit"></el-button>
                            <el-popover placement="top" width="160">
                                <p>您确定要删除这段信息吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="updateVisible">取消</el-button>
                                    <el-button type="primary" size="mini" @click="deleted(scope.row.index)">确定</el-button>
                                </div>
                                <el-button size="mini" :plain="true" type="danger" icon="delete" slot="reference"></el-button>
                            </el-popover>
                            <el-button size="mini" :plain="true" type="success" icon="caret-bottom"></el-button>
                            <el-button size="mini" :plain="true" type="success" icon="caret-top"></el-button>
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
            <el-dialog :close-on-click-modal="false" size="tiny" title="新建地区" v-model="dialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="地区代码" :label-width="formLabelWidth">
                        <el-input :disabled="true" v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地区名称" prop="required" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上级代码" :label-width="formLabelWidth">
                        <el-input :disabled="true" v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="上级名称" :label-width="formLabelWidth">
                        <el-input :disabled="true" v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button class="btn" type="primary" @click="dialogFormVisible = false">保存并新建</el-button>
                    <el-button class="btn" @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </aside>
    </section>
</template>
<script>
export default {
    data() {
        return {
            load:false,
            car:[],
            visible2: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            rules: {
                required: [{
                    required: true,
                    message: '请输入地区名称',
                    trigger: 'blur'
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
                name: '王小虎1',
                address: '上海市普陀区金沙江路 1518 弄',
                id: 1
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                id: 2
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                id: 3
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                id: 4
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                id: 5
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                id: 6
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                id: 7
            }]
        };
    },
    methods: {
        loading(){
            this.load=true;
            setTimeout(()=>{
                this.load=false;
            },2000)
        },
        updateVisible() {
            $('.el-popover').remove();
        },
        deleted(index) {
            this.tableData3.splice(index, 1)
            $('.el-popover').remove();
        },
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
            this.$refs[formName].resetFields();
        },
        can(tr) {

            // a.show=false
            // tr=a;
            // can[index]
            // console.log(this.car)
            // this.$set(tr, 'show', false)
            // console.log(this.car)
            // this.$set(te.row,'show',false)
            // console.log(te)
            // console.log(te)
        }
    }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/element.less";
.region {
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
            .el-button+.el-button {
                margin-left: 0;
            }
            height: 100%;
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
            width: 300px;
        }
        .btn{
            margin-left: 1em;
        }
    }
}
</style>
