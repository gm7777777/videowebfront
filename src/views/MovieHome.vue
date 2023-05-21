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
        <h2 class="section--title">核心优势</h2>
        <p class="section--description">
          全球领先HTML5企业移动化解决方案供应商，由前微软美国总部IE浏览器核心研发团队成员及移动互联网行业专家在美国西雅图创立,获得了微软创投的扶持以及晨兴资本、IDG资本、天创资本等国际顶级风投机构的投资。
        </p>
      </div>

      <div class="index-container">
        <div class="am-g">
          <div class="am-u-md-3" v-for="(advantage,index) in advantageList" :key="index">
            <div class="features_item">
              <img :src="advantage.cover" alt="">
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
        <h2 class="section--title">我们的服务</h2>
        <p class="section--description">
          全球领先HTML5企业移动化解决方案供应商，由前微软美国总部IE浏览器核心研发团队成员及移动互联网行业专家在美国西雅图创立
          <br>获得了微软创投的扶持以及晨兴资本、IDG资本、天创资本等国际顶级风投机构的投资。
        </p>
      </div>

      <div class="index-container">
        <div class="am-g">
          <div class="am-u-md-3" v-for="(service,index) in serviceList" :key="index">
            <div class="service_item">
              <i class="service_item--icon" :class="service.icon"></i>
              <h3 class="service_item--title">{{ service.title }}</h3>
              <div class="service_item--text"><p>{{service.desc}}</p></div>
            </div>
          </div>
        </div>
      </div>
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
                    id: 1,
                    cover: 'src/assets/images/index/f01.jpg',
                    title: '简单的适配过程',
                    desc: '用户可快速学习适配开发，通过丰富的组件库完成页面功能的移动化适配。'
                },
                {
                    id: 2,
                    cover: 'src/assets/images/index/f01.jpg',
                    title: '简单的适配过程',
                    desc: '用户可快速学习适配开发，通过丰富的组件库完成页面功能的移动化适配。'
                },
                {
                    id: 3,
                    cover: 'src/assets/images/index/f01.jpg',
                    title: '简单的适配过程',
                    desc: '用户可快速学习适配开发，通过丰富的组件库完成页面功能的移动化适配。'
                },
                {
                    id: 4,
                    cover: 'src/assets/images/index/f01.jpg',
                    title: '简单的适配过程',
                    desc: '用户可快速学习适配开发，通过丰富的组件库完成页面功能的移动化适配。'
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
}
</script>
