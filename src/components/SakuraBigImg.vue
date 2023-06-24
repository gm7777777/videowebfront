<template>
  <el-carousel :height="'500px'" style="margin: 0 auto; width: 100%; border-radius: 4px" indicator-position="outside">
    <el-carousel-item v-for="(data,index) in imgs" :key="i">
      <!--<img :src="i" style="width: 100%" ref="bannerHeight" @load="imgLoad"  @click="showSelectVideo(i)">-->
      <img :src="data.piclink" style="width: 100%;height:500px" ref="bannerHeight" @load="imgLoad"  @click="showSelectVideo(data.id)">
        <p style="width:100%;font-size:larger;color:black;top:30%;position:absolute">{{data.area}}:{{data.name}}</p>

    </el-carousel-item>
  </el-carousel>
</template>


<script>
    import {productview} from "../apis/brand";
export default {
    name: "SakuraBigImg",
    props: {
        movtype: Number
    },
    setup() {
        return {
            // movieList
        }
    },
    data() {
        return {
            bannerHeight: "",
            imgs:[],
            imgsTemp: [
                "src/assets/bigImg/b1.webp",
                "src/assets/bigImg/b2.webp",
                "src/assets/bigImg/b3.webp",
                "src/assets/bigImg/b4.webp"]
        }
    },

    mounted() {
        this.loadProduct();
        this.imgLoad();
        window.addEventListener('resize',() => {
            this.bannerHeight=this.$refs.bannerHeight[0].height;
        this.imgLoad();
    },false)
    },

    methods: {
        async loadProduct(){
        productview({}).then(
            (res) => {
            // console.log(res.data)
            if (res.code == 200) {
            this.imgs = res.data;
            // console.log(this.user)
        } else {
            ElMessage({
                message: res.message,
                type: 'warning',
            })
        }
    }
    )
    },
        imgLoad(){
            this.$nextTick(()=>{
                this.bannerHeight=this.$refs.bannerHeight[0].height;
            console.log(this.$refs.bannerHeight[0].height);
        })
        },
        showSelectVideo(index) {
            this.$router.push({path: '/productcenterdetail/' + index});

        }
    }
}

</script>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
}

</style>
