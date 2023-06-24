import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/MovieHome.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/personSapce/:user_id',
    name: 'personSapce',
    component: () => import('../views/PersonalSapcePage.vue'),
    props: true,
    meta: {
      title: "用户空间",
      needLogin: true //需要登录
    }
  },
  {
    path: '/movtype/:movtype',
    component:  () => import('../views/MoviePage.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/MovieKeywordPage.vue')
  },
  {
    path: '/movdetail/:vod_id',
    name: 'movdetail',
    component: () => import('../views/MovDetailPage.vue'),
    props: true
  },
{
    path: '/productcenterdetail/:case_id',
        name: 'productcenterdetail',
    component: () => import('../views/ProductCenterDetail.vue'),
    props: true
},
{
    path: '/productcenter',
        name: 'productcenter',
    component: () => import('../views/ProductCenter.vue'),
    props: true
},
{
    path: '/onlinebooks',
        name: 'onlinebooks',
    component: () => import('../views/OnlineBooks.vue'),
    props: true
},
{
    path: '/introduction',
        name: 'introduction',
    // component: () => import('../views/IntroductionViewer.vue'),
    component: () => import('../views/Introduction.vue'),
    props: true
},
{
    path: '/askanswer',
        name: 'askanswer',
    component: () => import('../views/AskAnswerViewer.vue'),
    props: true
},
{
    path: '/topiceditoradd/:status',
        name: 'topiceditoradd',
    component: () => import('../views/TopicEditor.vue'),
    props: true
},
{
    path: '/topiceditor/:topic_id/:status',
        name: 'topiceditor',
    component: () => import('../views/TopicEditor.vue'),
    props: true
},
{
    path: '/activate',
        name: 'activate',
    component: () => import('../views/Activate.vue'),
    props: true
},
{
    path: '/caseeditor',
        name: 'caseeditor',
    component: () => import('../views/CaseEditor.vue'),
    props: true
},
{
    path: '/readereditor',
        name: 'readereditor',
    component: () => import('../views/DocReaderEditor.vue'),
    props: true
}
];


const router = createRouter({
  history: createWebHashHistory(),  // hash路由模式
  // history: createWebHistory(),  // history路由模式
  routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    if (token) { // 判断是否已经登录
      next()
    }
    else {
      next({path: '/login'}) //跳转到登录页
    }
  } else { 
  	next()
  }
})

export default router;
