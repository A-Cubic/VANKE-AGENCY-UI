<template>
    <section class="examineProject">
        <header class="this_header">
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>放射设置</el-breadcrumb-item>
                <el-breadcrumb-item>其他设置</el-breadcrumb-item>
                <el-breadcrumb-item>检查项目</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <h2 class="total">
		<el-button type="primary" @click="dialogFormVisible = true" class="btn tbtn">新建</el-button>
        <el-button class='refresh tbtn' type="primary" :loading="false">刷新</el-button>
        	</el-button>共 <em class="em">1000</em> 条记录
        </h2>
        <section class="this_section">
            <template>
                <el-table border stripe class="this_table" :data="tableData3" border height="100%" style="width: 100%;" >
                    <el-table-column label="操作" width="150">
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
                            <el-button size="mini" :plain="true" type="success" icon="caret-bottom"></el-button>
                            <el-button size="mini" :plain="true" type="success" icon="caret-top"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="类型代码" >
                    </el-table-column>
                    <el-table-column prop="name" label="检查类型" >
                    </el-table-column>
                    <el-table-column prop="address" label="项目代码" >
                    </el-table-column>
                    <el-table-column prop="address" label="检查项目" >
                    </el-table-column>
                </el-table>
            </template>
        </section>
        <aside class="alert">
            <div class="anew">
	            	<el-dialog size="tiny" title="新建检查项目" v-model="dialogFormVisible" :close-on-click-modal="false">
	                <el-form :model="form" :rules="rules" ref="form" class="alert-minwidth" label-width="100px">
							<el-col :span="24">
								<el-form-item label="检查类型" prop="hasimage" :label-width="formLabelWidth" auto-complete="off">
									<el-select v-model="form.image" :span="24">
										<el-option label="有" value="1"></el-option>
										<el-option label="无" value="0"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="项目代码" prop="code" :label-width="formLabelWidth">
									<el-input v-model="form.code" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="检查项目" prop="examine" :label-width="formLabelWidth">
									<el-input v-model="form.examine" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
					</el-form>
	                <div slot="footer" class="dialog-footer">
	                    <el-button type="primary" @click="submitForm('form')" class="tbtn">保 存</el-button>
						<el-button type="primary" @click=";submitForm('form')" class="tbtn">保存并新建</el-button>
						<el-button @click="dialogFormVisible = false" class="tbtn">取 消</el-button>
	                </div>
	            </el-dialog>
            </div>

        </aside>
    </section>
</template>
<script>
export default {
		data() {
				return {
					count: 1,
					dialogFormVisible: false,
					formLabelWidth: '120px',
					rules: {
						code: [{
							required: true,
							message: '请输入项目代码',
							trigger: 'blur'
						}],
						examine: [{
							required: true,
							message: '请输入检查项目',
							trigger: 'blur'
						}],
						hasimage: [{
							required: true,
							message: '请选择检查类型',
							trigger: 'blur'
						}]
					},
					form: {
						code: '',
						examine: '',
						hasimage: [{
							value: '1',
							label: '有'
						},{
							value: '0',
							label: '无'
						}],
						 value: '1'
						//						name: '',
						//						region: '',
						//						date1: '',
						//						date2: '',
						//						delivery: false,
						//						type: [],
						//						resource: '',
						//						desc: ''
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
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						date: '2016-05-06',
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
				updateVisible() {
					$('.el-popover').remove();
				},
				deleted(index) {
					this.tableData3.splice(index, 1)
					$('.el-popover').remove();
				},
				submitForm(formName) {
					this.$refs[formName].validate((valid) => {
						if(valid) {
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
			}
	};
</script>
<style lang="less" scoped>
@import "../../../assets/css/element.less";
.examineProject {
	.tbtn{
		margin-left: 1em;	
	}
    .this_header {
        height: 30px;
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
            }
            .btn {
                margin-left: 6rem;
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
    	.el-select{
    		width: 100%;
    	}
    		/*.alert-minwidth{min-width: 400px;}*/
    }
}
</style>
