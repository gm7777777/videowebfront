<template>
    <div class="layout-container" style="width: 100%">
        <div class="solution-page-img" >
            <div class="container" style="text-align: center">
                <!--<h2>自主创新跨平台企业级解决方案</h2>-->
                <!--<p>光明网曾考虑过通过原生App来实现移动化，但是由于无法复用原始业务流程和数据就放弃了，直到选用了云适配整体解决方案后，可以很方便的在Enterplorer上使用一个帐号登录我们的系统，通过VPN随时进入内网。</p>-->
                <!--<img :src="picklink" style="width:100%;height:100%">-->
                <!--<el-image :src="picklink"  />-->
                <img :src="piclink" style="width:100%;height:100%"/>
                <h2 style="position:absolute;bottom:50%;width:100%;color:white;">{{name}}</h2>
                <p style="position:absolute;bottom:40%;width:100%;color:white;">{{remark}}</p>
            </div>
        </div>
    </div>
    <div class="layout-container" style="width: 100%">
        <div class="breadcrumb-box">
            <div class="am-container">
                <ol class="am-breadcrumb">
                    <li><router-link to="/">首页</router-link></li>
                    <li class="am-active">案例中心</li>
                </ol>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container" style="max-width: 1160px;position: flex;left: 0;top: 0;right: 0;bottom: 0;margin: auto;">
            <div class="section--header">
                <h2 class="section--title">解决方案案例展示</h2>
                <!--<p class="section&#45;&#45;description">-->
                    <!--全球独创专利技术：一行代码部署，帮助企业快速安全地将现有PC版网页适配成HTML5跨屏网页，跨平台的企业统一办公 门户，快捷的移动适配开发能力，完备的数据安全保护-->
                <!--</p>-->

                <!--<p v-html="content" class="section&#45;&#45;description">-->
                    <!--&lt;!&ndash;全球独创专利技术：一行代码部署，帮助企业快速安全地将现有PC版网页适配成HTML5跨屏网页，跨平台的企业统一办公 门户，快捷的移动适配开发能力，完备的数据安全保护&ndash;&gt;-->
                <!--</p>-->
                <p v-html="content" class="section&#45;&#45;description">
                </p>
                {{projecttime.format('YYYY-MM-DD')}}
            </div>
            <!--<el-row class="video-play" v-if="video_play" style="margin: 40px  0">-->
                <myVideoPlay :src="video_play_url"/>
            <!--</el-row>-->
            <!--<div class="solution-container">-->
                <!--<div data-am-widget="tabs" class="am-tabs ">-->
                    <!--<ul class="am-tabs-nav am-cf">-->
                        <!--<li v-for="(tab,index) in tabList"-->
                            <!--:key="index"-->
                            <!--@click.prevent="changeTab(index,tab.typeId)"-->
                            <!--:class="tabIndex === index ? 'am-active':''">-->
                            <!--<a href="#">{{tab.typeName}}</a>-->
                        <!--</li>-->
                    <!--</ul>-->
                    <!--<div class="am-tabs-bd">-->
                        <!--<div class=am-tabs-tab>-->
                            <!--<div class="am-tab"-->
                                 <!--v-for="(goods,index) in goodsList"-->
                                 <!--:key="index"-->
                                 <!--@click="handleDetails(goods.typeDetaisId)">-->
                                <!--<img :src="goods.imageUrl1" alt="">-->
                                <!--<p>{{goods.title}}</p>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        

    </div>
</template>

