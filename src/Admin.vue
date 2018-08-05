<template>
    <section class="app">
        <!--<Default :success="loginHidden"></Default>-->
        <header class="this_header">
            <img src="https://cubic-vanke.oss-cn-qingdao.aliyuncs.com/home/wankeLogo_white.png" alt="logo">
            <!-- <h1>万科有家</h1> -->
            <nav class="this_nav">
                <el-menu
                font-size="30px"
                background-color="#c51010"
                text-color="#fff"
                active-text-color="#fff"
                    :router="true"
                    default-active="2"
                    mode="horizontal"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">

                    <template  v-for="(item) in $router.options.routes[0].children"
                               v-if="item.meta.defaultShow && (item.meta.roles.indexOf(getRole())>=0)">
                        <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
                    </template>

                    <!--<el-menu-item index="/admin/home">首页</el-menu-item>-->
                    <!--<el-menu-item index="/admin/houseResource">房源</el-menu-item>-->
                    <!--<el-menu-item index="/admin/passengerOrigin">客源</el-menu-item>-->
                    <!--<el-menu-item index="/admin/clinchDeal">成交</el-menu-item>-->
                    <!--<el-menu-item index="/admin/achievements">业绩</el-menu-item>-->
                    <!--<el-menu-item index="/admin/personal">个人</el-menu-item>-->
                    <!--<el-menu-item index="/admin/audit">审核</el-menu-item>-->
                    <!--<el-menu-item index="/admin/register">账号注册</el-menu-item>-->
                    <!--<el-menu-item index="/admin/achievementsT">业绩统计</el-menu-item>-->
                    <!--<el-menu-item index="/admin/registerShop">门店注册</el-menu-item>-->
                   
                </el-menu>

            </nav>
            <span class="identity">{{basic.relname+' · '+basic.desc}}</span>
            <span class="f22">
                <el-popover
                        placement="bottom-start"
                        width="300"
                        transition="el-zoom-in-center"
                        title="通讯录"
                        trigger="click">
                     <el-tree
                             :data="addressBook.bookTree"
                             :props="addressBook.defaultProps"
                             accordion >
                      </el-tree>
                    <i class="el-icon-tickets " slot="reference" @click="getBookTree"></i>
                </el-popover>
            </span>
            <span class="f22">
                <el-popover
                        placement="bottom-start"
                        width="400"
                        transition="el-zoom-in-center"
                        trigger="click">
                    <div class="table-template">
                        <el-table :data="message.list">
                            <el-table-column prop="create_time" label="消息时间"></el-table-column>
                            <el-table-column prop="content" label="消息内容" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                    <div class="table-pagination">
                    <el-pagination
                            layout="prev, pager, next, jumper, total"
                            :page-size="message.pageSize"
                            :current-page.sync="message.pageNum"
                            :total ="message.total"
                            @current-change="handleCurrentChangeSearch">
                    </el-pagination>
                </div>
                    <el-badge v-bind:value="Noticebadge" class="item " slot="reference">
                        <i class="el-icon-bell " @click="getNotice"></i>
                    </el-badge>
            </el-popover>

             </span>
             <span class="logout" @click="userLogout">退出</span>
        </header>
        <section class="this_section">
            <!-- <nav class="this_nav">

            </nav> -->
            <router-view class="view router"></router-view>
        </section>
        <!--<aside class="inform">-->
            <!--<el-popover-->
                    <!--placement="bottom-start"-->
                    <!--width="300"-->
                    <!--transition="el-zoom-in-center"-->
                    <!--title="通知"-->
                    <!--trigger="click">-->

                <!--<i class="el-icon-tickets " slot="reference" @click="getNotice"></i>-->
            <!--</el-popover>-->
        <!--</aside>-->
    </section>
    
</template>
<script>
import HomeApi from './api/api_home.js';
import LoginApi from './api/api_user';
import { setRole, setToken } from './util/global';
    // import Default from './component/default'
    import { getToken, getRole, WsCall, addWsCall, clearWsCall }               from './util/global';
    import router from './router/router';
