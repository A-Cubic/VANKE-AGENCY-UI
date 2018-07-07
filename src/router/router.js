import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const Admin = resolve => {
    require.ensure(['../Admin.vue'], () => {
        resolve(require('../Admin.vue'))
    })
}

//默认页面
const Default = resolve => {
    require.ensure(['../component/default.vue'], () => {
        resolve(require('../component/default.vue'))
    })
}

const Test = resolve => {
    // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
    // （代码分块）
    require.ensure(['../component/custom/Test.vue'], () => {
        resolve(require('../component/custom/Test.vue'))
    })
}

//系统设置=>日志管理
const Log = resolve => {
    require.ensure(['../component/system/log.vue'], () => {
        resolve(require('../component/system/log.vue'))
    })
}
//放射设置=>其他设置=>就诊类别
	const DiagnoseType = resolve => {
	    require.ensure(['../component/radiation/other/diagnoseType.vue'], () => {
	        resolve(require('../component/radiation/other/diagnoseType.vue'))
	    })
	}

//放射设置=>系统设置=>放射插件
const RadiationPlugin = resolve => {
    require.ensure(['../component/radiation/system/radiationPlugin.vue'], () => {
        resolve(require('../component/radiation/system/radiationPlugin.vue'))
    })
}
//放射设置=>模板设置=>快速书写模板
const FastWrite = resolve => {
        require.ensure(['../component/radiation/template/fastWrite.vue'], () => {
            resolve(require('../component/radiation/template/fastWrite.vue'))
        })
    }

const routes= [

    {   path: '/Admin',
        component: Admin,
        children:[
            {	path: 'fastWrite',				component: FastWrite, 			name: '快速书写模板'},
            {	path: 'log',					component: Log, 				name: '日志管理'},
            {	path: 'radiationPlugin',		component: RadiationPlugin, 	name: '放射插件'},
            {	path: 'diagnoseType',			component: DiagnoseType, 		name: '就诊类别'},
            {	path: 'Test',					component: Test, 				name: '公用模块'},
        ] },
   
    {	path: '/default',				component: Default, 			name: '默认首页'},
     {  path: '*',                      redirect: '/default'},
]

const router = new VueRouter({
    // mode:'history',
    // base: __dirname,
    routes,
})

//全局路由钩子
router.afterEach((route) => {})

export default router;