<script>
// 视频详情
// import apiGetMovDetail from '../apis/getMovDetail'
import myVideoPlay from '../components/VideoPlay.vue'
// import { ElMessage } from 'element-plus'
// import { ref } from 'vue'
import { useStore } from 'vuex'
// import { isCollectVideo, addCollectVideo, removeCollectVideo } from '../apis/videoCollection'
import {getById} from '../apis/cases';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus'
export default {
  name: 'ProductCenterDetail',

  setup() {
    const store = useStore();
      // const piclink = '../images/product/bg.jpg';
    return {
        store,
          // piclink
    }
  },

  components: {
    myVideoPlay
  },

  props: {
      case_id: String
    },
  data() {
    return {
      piclink:'../images/product/bg.jpg',
      name:'自主创新跨平台企业级解决方案',
          content:'',
          remark:'',
          projecttime: dayjs().add(0, 'month').startOf('month'),
        mov_detail: {},
        video_play: false,
        video_play_url: '',  // 此时正在播放的 视频url
        activeName: '',
        isCollect: 0  // 此视频是否被收藏
    }
  },

  methods: {

      loadCase(){
          getById({
              ctxBody:{
                  id:this.case_id
              }
          }).then(
                  (res) => {
                      if (res.code == 200) {
                          if(res.data!=null){
                              this.name = res.data.name;
                              this.content = res.data.content;
                              this.piclink = res.data.piclink;
                              this.remark = res.data.remarks;
                              this.video_play_url = res.data.videolink;
                              this.projecttime = projecttime;
                          }
                      } else {
                          console.log('failed', res)
                      }
                  }
              )
          }

    // getMovDetail() {
    //     var param = {
    //         vod_id: this.vod_id
    //     }
    //     console.log(param)
    //     apiGetMovDetail(param).then(
    //         (res) => {
    //             if (res.code == 200) {
    //                 this.mov_detail = res.data
    //             } else {
    //                 console.log('failed', res)
    //             }
    //         }
    //     )
    // },

    // addCollect() {
    //     // 将此视频添加收藏
    //     console.log("add collect")
    //     if (this.store.state.appStore.isLogining) {
    //         var params = {
    //             vod_id: this.vod_id,
    //             user_id: this.store.state.appStore.user.id
    //         }
    //         addCollectVideo(params).then(
    //             (res) => {
    //                 if (res.data.code == 200) {
    //                     this.isCollect = 1
    //                 } else {
    //                     ElMessage({
    //                             message: res.data.message,
    //                             type: 'warning',
    //                         })
    //                 }
    //             }
    //         )
    //     } else {
    //         ElMessage({
    //                     message: '请先登录',
    //                     type: 'warning',
    //                         })
    //     }
    // },

    // removeCollect() {
    //     console.log("remove collect")
    //     if (this.store.state.appStore.isLogining) {
    //         var params = {
    //             vod_id: this.vod_id,
    //             user_id: this.store.state.appStore.user.id
    //         }
    //         removeCollectVideo(params).then(
    //             (res) => {
    //                 if (res.data.code == 200) {
    //                     this.isCollect = 0
    //                 } else {
    //                     ElMessage({
    //                             message: res.data.message,
    //                             type: 'warning',
    //                         })
    //                 }
    //             }
    //         )
    //     } else {
    //         ElMessage({
    //                     message: '请先登录',
    //                     type: 'warning',
    //                         })
    //     }
    // },

    // showIsCollect() {
    //     // 显示此视频是否被收藏
    //     if (this.store.state.appStore.isLogining) {
    //         var params = {
    //             vod_id: this.vod_id,
    //             user_id: this.store.state.appStore.user.id
    //         }
    //         isCollectVideo(params).then(
    //             (res) => {
    //                 if (res.data.code == 200) {
    //                     this.isCollect = res.data.data
    //                     console.log(this.isCollect)
    //                 } else {
    //                     ElMessage({
    //                             message: res.data.message,
    //                             type: 'warning',
    //                         })
    //                 }
    //             }
    //         )
    //     }
    // },

    // videoPlay(v) {
    //     // 点击按钮时修改 视频播放的链接
    //     var play_url = v.currentTarget.attributes.href.value
    //     console.log(play_url)
    //     if (play_url) {
    //         this.video_play = true
    //         this.video_play_url = play_url
    //         this.activeName = play_url
    //     } else {
    //         ElMessage({
    //             message: '导入视频失败',
    //             type: 'warning',
    //             })
    //     }
    //
    // },

    // checkHtml(s) {
    //     // 判断它是否是html
    //     if (typeof(s) == 'string') {
    //         if (s.indexOf('<p>')>-1) {
    //             return true
    //         } else if (s.indexOf('<span>')>-1) {
    //             return true
    //         } else {
    //             return false
    //         }
    //     } else {
    //         return false
    //     }
    // }
  },

   watch: {
      // user出现变化后 请求数据 查看是视频是否被收藏
      // moniterUser() {
      //   return this.store.state.appStore.user.id
      // }
    },

    computed: {
      // moniterUser() {
      //   this.showIsCollect()
      // }
    },
  created() {
    // this.getMovDetail()
    this.loadCase();
  }

}

</script>

<!--<style vars="{piclink}" scoped >-->
<style >
div.vod-detail .el-row {
    margin: 0 0 10px;
}

span.des-name {
    line-height: 20px;
    margin: 0;
    color: #999;
    font-weight: 400;
    display: inline;
    text-align: left;
}

p.des-content {
    margin: 0;
    line-height: 20px;
    text-align: left;
    display: inline;
    color:black;
}


.el-col.vod-detail div.vod-detail {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 130%;
}

.el-col.vod-detail div img {
    width: 95%;
    height: auto;
    display: block;
    margin: 0 auto;
    /* aspect-ratio: 70/89;  */
    object-fit: cover;
}

.el-button.vod-play-url.active {
  background-color: rgb(36, 184, 242);
  color: white;
  border-radius: 4px;
}

.solution-page-img{
    /*background: v-bind(piclink);*/
    color: #fff;
    /*padding: 110px 0 160px;*/
}
/* p {
    margin: 0;
    padding: 0;
} */
</style>