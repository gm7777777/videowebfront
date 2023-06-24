<template>
    <ul @scroll="scrollFun" class="infinite-list list-box"  >
    <div class="tab-container" id="tabContainer">
        <!--<el-scrollbar>-->
        <div class="tab-item" v-for="(item, index) in pbList" :key="index"  @click="routerDir(item.id)">
            <el-tooltip
                    effect="dark"
                    :content="item.area+`:`+item.name"
                    placement="bottom"
            >
            <!--<img :src="item.url" style="border-top-right-radius: 15px;border-top-left-radius: 15px;-->
            <!--border-bottom-left-radius: 15px;border-bottom-right-radius: 15px" />-->
                <img :src="item.piclink" style="border-top-right-radius: 15px;border-top-left-radius: 15px;"/>
            <!--<p style="position:absolute;bottom:5px;width:100%;">{{item.area}}</p>>-->
            <!--<p style="width:100%;font-size:x-small">{{item.title}}</p>-->
            </el-tooltip>

            <p style="position:absolute;bottom:20%;width:100%;color:white;">{{item.area}}</p>
            <p style="width:100%;font-size:x-small">{{item.name}}</p>
        </div>
            <p v-if="loading" style="width:100%">Loading...</p>
            <p v-if="noMore" style="width:100%">No more</p>
        <!--<Spin size="large" fix v-if="spinShow"></Spin>-->
        <!--</el-scrollbar>-->
    </div>
    </ul>
</template>

