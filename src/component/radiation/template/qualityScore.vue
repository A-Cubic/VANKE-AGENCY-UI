<template>
    <div class="qualityScore">
        <div class="header">
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>放射设置</el-breadcrumb-item>
                <el-breadcrumb-item>模版设置</el-breadcrumb-item>
                <el-breadcrumb-item>质控评分模版</el-breadcrumb-item>
            </el-breadcrumb>
            <nav class="nav">
                <span>模版类型:</span>
                <el-cascader :options="options" filterable change-on-select></el-cascader>
                <span>检查类型:</span>
                <el-cascader :options="options" filterable change-on-select></el-cascader>
                <span>模版名称:</span>
                <el-cascader :options="options" filterable change-on-select></el-cascader>
                <el-button type="primary" class="btn">搜索</el-button>
                <el-button :plain="true" type="info" class="btn">重置</el-button>
            </nav>
        </div>
        <div class="total">
            <el-button type="primary" class="btn" @click="dialogFormVisible = true;isEdit = false">新增</el-button>
            <el-button class='refresh' type="primary" :loading="false">刷新</el-button>
            <span>质控评分模版共<em> 18 </em>条</span>
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
                <el-table-column prop="mblx" label="模版类型" align="center"></el-table-column>
                <el-table-column prop="jclx" label="检查类型" align="center"></el-table-column>
                <el-table-column prop="mbmc" label="模版名称" align="center"></el-table-column>
                <el-table-column prop="dfdj" label="得分等级" align="center"></el-table-column>
            </el-table>
        </div>
        <div class="dialog">
            <el-dialog size="tiny" :close-on-click-modal="false" :title="isEdit?'编辑质控评分模版':'新建质控评分模版'" v-model="dialogFormVisible">
                <el-form label-position="right" :model="form" ref="form" :rules="rules" label-width="85px">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="模版类型:" prop="mblx">
                                <el-select v-model="form.mblx">
                                    <el-option label="a" value="a"></el-option>
                                    <el-option label="b" value="b"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="模版名称:" prop="mbmc">
                                <el-input v-model="form.mbmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                            <el-form-item label="总评分:" prop="zpf">
                                <el-input v-model="form.zpf"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="权重:" prop="qz">
                                <el-input v-model="form.qz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="优秀:" prop="yx1">
                                <el-row>
                                    <el-col :span="9">
                                        <el-input v-model="form.yx1"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <span class="separator">-</span>
                                    </el-col>
                                    <el-col :span="9">
                                        <el-form-item prop="yx2">
                                            <el-input v-model="form.yx2"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="良好:" prop="lh1">
                                <el-row>
                                    <el-col :span="9">
                                        <el-input v-model="form.lh1"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <span class="separator">-</span>
                                    </el-col>
                                    <el-col :span="9">
                                        <el-form-item prop="lh2">
                                            <el-input v-model="form.lh2"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" offset="2">
                            <el-form-item label="合格:" prop="hg1">
                                <el-row>
                                    <el-col :span="9">
                                        <el-input v-model="form.hg1"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <span class="separator">-</span>
                                    </el-col>
                                    <el-col :span="9">
                                        <el-form-item prop="hg2">
                                            <el-input v-model="form.hg2"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="不合格:" prop="bhg1">
                                <el-row>
                                    <el-col :span="9">
                                        <el-input v-model="form.bhg1"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <span class="separator">-</span>
                                    </el-col>
                                    <el-col :span="9">
                                        <el-form-item prop="bhg2">
                                            <el-input v-model="form.bhg2"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="评价内容:">
                                <el-input type="textarea" v-model="form.pjnr" rows="7"></el-input>
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
                isEdit: false,
                dialogFormVisible: false,
                rules: {
                    mblx: [{
                        required: true,
                        message: '请选择模版类型',
                        trigger: 'change'
                    }],
                    mbmc: [{
                        required: true,
                        message: '请输入模版名称',
                        trigger: 'blur'
                    }],
                    jclx: [{
                        required: true,
                        message: '请选择检查类型',
                        trigger: 'change'
                    }],
                    zpf: [{
                        required: true,
                        message: '请输入总评分',
                        trigger: 'blur'
                    }],
                    qz: [{
                        required: true,
                        message: '请输权重',
                        trigger: 'blur'
                    }],
                    yx1: [{
                        required: true,
                        message: '最低分为空',
                        trigger: 'blur'
                    }],
                    yx2: [{
                        required: true,
                        message: '最高分为空',
                        trigger: 'blur'
                    }],
                    lh1: [{
                        required: true,
                        message: '最低分为空',
                        trigger: 'blur'
                    }],
                    lh2: [{
                        required: true,
                        message: '最高分为空',
                        trigger: 'blur'
                    }],
                    hg1: [{
                        required: true,
                        message: '最低分为空',
                        trigger: 'blur'
                    }],
                    hg2: [{
                        required: true,
                        message: '最高分为空',
                        trigger: 'blur'
                    }],
                    bhg1: [{
                        required: true,
                        message: '最低分为空',
                        trigger: 'blur'
                    }],
                    bhg2: [{
                        required: true,
                        message: '最高分为空',
                        trigger: 'blur'
                    }],
                },
                form: {
                    mblx: '',
                    mbmc: '',
                    jclx: '',
                    zpf: '',
                    qz: '',
                    yx1: '',
                    yx2: '',
                    lh1: '',
                    lh2: '',
                    hg1: '',
                    hg2: '',
                    bhg1: '',
                    bhg2: '',
                    pjnr: '',
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
                    }]
                }],
                tableData: [{
                    mblx: '',
                    jclx: '',
                    mbmc: '',
                    dfdj: ''
                }],
            };
        },
        methods: {
            cancel() {
                $('.el-popover').remove();
            },
            del(index) {
                this.tableData.splice(index, 1);
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
            }
        }
    };
</script>
<style lang="less">
    .qualityScore {
        .header {
            .crumbs {
                width: 96%;
                margin: 10px auto;
                flex-shrink: 0;
            }
            .nav {
                width: 96%;
                display: flex;
                align-items: center;
                flex-shrink: 0;
                margin: 0 auto;
                padding: 1em;
                background: #f2f2f2;
                > span {
                    margin-right: 1em;
                }
                .el-input {
                    // width: 190px;
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
            .separator {
                display: inline-block;
                width: 100%;
                text-align: center;
            }
        }
    }
</style>
