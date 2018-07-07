<template>
    <section class="diagnoseType">
        服务管理
    </section>
</template>
<script>
export default {
		data() {
				return {
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
<style lang="less">
@import "../../../assets/css/element.less";
	.el-color-picker{
		width: 100%;
		.el-color-picker__trigger{
			display: flex;
		    align-items: center;
		    width: 100%;
		    .el-color-picker__color{
			    	display: flex;
			    align-items: center;
			    justify-content: center;
			    width: 90%;
		    }
		}
	}
	/*.el-color-picker,.el-color-picker__trigger{
		width: 100% !important;
	}*/
	/*.el-color-picker__color{width: 90%;}*/
.diagnoseType {
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
