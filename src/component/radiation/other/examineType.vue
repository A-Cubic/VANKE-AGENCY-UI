<template>
	<section class="examineType">
		<header class="this_header">
			<el-breadcrumb separator="/" class="crumbs">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>放射设置</el-breadcrumb-item>
				<el-breadcrumb-item>其他设置</el-breadcrumb-item>
				<el-breadcrumb-item>检查类型</el-breadcrumb-item>
			</el-breadcrumb>
		</header>
		<h2 class="total">
	<el-button type="primary" @click="show_alert(null)" class="btn tbtn">新建</el-button>
	<el-button @click="loading" class='refresh tbtn' type="primary" :plain="true" :loading="load">刷新</el-button>
	 </el-button>共 <em class="em">1000</em> 条记录
	</h2>
		<section class="this_section">
			<template>
				<el-table border stripe class="this_table" :data="tableData" border height="100%" style="width: 100%;">
					<el-table-column label="操作" width="150">
						<template scope="scope">
							<el-button size="mini" :plain="true" type="success" icon="edit" @click="show_alert(scope.row)"></el-button>
							<el-button size="mini" :plain="true" type="danger" icon="delete" @click="deleted(scope.$index)"></el-button>
							<el-button size="mini" :plain="true" type="success" icon="caret-bottom"></el-button>
							<el-button size="mini" :plain="true" type="success" icon="caret-top"></el-button>
						</template>
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" prop="date" label="类型代码">
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" prop="name" label="检查类型">
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" prop="address" label="有无数字影像">
					</el-table-column>
				</el-table>
			</template>
		</section>
		<aside class="alert">
				<el-dialog size="tiny" :close-on-click-modal="false"  :title="is_new?'新建地区':'编辑地区'" v-model="alert" >
					<el-form :model="form" :rules="rules" ref="formref" class="alert-minwidth">
						<el-col :span="24">
							<el-form-item label="类型代码" prop="typecode" :label-width="formLabelWidth">
								<el-input v-model="form.typecode" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="检查类型" prop="examinetype" :label-width="formLabelWidth">
								<el-input v-model="form.examinetype" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="数字影像" prop="numimage" :label-width="formLabelWidth" auto-complete="off">
								<el-select v-model="form.numimage" :span="24">
									<el-option label="有" value="1"></el-option>
									<el-option label="无" value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="submitForm('formref','dosome','alert')" class="tbtn">保 存</el-button>
						<el-button v-show="is_new" type="primary" @click=";submitForm('formref','dosome')" class="tbtn">保存并新建</el-button>
						<el-button @click="resetForm('formref','alert')" class="tbtn">取 消</el-button>
					</div>
				</el-dialog>
		</aside>
	</section>
</template>
<script>
export default {
	data() {
			return {
				//刷新加载
				load: false,
				//弹框信息
                		alert: false,
                		is_new: false,
				// dialogFormVisible: false,
				formLabelWidth: '120px',
				rules: {
					typecode: [{
						required: true,
						message: '请输入类型代码',
						trigger: 'blur'
					}],
					examinetype: [{
						required: true,
						message: '请输入检查类型',
						trigger: 'blur'
					}],
					numimage: [{
						required: true,
						message: '请选择数字影像',
						trigger: 'blur'
					}]
				},
				form: {
					typecode: '',
					examinetype: '',
					numimage: '1',
				},
				tableData: [{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'

				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}]
			};
		},
		methods: {
			//刷新
			loading() {
				this.load = true;
				setTimeout(() => {
					this.load = false;
				}, 2000)
			},
			
			//删除弹窗提示
			deleted(index) {
				this.$confirm('是否确认删除该条信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.tableData.splice(index, 1)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//请求后台数据操作
			dosome(formName){
				// if (formName) {

				//这里写ajax请求
				// this.$http.post(location.auth_roles_users,{
				//     page:page,
				//     per_page:20,
				//     role_id:id
				// }).then(data=>{
				//     data=data.body;
				//     this.user=data.data||[];
				// }, data=>{
				//     console.log('错误')
				// })
				// alert('发送后台请求');
				console.log(this.form);
			},
			//提交表单
			submitForm(formName,fun,can) {
				//表单名称 formName
				//回调函数 fun
				//是否隐藏 can
				this.$refs[formName].validate((valid) => {
					if(valid) {
					//提交成功
						if(can){
							//有参数就隐藏弹窗,
							//短路逻辑
							fun&&this[fun]();
							this.resetForm(formName,can);
						} else {
							//无参数弹窗不消失
							fun&&this[fun]();//后面是否加上formName
							this.resetForm(formName);
						}
					} else {
					//提交失败
						console.log('error submit!!');
						return false;
					}
				});
			},
			//重置表单
			resetForm(formName,hide) {
				if(hide){
					this[hide]=false;
					this.$refs[formName].resetFields();
				} else {
					setTimeout(() => {
						this.$refs[formName].resetFields();
					},350)
				}
			},
			//新建 编辑弹窗
			 show_alert(tr) {
			 	console.log(this.form);
	                 this.alert = true;
	                if (tr) {
	                    this.is_new = false;
	                    setTimeout(() => {
	                        this.form.typecode = tr.date;
	                        this.form.examinetype = tr.name;
	                    }, 0)
	                } else {
	                    this.is_new = true;
	                }
	            },
		}
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/element.less";
.examineType {
	.tbtn {
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
		.el-select {
			width: 100%;
		}
	}
}
</style>
