<template>
  <div class="common-layout">
    <el-container >
      <el-header style="width: 100%; position: sticky; border-bottom: 1px solid #dcdfe6; top: 0; left: 0; z-index:1000; padding: 0">
      <div class="sakura-header">
        <!--<SakuraMenu/>-->
        <Header/>
      </div>
      </el-header>
      <el-main style="overflow: hidden; top: 0; left: 0; padding: 0;">
        <!-- <MovieCardListVue/> -->
        <!-- <router-view /> -->
        <div class="sakura-main">
          <!-- <router-view /> -->
          <router-view v-slot="{ Component }" :key="key">
          <keep-alive :exclude="['MovDetailPageVue', 'MovieKeywordPageVue', 'LoginVue']">
            <component :is="Component"/>
          </keep-alive>
          </router-view>
        </div>
        
      </el-main>
      <el-footer  >
        <!--<FooterVue/>-->
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import SakuraMenu from './components/SakuraMenu.vue'
import MovieCardList from './components/MovieCardList.vue'
import FooterVue from './components/Footer.vue'
import MovDetailPageVue from './views/MovDetailPage.vue'
import MovieKeywordPageVue from './views/MovieKeywordPage.vue'
import LoginVue from './views/Login.vue'
import Footer from './components/common/Footer.vue'
import Header from './components/common/Header.vue'

export default {
  name: 'App',
  components: {
    SakuraMenu,
    MovieCardList,
    FooterVue,
    MovDetailPageVue,
    MovieKeywordPageVue,
    LoginVue,
      Footer,
      Header
  },

  computed: {
    key() {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      // console.log(this.$route.fullPath);
      return this.$route.fullPath
    }
  },
}
</script>

<style scoped>
  /*.el-footer{*/
    /*width: 100%;*/
    /*background: url(../images/footer.jpg);*/
    /*background-size: cover;*/
    /*position: relative*/
  /*}*/
</style>