import Vue from 'vue';
export default {
    name: 'app',
    ws: null,
    // components:{Default},
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            // 获取用户信息名称 角色
            userIdentity:{
                userName:'',
                identity:'',
            },
            basic:{
                avatar:'',
                relname:'',
                user_no:'',
                store_name:'',
                desc:'',
                current_score:'',
                latent_score:''
            },
            addressBook:{
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                bookTree:[

                ],
            },

            message: {
                pageSize: 5,
                pageNum: 1,
                total: 0,
                list: [

                ]
            },

            Noticebadge: undefined,
            vankeWebsocket: null,
        };
    },
    created() {
        this.initWebsocket();
        this.getUserIdentity();
        addWsCall('Notice', this.wsNotice);
    },
    destroyed() {
        this.vankeWebsocket.close();
        clearWsCall();
    },
    methods: {
        getRole(){
          return getRole();
        },
        handleCurrentChangeSearch(val){
            this.message.pageNum = val;
            this.doSearchNotice();
        },
        doSearchNotice(){
            var that = this;
            var postData = {
                page: that.message.pageNum,
                size: 5
            };
            HomeApi.messageList(postData).then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.message=result.data;
            }).catch(error => {
                console.log('messageList_error');
            });
        },
        getNotice(){
            this.message.pageNum = 1;
            this.doSearchNotice();
        },
        getBookTree(){
            var that = this;
            HomeApi.bookTreeList().then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.addressBook.bookTree=result.data;
            }).catch(error => {
                console.log('bookTreeList_error');
            });
        },
        userLogout(){
            setRole('');
            setToken('');
            this.$router.push({path: '/admin/default.vue'});
//            const that = this;
//            let postData={};
//            LoginApi.logout(postData).then(function (result) {
//                            console.log(result)
//                            if(typeof(result) != "object"){result = JSON.parse(result)}
//                                that.$message.success({showClose: true, message:'退出成功！', duration: 2000});
//                            //  登出成功 后 清空角色和token 跳转
//                                setRole('');
//                                setToken('');
//                                that.$router.push({path: '/admin/default.vue'});
//                        }).catch(error => {
//                            console.log('login_error');
//                        })
        },
        getUserIdentity(){
            // console.log(this.$router.options.routes[0].children)
            var that = this;
            HomeApi.userinfo().then(function (result) {
                if(typeof(result) != "object"){result = JSON.parse(result)}
                that.basic=result.data;
            }).catch(error => {
                console.log('userinfo_error');
            });
        },
        initWebsocket() {
            // this.vankeWebsocket = new WebSocket('ws://vanke.a-cubic.com/vanke/com/ws/?token=' + getToken());
            this.vankeWebsocket = new WebSocket('ws://172.16.10.103:9999/vanke/com/ws/?token=' + getToken());
            this.vankeWebsocket.onopen = this.wsOnOpen;
            this.vankeWebsocket.onmessage = this.wsOnMessage;
            this.vankeWebsocket.onclose = this.wsOnClose;
        },
        wsOnOpen() {
            this.vankeWebsocket.send('vanke')
        },
        wsOnMessage(e) {
            Object.keys(WsCall).forEach((value) => {
                if(WsCall[value] !== undefined){
                    WsCall[value](e.data)
                }
            })
        },
        wsOnClose() {

        },
        wsNotice(data) {
            if(data === 0){
                data = undefined
            }
            this.Noticebadge = data
        },

        loginHidden(){
            this.header = true;
            this.$router.push({path: '/log'});
        },
        handleOpen(key, keyPath) {
//            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
//            console.log(key, keyPath);
        },
        // view_application(item){
        //     this.$refs.viewRequisition.$emit('start', this.copy(item));
        // },
    }

}
</script>
<style lang="less" scoped>
    .app{
        .el-menu--horizontal{
            border:none;
        }
        .el-badge__content{
                background:'#409eff';
            }
        .f22{
            cursor: pointer;
            margin-right: 1em;
            font-size:22px;
            color:#fff;
            i{
                font-size:22px;
            }

        }
        .logout{
            margin-right: 20px;
            font-size:16px;
            color:#fff;
            cursor: pointer;
        }
        display:flex;
        flex-direction:column;
        height: 100%;

        .this_header{
            position:fixed;
            top: 0;
            z-index: 999;
            width:100%;
            min-width:1180px;
            height: 70px;
            display:flex;
            align-items:center;
            border-bottom:3px solid rgb(238, 246, 243);
            background:#c51010;
            padding-left: 3em;
            img{
                width:100px;
                // height: 30%;
            }
            h1{
                margin-left: .5em;
                font-size: 22px;
                font-weight: 400;
                color: #fff;
            }
            .this_nav{
                margin: auto;
            }
            .bell{
                font-size:22px;
                margin-right: 10px;
            }
            .person{
                font-size:22px;
                margin-right: 1.5em;
            }
        }
        .none{display:none}
        .this_section{
            .identity{
                color:#C0C4CC;
                font-size:15px;
                margin-right:1.5em;
            }
            margin-top:70px;
            height: 100%;
            width:100%;
            display:flex;
            // border:1px solid red;
            .this_nav{
                // min-width: 200px;
                // background: rgb(238, 246, 243);
                // height: 100%;
                // max-height: 100%;
                // overflow: auto;
            }
            .view{
                display:flex;
                // flex-direction:column;
                width:100%;
                // height: 100%;
                flex-grow:2;


                // overflow:scroll;
            }
        }
    }
</style>
