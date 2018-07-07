<template>
    <div class="fastWrite">
        商机
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
    .fastWrite {
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
    }
</style>
