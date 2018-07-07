<template>
    <section class="radiationPlugin">
        <div class="aaa">aaa</div>
    </section>
</template>
<script>
export default {
    data() {
            return {
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
                // this.$refs[formName].resetFields();
            }
        }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/element.less";
.radiationPlugin {
    .aaa{
        border:1px solid red;
        height: 2000px;
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
