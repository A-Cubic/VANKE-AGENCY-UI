<template>
    <div class="shortcutCode">
        <div class="header">
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>放射设置</el-breadcrumb-item>
                <el-breadcrumb-item>其他设置</el-breadcrumb-item>
                <el-breadcrumb-item>快捷代码</el-breadcrumb-item>
            </el-breadcrumb>
            <nav class="nav">
                <span>检查类型:</span>
                <el-cascader :options="options" filterable change-on-select></el-cascader>
            </nav>
        </div>
        <div class="total">
            <el-button type="primary" class="btn">导出</el-button>
            <el-button type="primary" class="btn">打印</el-button>
            <el-button type="primary" class="btn" @click="dialogFormVisible = true;isEdit = false">新建</el-button>
            <el-button class='refresh' type="primary" :loading="false">刷新</el-button>
            <span>快捷代码共<em> 18 </em>条</span>
        </div>
        <div class="content">
            <el-table class="table" height=" " :data="tableData" border stripe>
                <el-table-column label="操作" align="center" width="150">
                    <template scope="scope">
                        <el-button size="mini" :plain="true" type="success" icon="edit"
                                   @click="dialogFormVisible = true;isEdit = true"></el-button>
                        <el-popover placement="top" width="160">
                            <p>确定删除吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="cancel">取消</el-button>
                                <el-button type="primary" size="mini" @click="del(scope.row.index)">确定</el-button>
                            </div>
                            <el-button size="mini" :plain="true" type="danger" icon="delete"
                                       slot="reference"></el-button>
                        </el-popover>
                        <el-button size="mini" :plain="true" type="success" icon="caret-bottom"></el-button>
                        <el-button size="mini" :plain="true" type="success" icon="caret-top"></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="快捷代码" align="center"></el-table-column>
                <el-table-column prop="type" label="检查类型" align="center"></el-table-column>
                <el-table-column prop="item" label="检查项目" align="center"></el-table-column>
                <el-table-column prop="position" label="检查部位" align="center"></el-table-column>
                <el-table-column prop="room" label="检查机房" align="center"></el-table-column>
                <el-table-column prop="category" label="就诊类别" align="center"></el-table-column>
            </el-table>
        </div>
        <div class="dialog">
            <el-dialog size="tiny" :close-on-click-modal="false" :title="isEdit?'编辑快捷代码':'新建快捷代码'" v-model="dialogFormVisible">
                <el-form label-position="right" :model="form" ref="form" :rules="rules" label-width="85px">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="快捷代码:" prop="kjdm">
                                <el-input v-model="form.kjdm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="检查类型:" prop="jclx">
                                <el-select v-model="form.jclx">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
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
                            <el-form-item label="检查类别:" prop="jclb">
                                <el-select v-model="form.jclb">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="检查部位:">
                                <div class="tree">
                                    <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button v-if="!isEdit" type="primary" @click="dialogFormVisible = false">保存并新建</el-button>
                    <el-button @click="dialogFormVisible = false;resetForm('form')">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogFormVisible: false,
                // 是否编辑模式
                isEdit: false,
                rules: {
                    kjdm: [{
                        required: true,
                        message: '请输入快捷代码',
                        trigger: 'blur'
                    }],
                    jclx: [{
                        required: true,
                        message: '请选择检查类型',
                        trigger: 'change'
                    }],
                    jcxm: [{
                        required: true,
                        message: '请选择检查项目',
                        trigger: 'change'
                    }]
                }
                ,
                form: {
                    kjdm: '',
                    jclx: '',
                    jcxm: '',
                    jclb: '',
                }
                ,
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
                    }]
                }],
                tableData: [{
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }, {
                    code: '1000',
                    type: 'CR',
                    item: '肺部常规',
                    position: '胸正位',
                    room: '胸正位',
                    category: '普通'
                }],
                treeData: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
            }
                ;
        },
        methods: {
            // 删除条目取消
            cancel() {
                $('.el-popover').remove();
            },
            // 删除条目确定
            del(index) {
                this.tableData.splice(index, 1);
                $('.el-popover').remove();
            },
            handleNodeClick(data) {
                console.log(data);
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
            // 表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>
<style lang="less">
    .shortcutCode {
        .header {
            .crumbs {
                width: 96%;
                margin: 10px auto;
                flex-shrink: 0;
            }
            .nav {
                width: 96%;
                margin: 0 auto;
                padding: 1em;
                background: #f2f2f2;
                > span {
                    margin-right: 1em;
                }
                .el-input {
                    width: 190px;
                }
            }
        }
        .total {
            width: 96%;
            text-align: right;
            margin: 10px auto 10px;
            em {
                color: #4bc889;
            }
            .refresh {
                margin-right: 1em;
            }
        }
        .content {
            width: 96%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            padding-bottom: 20px;
            .table {
                height: 0;
                flex-grow: 1;
                .el-button + .el-button {
                    margin-left: 0;
                }
            }
        }
        .dialog {
            .tree {
                width: 100%;
                height: 200px;
                overflow: auto;
                border: 1px solid rgb(191, 217, 202);
                .el-tree {
                    border: none;
                }
            }
        }
    }
</style>
