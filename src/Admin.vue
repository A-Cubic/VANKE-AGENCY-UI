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

                    <el-menu-item index="/admin/home">首页</el-menu-item>
                    <el-menu-item index="/admin/houseResource">房源</el-menu-item>
                    <el-menu-item index="/admin/passengerOrigin">客源</el-menu-item>
                    <el-menu-item index="/admin/clinchDeal">成交</el-menu-item>
                    <el-menu-item index="/admin/achievements">业绩</el-menu-item>
                    <el-menu-item index="/admin/personal">个人</el-menu-item>
                    <el-menu-item index="/admin/audit">审核</el-menu-item>
                    <el-menu-item index="/admin/register">注册</el-menu-item>
                   <!-- <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>
                        房源</template>
                            <el-submenu index="1-1">
                                <template slot="title">买卖</template>
                                <el-menu-item index="radiationPlugin">小区</el-menu-item>
                            </el-submenu>
                            <el-submenu index="1-2">
                                <template slot="title">租赁</template>
                                <el-menu-item index="fastWrite">商机</el-menu-item>
                            </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                        服务</template>
                        <el-menu-item index="diagnoseType">管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                        系统设置</template>
                        <el-menu-item index="log">日志管理</el-menu-item>
                    </el-submenu> -->
                </el-menu>
            </nav>
            <span class="f22">
                <i class="el-icon-tickets " @click="addressBook.visible = true"></i>
            </span>
            <span class="f22">
                <el-badge v-bind:value="Noticebadge" class="item ">
                    <i class="el-icon-bell " @click="inform.visible = true"></i>
                </el-badge>
             </span>
             <span class="logout">退出</span>
        </header>
        <section class="this_section">
            <!-- <nav class="this_nav">

            </nav> -->
            <router-view class="view router"></router-view>
        </section>
        <aside class="alert">
            <el-dialog
                title="通讯录"
                :visible.sync="addressBook.visible"
                width="800px"
                :before-close="handleCloseAddressBook">
                <el-table :data="addressBook.addressList" border size="mini" max-height="320" style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addressBook.visible = false">关 闭</el-button>
                </span>
            </el-dialog>
        </aside>
        <aside class="inform">
            <el-dialog
                title="通知"
                :visible.sync="inform.visible"
                width="800px">
                <el-table :data="inform.informList" 
                          size="mini"
                          :show-header="false"
                          max-height="320"
                          style="width: 100%">
                    <el-table-column prop="message" label="内容"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="inform.visible = false">关 闭</el-button>
                </span>
            </el-dialog>
        </aside>
    </section>
    
</template>
<script>
    // import Default from './component/default'
    import { getToken, WsCall, addWsCall, clearWsCall }               from './util/global'
export default {
    name: 'app',
    ws: null,
    // components:{Default},
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',

            addressBook:{
                visible: false,
                formLabelWidth: '120px',
                addressList: [
                    {
                        name: '王小虎',
                        phone: '1234567'
                    },
                    {
                        name: '王小虎',
                        phone: '1234567'
                    },
                    {
                        name: '王小虎',
                        phone: '1234567'
                    },
                    {
                        name: '王小虎',
                        phone: '1234567'
                    },
                    {
                        name: '王小虎',
                        phone: '1234567'
                    },
                    {
                        name: '王小虎',
                        phone: '1234567'
                    },
                    {
                        name: '王小虎',
                        phone: '1234567'
                    }
                ]
            },

            inform: {
                visible: false,
                informList: [
                    {
                        message: '今天下午两点半，有客户要去看房，请注意。'
                    },
                ]
            },

            Noticebadge: undefined,
            vankeWebsocket: null,
        };
    },
    created() {
        this.initWebsocket()
        addWsCall('Notice', this.wsNotice)
    },
    destroyed() {
        this.vankeWebsocket.close()
        clearWsCall()
    },
    methods: {
        initWebsocket() {
            this.vankeWebsocket = new WebSocket('ws://vanke.a-cubic/vanke/com/ws/?token=' + getToken());
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
            console.log('Notice', data)
            if(data === 0){
                data = undefined
            }
            this.Noticebadge = data
        },
    	handleCloseAddressBook(done) {
    		this.addressBook.visible = false
            // this.$confirm('确认关闭？')
            //   .then(_ => {
            //     done();
            //   })
            //   .catch(_ => {});
        },
        loginHidden(){
            this.header = true;
            this.$router.push({path: '/log'});
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
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
            margin-right: 20px;
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
            min-width:1000px;
            height: 70px;
            display:flex;
            align-items:center;
            border-bottom:3px solid rgb(238, 246, 243);
            background:#c51010;
            padding-left: 3.5em;
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
