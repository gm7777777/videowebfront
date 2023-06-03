<template>
  <div style="padding: 20px 10px 0 10px">
    <SakuraBigImgVue/>
  </div>
  
  <!--<MovLimitCardVue :movtype="4"/>-->
  <!--<MovLimitCardVue :movtype="1"/>-->
  <!--<MovLimitCardVue :movtype="2"/>-->
  <!--<MovLimitCardVue :movtype="3"/>-->
  <!--<el-backtop :right="50" :bottom="80" />-->
  <div class="section">
    <div class="container" style="max-width: 1160px;position: flex;left: 0;top: 0;right: 0;bottom: 0;margin: auto;">
      <div class="section--header">
        <!--<h2 class="section&#45;&#45;title">核心优势</h2>-->
        <h2 class="section&#45;&#45;title">网站介绍</h2>
        <!--<p class="section&#45;&#45;description">-->
          <!--全球领先HTML5企业移动化解决方案供应商，由前微软美国总部IE浏览器核心研发团队成员及移动互联网行业专家在美国西雅图创立,获得了微软创投的扶持以及晨兴资本、IDG资本、天创资本等国际顶级风投机构的投资。-->
        <!--</p>-->
        <p class="section--description">
          本网站为个人网站，主要用于个人介绍，作品介绍，知识分享，图书分享等用途。
          <br>网站主题有四大板块，首页介绍，作品介绍，图书分享，知识问答。
          <br>网站前台使用vue3+element plus开发打包后发布nginx
          <br>后台使用springcloud+mongodb制作以及基于python+机器学习的关注度推荐算法
          <br>GitHub地址:<a href="https://github.com/gm7777777/videowebfront" target="_blank">https://github.com/gm7777777/videowebfront</a>
        </p>
      </div>

      <div class="index-container">
        <div class="am-g">
          <div class="am-u-md-3" v-for="(advantage,index) in advantageList" :key="index">
            <div class="features_item" @click="patharea(advantage.id)">
              <img :src="advantage.cover" alt="" style="width:100%">
              <h3 class="features_item--title">{{advantage.title}}</h3>
              <p class="features_item--text">{{advantage.desc}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section" style="border-bottom: 1px solid #e9e9e9; padding-top: 0">
    <div class="container" style="max-width: 1160px;position: flex;left: 0;top: 0;right: 0;bottom: 0;margin: auto;">
      <div class="section--header">
        <h2 class="section--title">服务</h2>
        <p class="section--description">
          因个人能力有限，网站目前很粗糙，所以本网站只做知识的简单分享和一些问题讨论
          <br>目的是去帮助广大程序员提升自己的技能并推广作者的部分产品
          <br>因为部分答疑需要消耗大量个人时间以及网站搭建运维有线上成本，在帮助大家解决部分问题时，特别复杂耗时的问题会付费咨询,回答后会根据用户注册邮箱，发送付费邮件并非垃圾邮件
          <br>但，是否付费全凭用户自己主观意愿，不会有强制付费的要求，付费形势也是扫二维码，一般为2元，5元，10元的形式
        </p>
      </div>

      <!--<div class="index-container">-->
        <!--<div class="am-g">-->
          <!--<div class="am-u-md-3" v-for="(service,index) in serviceList" :key="index">-->
            <!--<div class="service_item">-->
              <!--<i class="service_item&#45;&#45;icon" :class="service.icon"></i>-->
              <!--<h3 class="service_item&#45;&#45;title">{{ service.title }}</h3>-->
              <!--<div class="service_item&#45;&#45;text"><p>{{service.desc}}</p></div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
// 首页
import SakuraBigImgVue from '../components/SakuraBigImg.vue'
import MovLimitCardVue from '../components/MovLimitCard.vue'

export default {
  name: 'MovieHome',
  components: {
    MovLimitCardVue,
    SakuraBigImgVue
  },

    data(){
        return {
            advantageList: [
                {
                    id: "introduction",
                    cover: 'src/assets/images/background/portrait.jpg',
                    title: '作品介绍',
                    desc: '作者个人的项目案例与产品展示'
                },
                {
                    id: "onlinebooks",
                    cover: 'src/assets/images/background/books_apple_hires.jpg',
                    title: '在线图书',
                    desc: '作者个人认为写的不错并值得分享的一些书籍'
                },
                {
                    id: "askanswer",
                    cover: 'src/assets/images/index/f01.jpg',
                    title: '知识问答',
                    desc: '分享与解答来自网友的各个技术板块的问题'
                },
                {
                    id: "productcenter",
                    cover: 'src/assets/images/background/productcenter.jpg',
                    title: '产品中心',
                    desc: '目前暂不可用'
                },
            ],
            serviceList: [
                {id: 1, icon: 'am-icon-diamond', title: '多页面工作', desc: '标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理'},
                {id: 2, icon: 'am-icon-user', title: '多页面工作', desc: '标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理'},
                {id: 3, icon: 'am-icon-umbrella', title: '多页面工作', desc: '标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理'},
                {id: 4, icon: 'am-icon-briefcase', title: '多页面工作', desc: '标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理'}
            ],
        }
    },
    methods:{
        patharea(val){
            this.$router.push({path: '/'+val});
        }
    }
}
</script>

<style scoped>
  .section--description{
    padding:20px;
  }
</style>