<script>
    import {getCases} from '../apis/cases';
    export default {
        name:'WaterFullList',
        props:{
        //     pbList:{
        //         type:Array,
        //         default:()=>{return []}
        // },
        loading:{
                type:Boolean,
                default:false
        },
        noMore:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            index:0,
            pbList:[],
            addList:[],
            loading:true,
            noMore:false,
        };
    },
    mounted() {
        // this.setTimeout(this.waterFall("#tabContainer", ".tab-item"),100);

    this.loadCasesByPage();

    },
    methods: {
        scrollFun(e) {
            const  offsetHeight= e.target.offsetHeight
            const  scrollHeight= e.target.scrollHeight
            const  scrollTop= e.target.scrollTop
            if((scrollHeight - (offsetHeight+scrollTop)) < 100){
                // if(this.bottomMain){
                //     this.bottomMain = false
                    setTimeout(() => {
                    //     if(this.addList == undefined ||this.addList == null || this.addList.length <= 0){
                    //     this.noMore = true;
                    //     return;
                    // }
                    this.pbList = this.pbList.concat(this.addList);
                    this.addList = [];
                    this.loadCasesAddList();
                    // this.loadCasesByPage();
                    // this.bottomMain = true
                    this.$nextTick(()=>{
                       this.waterFallAdd("#tabContainer", ".tab-item");
                    // this.$Spin.hide()
                    this.spinShow = false;
                    this.loading = false;
                })
                },500);
                // }
            }


        },
        loadCasesAddList(){
            // let num = 0;
            // if(null!=this.pbList){
            //     num=this.pbList.length;
            // }
            getCases({
                ctxHeader:{
                    pageSize:3,
                    index:this.pbList.length
                }
            }).then(
                (res) => {
                // console.log(res.data)
                if(res.code == 200){
                    if(null==res.data||res.data.length<1){
                        this.noMore = true;
                        return;
                    }
                for(let i = 0 ;i<res.data.length;i++){
                    let item = res.data[i];
                    // for (let sector in sectors) {
                    //     if (item.sectorcode == sector.code) {
                    //         item['area'] = sector.title;
                    //     }
                    // }
                    this.addList.push(item);
                }
            }else{
                ElMessage({
                    message: res.message,
                    type: 'error',
                })
            }
        })
        },
            async loadCasesByPage(){

        getCases({
            ctxHeader:{
                pageSize:3,
                index:this.pbList.length
            }
        }).then(
            (res) => {
            // console.log(res.data)
            if(res.code == 200){
            // let temp = [];
            // for(let i = 0 ;i<res.data.length;i++){
            // let item = res.data[i];
            // for (let j =0 ; j<this.sectors.length;j++) {
            // if (item.sectorcode == this.sectors[j].code) {
            //     item['area'] = this.sectors[j].title;
            // }
            //
            // }
            //     temp.push(item);
            //
            // }
            this.pbList = res.data;
            // this.$refs.waterfullList.waterFall("#tabContainer", ".tab-item")
            // this.$refs.waterfullList.waterFallAdd("#tabContainer", ".tab-item");
                setTimeout(this.$nextTick(()=>{
                    this.waterFall("#tabContainer", ".tab-item"); //实现瀑布流
            }),1500);
        }else{
            ElMessage({
                message: res.message,
                type: 'error',
            })
        }
    })
    },
        waterFallAdd(
            wrapIdName,
            contentIdName,
            columns = 3,
            columnGap = 5,
            rowGap = 5
        ) {
            // 获得内容可用宽度（去除滚动条宽度）
            const wrapContentWidth =
                document.querySelector(wrapIdName).offsetWidth;

            // 间隔空白区域
            const whiteArea = (columns - 1) * columnGap;

            // 得到每列宽度(也即每项内容宽度)
            const contentWidth = parseInt((wrapContentWidth - whiteArea) / columns-2);
            // const contentWidth = 100/columns;

            // 得到内容项集合
            const contentList = document.querySelectorAll(contentIdName);

            // 成行内容项高度集合
            const lineConentHeightList = [];
            // let maxheight = 0;

            for (let i = 0; i < contentList.length; i++) {

                if(i<this.index){
                    continue;
                }
                // 动态设置内容项宽度
                contentList[i].style.width = contentWidth + "px";
                //  contentList[i].style.width = 100/columns + "%";

                // 获取内容项高度
                const height = contentList[i].clientHeight;

                if (i < columns) {
                    // 第一行按序布局
                    contentList[i].style.top = "0px";
                    contentList[i].style.left = contentWidth * i + columnGap * i + "px";

                    // 将行高push到数组
                    lineConentHeightList.push(height);
                    // maxheight +=height;
                } else {
                    // 其他行
                    // 获取数组最小的高度 和 对应索引
                    let minHeight = Math.min(...lineConentHeightList);
                    // maxheight = Math.max(...lineConentHeightList);
                    let index = lineConentHeightList.findIndex(
                        (listH) => listH === minHeight
                );

                    contentList[i].style.top = minHeight + rowGap +"px";
                    contentList[i].style.left = (contentWidth + columnGap) * index + "px";

                    // 修改最小列的高度 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 行间距
                    lineConentHeightList[index] += height + rowGap;
                    index++;
                    // setTimeout({}, 100);
                }
            }
        },
        waterFall(
            wrapIdName,
            contentIdName,
            columns = 3,
            columnGap = 5,
            rowGap = 5
        ) {
            // 获得内容可用宽度（去除滚动条宽度）
            const wrapContentWidth =
                document.querySelector(wrapIdName).offsetWidth;

            // 间隔空白区域
            const whiteArea = (columns - 1) * columnGap;

            // 得到每列宽度(也即每项内容宽度)
            const contentWidth = parseInt((wrapContentWidth - whiteArea) / columns-2);
            // const contentWidth = 100/columns;

            // 得到内容项集合
            const contentList = document.querySelectorAll(contentIdName);

            // 成行内容项高度集合
            const lineConentHeightList = [];
            // let maxheight = 0;

            for (let i = 0; i < contentList.length; i++) {

                // if(i<index){
                //     continue;
                // }
                // 动态设置内容项宽度
                contentList[i].style.width = contentWidth + "px";
                //  contentList[i].style.width = 100/columns + "%";

                // 获取内容项高度
                const height = contentList[i].clientHeight;

                if (i < columns) {
                    // 第一行按序布局
                    contentList[i].style.top = "0px";
                    contentList[i].style.left = contentWidth * i + columnGap * i + "px";

                    // 将行高push到数组
                    lineConentHeightList.push(height);
                    // maxheight +=height;
                } else {
                    // 其他行
                    // 获取数组最小的高度 和 对应索引
                    let minHeight = Math.min(...lineConentHeightList);
                    // maxheight = Math.max(...lineConentHeightList);
                    let index = lineConentHeightList.findIndex(
                        (listH) => listH === minHeight
                );

                    contentList[i].style.top = minHeight + rowGap +"px";
                    contentList[i].style.left = (contentWidth + columnGap) * index + "px";

                    // 修改最小列的高度 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 行间距
                    lineConentHeightList[index] += height + rowGap;
                    this.index++;
                    // setTimeout({}, 100);
                }
            }

            // document.querySelector("tabContainer").style.height=maxheight+'px';
            // this.$emit('compheight',maxheight);
            // loading = true;
            // window.location.reload([false])
        },

        routerDir(id){
            this.$router.push({path: '/productcenterdetail/' + id});
        }
    },
    };
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    /* 最外层大盒子 */
    .tab-container {
        padding-top: 5px;
        position: absolute;
        width:100%;
        height:100%;
    }
    /* 每个小盒子 */
    .tab-container .tab-item {
        position: absolute;
        height: auto;
        border: 1px solid #ccc;
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
        background: white;
        /* 元素不能中断显示 */
        break-inside: avoid;
        text-align: center;
        border-top-right-radius: 15px;border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;

    }
    .tab-container .tab-item img {
        width: 100%;
        height: auto;
        display: block;
    }
    .infinite-list-wrapper .list {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .list-box{
        position: relative;
        width: 100%;
        /*height: calc(100vh - 240px);*/
        height:700px;
        background: white;
        padding: 10px 20px 5px 2px;
        /*margin-top: 20px;*/
        box-sizing: border-box;
        overflow: auto;
        overflow-x:hidden;
        background:transparent;
    }
    /* 整个滚动条 */
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* 滚动条上的滚动滑块 */
    ::-webkit-scrollbar-thumb {
        background-color: #49b1f5;
        /* 关键代码 */
        background-image: -webkit-linear-gradient(45deg,
        rgba(255, 255, 255, 0.4) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0.4) 75%,
        transparent 75%,
        transparent);
        border-radius: 32px;
    }

    /* 滚动条轨道 */
    ::-webkit-scrollbar-track {
        background-color: #dbeffd;
        border-radius: 32px;
    }
</style>