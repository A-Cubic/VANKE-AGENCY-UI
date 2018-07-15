<template>
    <section class="app">
        <!--<Default :success="loginHidden"></Default>-->
        <header class="this_header">
            <img src="./assets/img/wankeLogo的副本.png" alt="logo">
            <!-- <h1>万科有家</h1> -->
            <nav class="this_nav">
                <el-menu
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
                <i class="el-icon-tickets "></i>
            </span>
            <span class="f22">
                <el-badge :value="12" class="item ">
                    <i class="el-icon-bell "></i>
                </el-badge>
             </span>
             <span class="f22">
                 <i class="el-icon-setting "></i>
             </span>
        </header>
        <section class="this_section">
            <!-- <nav class="this_nav">

            </nav> -->
            <router-view class="view router"></router-view>
        </section>
        <aside class="alert">
            <el-dialog
                  title="提示"
                  :visible.sync="addressBook.visible"
                  width="800px"
                  :before-close="handleCloseAddressBook">
                  <span>这是一段信息</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addressBook.visible = false">确 定</el-button>
                  </span>
                </el-dialog>
        </aside>
    </section>
    
</template>
<script>
    // import Default from './component/default'
    import Vue 				from 'vue'
    import VueWebsocket 	from 'vue-websocket';
    import { getToken }               from './util/global'
export default {
    name: 'app',
    // components:{Default},
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',

            addressBook:{
                visible: true,
                formLabelWidth: '120px',
            }
        };
    },
    created() {
        var ws = Vue.use(VueWebsocket, "ws://vanke.a-cubic.com", {
            path: "/vanke/user/ws",
            query: {
                token: getToken()
            },
            transports: ['websocket'],
            reconnection: false

        });
        console.log(ws)
    },
    methods: {

    	handleCloseAddressBook(done) {

    		this.addressBook.visible = false
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      },

        add() {
            this.$socket.emit("add", { a: 5, b: 3 });
        },

        get() {
            this.$socket.emit("get", { id: 12 }, (response) => {
                console.log(response)
            });
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
    },
    socket: {
        // Prefix for event names
        // prefix: "/counter/",

        // If you set `namespace`, it will create a new socket connection to the namespace instead of `/`
        // namespace: "/counter",

        events: {

            // Similar as this.$socket.on("changed", (msg) => { ... });
            // If you set `prefix` to `/counter/`, the event name will be `/counter/changed`
            //
            changed(msg) {
                console.log("Something changed: " + msg);
            },


            connect() {
                console.log("Websocket connected to " + this.$socket.nsp);
            },

            disconnect() {
                console.log("Websocket disconnected from " + this.$socket.nsp);
            },

            error(err) {
                console.error("Websocket error!", err);
            }


        }
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
            margin-right: 20px;
            font-size:22px;
            color:#fff;
            i{
                font-size:22px;
            }
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
            padding-left: 1.5em;
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
