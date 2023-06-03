<template>
    <div style="display:flex;">
        <div class="left-intro">
            <label style="width:100%;padding-top:10px">个人介绍</label>
            <img :src="selfsrc" style="width:80%;padding:10px;"/>
            <p style="font-size:smaller;padding: 10px;">{{years}}年IT业从业经历，先后工作于金蝶，用友，新华三，中国建设银行等知名IT企业，历任项目经理，系统架构师，全栈工程师，技术经理，技术负责人
            ，在金融，AI，云计算，企业数字化转型，大数据领域有丰富经验,个人技术覆盖前台，后台，运维，数据处理，业务设计，架构设计，图形算法，嵌入式，系统内核等，开发语言全栈包括,C++,Java python,go,javascript,vue，web端，android/ios手机，熟悉各种框架及建模思想，中台，DDD,SOA,EJB等</p>
            <p style="font-size:smaller;">邮箱:119618949@qq.com</p>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick" class="eltabpane" style="width:100%;background:transparent;" type="border-card">
            <el-tab-pane label="瀑布广告展示" name="first" >
                <!--<div class="list-box" @scroll="scrollFun">-->
                <div class="infinite-list-wrapper" style="overflow: auto">
                <p style="width:100%;margin-top: auto;font-weight:bolder;">向下滚动,刷新更多作品案例!</p>
                <!--<ul v-infinite-scroll="scrollFun" @scroll="scrollFun" class="infinite-list list-box"  >-->
                    <ul @scroll="scrollFun" class="infinite-list list-box"  >
                <WaterFullList :pbList="pbList" :loading="loading" :noMore="noMore" ref="waterfullList" v-on:compheight="calheight"></WaterFullList>
                </ul>
                <!--<Spin fix v-if="spinShow">-->
                <!--<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>-->
                <!--<div>Loading</div>-->
                <!--</Spin>-->

                <!--</div>-->
                </div>
            </el-tab-pane>
            <el-tab-pane label="树节点展示" name="second" >
                <el-input placeholder="查询作品" v-model="filterText"> </el-input>
                <el-tree
                        class="filter-tree"
                        :data="data"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        ref="tree"
                        node-key="id"
                        @node-click="handleNodeClick"
                        style="background:transparent;"
                >
                </el-tree>

            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import WaterFullList from "../components/WaterFullList.vue";
    export default {
        name:'Introduction',
        components:{
            WaterFullList
        },
        mounted(){
            // document.querySelector(".el-tabs__content").style.padding="0px";
            document.querySelector(".el-tabs__content").style.padding="0px";
        },
        data() {
            return {
                noMore:false,
                loading:false,
                activeName: 'first',
                years:new Date().getFullYear()-2010,
                spinShow:false,
                selfsrc:"src/assets/images/background/self.jpg",
                //瀑布流数据
                pbList: [
                    {
                        // url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2650049201.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664935370&t=d4bf3e4d352c277a1bdebfcc8fda959f",
                        url:"src/assets/images/about/f02.jpg",
                        id:1,
                        title:"123",
                        area:"大数据"
                    },
                    {
                        // url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                        url:"src/assets/images/about/f02.jpg",
                            id:2,
                        title:"234",
                        area:"手机端"
                    },
                    {
                        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2650049201.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664935370&t=d4bf3e4d352c277a1bdebfcc8fda959f",
                        id:3,
                        title:"云计算",
                        area:"云计算"
                    }
                ],
                // pdList:[{
                //     url:"https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",//图片地址
                //     },
                //     {
                //         url:"src/assets/images/about/f02.jpg",//图片地址
                //     },
                //     {
                //         url:"src/assets/images/about/f03.jpg",//图片地址
                //     },
                //     {
                //         url:"src/assets/images/about/f04.jpg",//图片地址
                //     },
                //     {
                //         url:"src/assets/images/background/books_apple_free_photo.jpg",//图片地址
                //     }],
                // addList:[
                //     {
                //         url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2650049201.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664935370&t=d4bf3e4d352c277a1bdebfcc8fda959f",
                //     },
                //     {
                //         url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                //     },
                //     {
                //         url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2650049201.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664935370&t=d4bf3e4d352c277a1bdebfcc8fda959f",
                //     },
                //     {
                //         url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                //     },
                //     {
                //         url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2650049201.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664935370&t=d4bf3e4d352c277a1bdebfcc8fda959f",
                //     },
                //     {
                //         url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                //     },
                //     {
                //         url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2650049201.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664935370&t=d4bf3e4d352c277a1bdebfcc8fda959f",
                //     },
                //     {
                //         url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                //     },
                //     {
                //         url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2650049201.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664935370&t=d4bf3e4d352c277a1bdebfcc8fda959f",
                //     },
                //     {
                //         url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                //     },
                //     {
                //         url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                //     }
                // ],
                addList:[
                    {
                        url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                        id:7,
                        title:"C++",
                        area:"C++"
                    },
                    {
                        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2650049201.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664935370&t=d4bf3e4d352c277a1bdebfcc8fda959f",
                        id:8,
                        title:"Java",
                        area:"Java"
                    },
                    {
                        url: "https://img1.baidu.com/it/u=2911909188,130959360&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=641",
                        id:9,
                        title:"敬请留意",
                        area:"其他"
                    }
                ],
                bottomMain:true,
                filterText: '',
                data: [
                    {
                        id: 1,
                        label: '一级 1',
                        children: [
                            {
                                id: 4,
                                label: '二级 1-1',
                                children: [
                                    {
                                        id: 9,
                                        label: '朱自清',
                                        url: "https://view.xdocin.com/demo/view.docx",
                                    },
                                    {
                                        id: 10,
                                        label: 'Linux内核设计与实现原书第三版',
                                        url:"src/assets/book/Linux内核设计与实现原书第三版.pdf",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        label: '一级 2',
                        children: [
                            {
                                id: 5,
                                label: '二级 2-1',
                            },
                            {
                                id: 6,
                                label: '二级 2-2',
                            },
                        ],
                    },
                    {
                        id: 3,
                        label: '一级 3',
                        children: [
                            {
                                id: 7,
                                label: '二级 3-1',
                            },
                            {
                                id: 8,
                                label: '二级 3-2',
                            },
                        ],
                    },
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label',
                },
            };
        },
        // mounted(){
        //     this.$nextTick(()=>{
        //         this.$refs.compList.waterFall("#tabContainer", ".tab-item")
        //     // this.$Spin.hide()
        //     this.spinShow = false;
        // })
        // },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            },
        },
        methods:{
            handleNodeClick(data){
                if(data['children'] == null) {
                    this.$router.push({path: '/productcenterdetail/' + data['id']});
                }
            },
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            handleClick(tab, event) {
                console.log(tab, event)
            },
            calheight(height){
                // if(1000>=height&&height>500) {
                //
                //     document.querySelector(".list-box").style.height = height + 'px';
                // }
                // this.$router.go(0);
                // document.querySelector(".list-box").style.height='1500px';
            },
            scrollFun(e) {
                const  offsetHeight= e.target.offsetHeight
                const  scrollHeight= e.target.scrollHeight
                const  scrollTop= e.target.scrollTop
                if((scrollHeight - (offsetHeight+scrollTop)) < 10){
                    if(this.bottomMain){
                        this.bottomMain = false
                        setTimeout(() => {
                            if(this.addList == undefined ||this.addList == null || this.addList.length <= 0){
                                this.noMore = true;
                                return;
                            }
                            this.pbList = this.pbList.concat(this.addList);
                        this.bottomMain = true
                        this.$nextTick(()=>{
                            this.$refs.waterfullList.waterFallAdd("#tabContainer", ".tab-item")
                        // this.$Spin.hide()
                        this.spinShow = false;
                        this.loading = false;
                    })
                    },1500);
                    }
                }
                // alter(123);


            },
            addListDataFun(){
            //     this.$Spin.show({
            //         render: (h) => {
            //         return h('div', [
            //             h('Icon', {
            //                 'class': 'demo-spin-icon-load',
            //                 props: {
            //                     type: 'ios-loading',
            //                     size: 18
            //                 }
            //             }),
            //             h('div', 'Loading')
            //         ])
            //     }
            // });
                this.spinShow = true;
                this.loading = true;
            //     this.$Spin.show({
            //         render: (h) => {
            //         return h('div', [
            //             h('Icon', {
            //                 'class': 'demo-spin-icon-load',
            //                 props: {
            //                     type: 'ios-loading',
            //                     size: 18
            //                 }
            //             }),
            //             h('div', '数据更新中...')
            //         ])
            //     }
            // });
                setTimeout(() => {
                    this.pbList = this.pbList.concat(this.addList)
                this.bottomMain = true
                this.$nextTick(()=>{
                    this.$refs.waterfullList.waterFall("#tabContainer", ".tab-item")
                // this.$Spin.hide()
                this.spinShow = false;
                this.loading = false;
            })
            },1000)
            }
        }
    };
</script>

<style scoped>

    /*.el-tabs__content{*/
        /*padding:0px !important;*/
    /*}*/
    .eltabpane{
        padding:0px
    }
    /*.el-date-editor {*/
        /*box-shadow: none !important;*/
    /*}*/
    .left-intro{
        position: relative;
        width:25%;
        border-right: 10px solid slategray;
        text-align:center;
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