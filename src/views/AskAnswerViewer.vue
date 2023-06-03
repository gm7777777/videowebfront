<template>
    <div style="height:100%;">
        <el-carousel :interval="4000" type="card" height="200px" style="border: 1px solid #ccc;">
            <el-carousel-item v-for="item in tableData" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div style="height:30px;width:100%;margin:5px">
            <el-button-group style="float:left;margin-left:100px;">
            <el-button type="primary" :icon="Edit"  @click="publishtopic">发布新帖</el-button>
            <el-button type="primary" :icon="Edit"  @click="edittopic">{{showeditbt}}</el-button>

            </el-button-group>
            <!--<el-button type="primary" :icon="Edit" />-->
            <el-input
                v-model="input1"
                class="w-50 m-2 searchinput"
                size="large"
                placeholder="查询"
                :prefix-icon="Search"
        >
                <template #suffix>
                    <el-icon><Search /></el-icon>
                </template>
            </el-input>

        </div>
        <el-tabs :tab-position="tabPosition" style="width:100%;padding:1px;background:transparent;" >
            <el-tab-pane label="大数据" >
                <QuestTables :dataList="tableData" :editstatus="isedit">
                </QuestTables>
            </el-tab-pane>
            <el-tab-pane label="云计算">

                <QuestTables :dataList="tableData" :editstatus="isedit">
                </QuestTables>
            </el-tab-pane>
            <el-tab-pane label="嵌入式">

                <QuestTables :dataList="tableData" :editstatus="isedit">
                </QuestTables>
            </el-tab-pane>
            <el-tab-pane label="AI">

                <QuestTables :dataList="tableData" :editstatus="isedit">
                </QuestTables>
            </el-tab-pane>
            <el-tab-pane label="其他">

                <QuestTables :dataList="tableData" >
                </QuestTables>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { Search } from '@element-plus/icons-vue';
    import QuestTables from '../components/QuestTables.vue';
    export default {
        name:'AskAnswerViewer',
        components:{
            Search,QuestTables
        },
        mounted(){
            // document.querySelector(".el-tabs__content").style.padding="0px";
            document.querySelector(".el-tabs__content").style.padding="0px";
            document.querySelector(".el-input").style.margin="0px 0px 0px 0px";

        },
        data() {
            return {
                showeditbt:"查看个人贴子",
                isedit:false,
                input1:'',
                tabPosition: 'left',
                tableData:[
                    {
                        id:1,
                        date: '2016-05-03',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        url:"src/assets/images/about/f02.jpg",
                        cnum:10,
                        sourceIp:"202.198.245,98"
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        url:"src/assets/images/about/f02.jpg",
                        cnum:10,
                        sourceIp:"202.198.245,98"
                    },
                    {
                        id:1,
                        date: '2016-05-04',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        url:"src/assets/images/about/f02.jpg",
                        cnum:10,
                        sourceIp:"202.198.245,98"
                    },
                    {
                        id:1,
                        date: '2016-05-01',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        url:"src/assets/images/about/f02.jpg",
                        cnum:10,
                        sourceIp:"202.198.245,98"
                    },
                ]

            }
        },
    created() {

    },
        watch: {},
        computed: {},
        methods: {
            publishtopic(){
                this.$router.push({path: '/topiceditoradd/add'});
            },
            edittopic(){
                if(this.isedit){
                    this.isedit=false;
                    this.showeditbt="查看个人贴子";
                }else{
                    this.isedit = true;
                    this.showeditbt="查看所有贴子";
                }
                // this.$router.push({path: '/topiceditoradd/edit'});
            }
        },
        //
        // methods:{
        //
        // }
    };
</script>

<style scoped>

    /*.el-tabs__content{*/
        /*!*padding:0px !important;*!*/
    /*!*}*!*/
    /*.eltabpane{*/
        /*padding:0px*/
    /*}*/
    /*!*.el-date-editor {*!*/
        /*!*box-shadow: none !important;*!*/
    /*!*}*!*/
    /*.left-intro{*/
        /*position: relative;*/
        /*width:25%;*/
        /*border-right: 10px solid slategray;*/
        /*text-align:center;*/
    /*}*/
    /*.list-box{*/
        /*position: relative;*/
        /*width: 100%;*/
        /*!*height: calc(100vh - 240px);*!*/
        /*height:700px;*/
        /*background: white;*/
        /*padding: 10px 20px 5px 2px;*/
        /*!*margin-top: 20px;*!*/
        /*box-sizing: border-box;*/
        /*overflow: auto;*/
        /*overflow-x:hidden;*/
        /*!*overflow-y:hidden;*!*/
        /*background:transparent;*/
    /*}*/
    /*!* 整个滚动条 *!*/
    /*::-webkit-scrollbar {*/
        /*width: 10px;*/
        /*height: 10px;*/
    /*}*/

    /*!* 滚动条上的滚动滑块 *!*/
    /*::-webkit-scrollbar-thumb {*/
        /*background-color: #49b1f5;*/
        /*!* 关键代码 *!*/
        /*background-image: -webkit-linear-gradient(45deg,*/
        /*rgba(255, 255, 255, 0.4) 25%,*/
        /*transparent 25%,*/
        /*transparent 50%,*/
        /*rgba(255, 255, 255, 0.4) 50%,*/
        /*rgba(255, 255, 255, 0.4) 75%,*/
        /*transparent 75%,*/
        /*transparent);*/
        /*border-radius: 32px;*/
    /*}*/

    /*!* 滚动条轨道 *!*/
    /*::-webkit-scrollbar-track {*/
        /*background-color: #dbeffd;*/
        /*border-radius: 32px;*/
    /*}*/
    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
    .searchinput{
        width:30%;
        height:30px;
        float:right;
    }

</style>