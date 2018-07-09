import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 
const Admin = resolve => {
    require.ensure(['../Admin.vue'], () => {
        resolve(require('../Admin.vue'))
    })
}
// 首页
const Home = resolve => {
    require.ensure(['../component/home.vue'], () => {
        resolve(require('../component/home.vue'))
    })
}
// 房源
const HouseResource = resolve => {
    require.ensure(['../component/houseResource.vue'], () => {
        resolve(require('../component/houseResource.vue'))
    })
}
// 房源详情
const HouseDetails = resolve => {
    require.ensure(['../component/houseDetails.vue'], () => {
        resolve(require('../component/houseDetails.vue'))
    })
}
// 客源
const PassengerOrigin = resolve => {
    require.ensure(['../component/passengerOrigin.vue'], () => {
        resolve(require('../component/passengerOrigin.vue'))
    })
}
// 客源详情
const passengerDetails = resolve => {
    require.ensure(['../component/passengerDetails.vue'], () => {
        resolve(require('../component/passengerDetails.vue'))
    })
}

// 成交
const ClinchDeal = resolve => {
    require.ensure(['../component/clinchDeal.vue'], () => {
        resolve(require('../component/clinchDeal.vue'))
    })
}
// 业绩
const Achievements = resolve => {
    require.ensure(['../component/achievements.vue'], () => {
        resolve(require('../component/achievements.vue'))
    })
}
// 个人
const Personal = resolve => {
    require.ensure(['../component/personal.vue'], () => {
        resolve(require('../component/personal.vue'))
    })
}
// 审核
const Audit = resolve => {
    require.ensure(['../component/audit.vue'], () => {
        resolve(require('../component/audit.vue'))
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



const routes= [

    {   path: '/Admin',
        component: Admin,
        children:[
            {   path: 'houseDetails/:id',       component: HouseDetails,        name: '房源详情',  props: true},// 房源详情
            {   path: 'passengerDetails/:id',          component: passengerDetails,    name: '客源详情',  props: true},// 客源详情


            {   path: 'home',                   component: Home,                name: '首页'},
            {   path: 'houseResource',          component: HouseResource,       name: '房源'},
            {   path: 'passengerOrigin',        component: PassengerOrigin,     name: '客源'},
            {   path: 'clinchDeal',             component: ClinchDeal,          name: '成交' ,meta: {roles: ['admin']}},
            {   path: 'achievements',           component: Achievements,        name: '业绩'},
            {   path: 'personal',               component: Personal,            name: '个人'},
            {   path: 'audit',                  component: Audit,               name: '审核'},
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
