<template>
    <el-table :data="dataList" style="width:100%;height: 100%;" :show-header="flag" row-style="width:100%">
                <!--<el-table-column prop="address"  fixed="left" min-width="300"/>-->
                <el-table-column prop="pic" width="200">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-image :src="scope.row.logosrc" fit="contain" @click="clickTableRow(scope.row.id)"/>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="th" min-width="300">
                    <template #default="scope">
                        <div style="width:100%;height:50%" @click="clickTableRow(scope.row.id)">
                            {{scope.row.title}}
                        </div>
                        <el-row style="height:50%" @click="clickTableRow(scope.row.id)">
                        <div style="display: flex; align-items: left;width:50%">
                            IP:{{scope.row.sourceip}}
                        </div>
                        <div style="display: flex; align-items: left;width:50%">
                            <el-icon><StarFilled /></el-icon>{{scope.row.remarksnum}}
                        </div>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column prop="date" :formatter="dateFormat"  width="180" fixed="right"/>
        <!--<el-table-column prop="createdate"  width="180" fixed="right"/>-->
        <!--</el-table-column>-->
                <el-table-column prop="author"  fixed="right" width="180" />
            </el-table>
    <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper"
            :total="1000"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
    />
</template>

<script>
    // import dayjs from 'dayjs'
    // import {getQues} from '../apis/topics'
    export default {
        name: "QuestTables",
        components:{
            // dayjs
        },
        data(){
            return{
                flag:false,
                currentPage:1,
                pageSize:5,
                samll:false,
                disabled:false,
                background:false,
            }
        },
        props:{
            dataList:{
                type:Array,
                default:()=>{return []}
        },
        editstatus:{
            type:Boolean,
            default:false
         }

        },
    mounted(){
        // let tableheaders = document.querySelectorAll(".el-table__header-wrapper");
        // for(let i = 0; i< tableheaders.length;i++){
        //     tableheaders[i].style.display="none";
        // }
    },
    methods:{
        dateFormat(row){
            let time = new Date(row.createdate)// row 表示一行数据, createdTime 表示要格式化的字段名称
            if(!time){
                return ''
            }
            let year = time.getFullYear()
            let month = this.dateIfAddZero(time.getMonth()+1)
            let day = this.dateIfAddZero(time.getDate())
            return year + '-' + month + '-' + day+ ' '
        },
        dateIfAddZero(time){
            return time < 10 ? '0'+ time : time
        },
        handleSizeChange (val) {
            console.log(`${val} items per page`)
        },
        handleCurrentChange(val){
            console.log(`current page: ${val}`)
            this.$emit('curPage',val);
        },
        clickTableRow(val){
            if(this.editstatus) {
                this.$router.push({path: '/topiceditor/' + val + "/edit"});
            }else{

                this.$router.push({path: '/topiceditor/' + val+"/read"});
            }
        }
    }
    }
</script>

<style scoped>

</style>