<template>
    <section class="app">
        <!--<Default :success="loginHidden"></Default>-->
        <header :class="header?'this_header':'this_header none'">
            <img src="./assets/img/wankeLogo.png" alt="logo">
            <!-- <h1>万科有家</h1> -->
            <nav class="this_nav">
                <el-menu
                background-color="#fff"
                text-color="#ff0909"
                active-text-color="#e60213"
                    :router="true"
                    default-active="2"
                    mode="horizontal"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                   <el-submenu index="1">
                        <template slot="title">
                            <!-- <i class="el-icon-message"></i> -->
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
                            <!-- <i class="el-icon-setting"></i> -->
                        服务</template>
                        <el-menu-item index="diagnoseType">管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <!-- <i class="el-icon-setting"></i> -->
                        系统设置</template>
                        <el-menu-item index="log">日志管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </nav>
             <i class="el-icon-bell bell"></i>
             <i class="el-icon-setting person"></i>
        </header>
        <section class="this_section">
            <!-- <nav class="this_nav">

            </nav> -->
            <router-view class="view router"></router-view>
        </section>
    </section>
</template>
<script>
    // import Default from './component/default'
export default {
    name: 'app',
    // components:{Default},
    data() {
        return {
            header: true,
            activeIndex: '1',
            activeIndex2: '1',
        };
    },
    methods: {
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
        .f22{
            font-size:22px;
        }
        display:flex;
        flex-direction:column;
        height: 100%;

        .this_header{
            height: 70px;
            display:flex;
            align-items:center;
            border-bottom:3px solid rgb(238, 246, 243);
            background:#fff;
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
            height: 100%;
            width:100%;
            display:flex;
            // border:1px solid red;
            .this_nav{
                min-width: 200px;
                background: rgb(238, 246, 243);
                height: 100%;
                max-height: 100%;
                overflow: auto;
            }
            .view{
                display:flex;
                // flex-direction:column;
                width:100%;
                // height: 100%;
                flex-grow:2;


                overflow:scroll;
            }
        }
    }
</style>
