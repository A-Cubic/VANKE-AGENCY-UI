<template>
	<div class="login_wrap">
		<el-row type="flex" justify="center"  class="container">
			<el-col :span="24" class="main">
				<div class="login-container">
					<div class="title">
						<i class="el-icon-share"></i>
						账号密码登录
					</div>
					<div class="demo-ruleForm">
						<el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon label-position="left" label-width="0px">
							<!--账号-->
							<el-form-item prop="code"  class="login-form-item">
								<el-input type="text" v-model="loginForm.code" placeholder="系统账号" auto-complete="off"  prefix-icon="icon-user1 iconfont">
								</el-input>
							</el-form-item>
							<!--密码-->
							<el-form-item prop="pass" class="login-form-item">
								<el-input type="password" v-model="loginForm.checkPass" placeholder="登录密码" auto-complete="off" prefix-icon="icon-mima iconfont"
										  @keyup.enter.native="handleLoginReal">
								</el-input>
							</el-form-item>
							<el-form-item class="login-form-item">
								<el-button type="primary" class="common" @click.native.prevent="handleLoginReal" :loading="logining">登 录</el-button>
							</el-form-item>
							<el-form-item class="login-form-item">
								<span>
									没有CEO 只有邻居
								</span>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>

</template>
<script>
    import LoginApi from '../api/api_user';
    import { setRole, setToken } from '../util/global'
	export default {
		data() {
			return {
				msg:'11122',
                logining: false,
                loginForm: {
                    code: '',
                    checkPass: ''
                },
                rules: {
                    code: [
                        { required: true, message: '请输入系统账号', trigger: 'blur' },
                    ],
                    checkPass: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' },
                    ]
                },
                checked: true
			}
		},
        created (){
            // var str =  localStorage.getItem('now_user');
            // if (str) {
            //     var login_local = JSON.parse(localStorage.getItem('now_user'));
            //     this.loginForm = login_local;
            // }
        },
        filters: {},
        watch: {},
        computed: {},
        methods: {
            // handleLogin(){
            //     console.log()
            //     let that = this;
            //     this.$refs.loginForm.validate((valid) => {
            //         console.log(valid)
            //         if (valid) {
            //             this.logining = true;
            //             var postData = {"user_code": that.loginForm.code, "user_pass": that.loginForm.checkPass};
            //             LoginApi.login(postData).then(function (result) {
            //                 if(typeof(result) != "object"){result = JSON.parse(result)}
            //                 that.logining = false;
            //                 if(result.code == 701){
            //                     that.$message.error({showClose: true, message: result.msg || '查无此用户, 请检查是否输入错误', duration: 2000});
            //                 }else if(result.code == 0&&result.data){
            //                     localStorage.setItem('now_user', JSON.stringify(that.loginForm));
            //
            //
            //                     setRole('user')
				// 				setToken('abcd1234')
            //
            //
            //
            //                     console.log(result.data)
            //                     that.$message.success({showClose: true, message: result.msg || '登陆成功', duration: 2000});
            //                     console.log(result)
            //                     if(result.data.account_type == 1){
            //                         that.$router.push({path: '/admin/home'});
            //                         // this.$emit('success')
            //                     }
            //                 }else {
            //                     that.$message.error({showClose: true, message: result.msg || '登录失败', duration: 2000});
            //                 }
            //             }).catch(error => {
            //                 //超时之后在这里捕抓错误信息.
            //                 if (error.response) {
            //                     console.log('error.response');
            //                     console.log(error.response);
            //                     that.$message.error({showClose: true, message: result.msg || '登录失败', duration: 2000});
            //                 } else if (error.request) {
            //                     console.log('error.request');
            //                     if(error.request.readyState == 4 && error.request.status == 0){
            //                         //我在这里重新请求
            //                         console.log("重新请求")
            //                     }
            //                 } else {
            //                     console.log('Error', error.message);
            //                     that.$message.error({showClose: true, message: result.msg || '登录失败', duration: 2000});
            //                 }
            //                 console.log(error.config);
            //             })
            //         }
            //     });
            // },
            handleLoginReal(){
                let that = this;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        var postData = {"username": that.loginForm.code, "password": that.loginForm.checkPass};
                        LoginApi.login(postData).then(function (result) {
                            if(typeof(result) != "object"){result = JSON.parse(result)}
                            that.logining = false;
                            if(result.code == 701){
                                that.$message.error({showClose: true, message: result.msg || '查无此用户, 请检查是否输入错误', duration: 2000});
                            }else if(result.code == 200&&result.data){
                                setRole(result.data.authorities);
                                setToken(result.data.token);
                                that.$router.push({path: '/admin/home'});
                            }else {
                                that.$message.error({showClose: true, message: result.msg || '登录失败', duration: 2000});
                            }
                        }).catch(error => {
                            console.log('login_error');
                            // if (error.response) {
                            //     that.$message.error({showClose: true, message: result.msg || '登录失败', duration: 2000});
                            // } else if (error.request) {
                            //     if(error.request.readyState == 4 && error.request.status == 0){
                            //     }
                            // } else {
                            //     that.$message.error({showClose: true, message: result.msg || '登录失败', duration: 2000});
                            // }
                        })
                    }
                });
            },
            enterToLogin(ev){
                ev.keyCode === 13 && this.handleLogin()
            }

        }
	}
</script>
<style lang="less" scoped>
	.login_wrap{
	/* 全局容器*/
		.container {
			position: fixed;
			top: 0px;
			bottom: 0px;
			width: 100%;
			height:100%;
			background: url("https://cubic-vanke.oss-cn-qingdao.aliyuncs.com/home/bgpic.jpg") no-repeat  center center;
			background-size: 100% 100%;
			.main {
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				position: absolute;
				top: 0;
				bottom: 0;
				overflow: hidden;
				.login-container{
					width: 360px;
					height: 340px;
					box-shadow: 0 0 5px #cac6c6;
					border-radius: 4px;
					position: absolute;
					top: 180px;
					right: 470px;
					background-color: #ffffff;
					.title{
						width: 100%;
						/*height: 60px;*/
						/*line-height: 60px;*/
						padding: 20px;
						font-weight: 600;
						font-size: 16px;
						border-bottom: 1px solid #D7D7D7;
						i{
							font-size: 20px;
						}
					}
					.demo-ruleForm {
						width: 250px;
						margin: auto;
						padding-top: 20px;
						.login-form-item {
							margin-top: 10px;
							text-align: center;
						}
						.login-form-item .common{
							width: 250px;
							/*margin-top: 20px;*/
							background-color: #ec0c0c;
							border-color: #ec0c0c;
						}
						.login-form-item span{
							color: #999999;
						}
					}
				}
			}
		}
	}

</style>
