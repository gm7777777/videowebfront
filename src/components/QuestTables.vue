<template>
            <el-table :data="dataList" style="width:100%;height: 100%;" :show-header="flag" row-style="width:100%">

                <!--<el-table-column prop="address"  fixed="left" min-width="300"/>-->
                <el-table-column prop="pic" width="200">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-image :src="scope.row.url" fit="contain" @click="clickTableRow(scope.row.id)"/>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="th" min-width="300">
                    <template #default="scope">
                        <div style="width:100%;height:50%" @click="clickTableRow(scope.row.id)">
                            {{scope.row.address}}
                        </div>
                        <el-row style="height:50%" @click="clickTableRow(scope.row.id)">
                        <div style="display: flex; align-items: left;width:50%">
                            IP:{{scope.row.sourceIp}}
                        </div>
                        <div style="display: flex; align-items: left;width:50%">
                            <el-icon><StarFilled /></el-icon>{{scope.row.cnum}}
                        </div>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column prop="date"  width="180" fixed="right"/>
                <el-table-column prop="name"  fixed="right" width="180" />
            </el-table>
    <el-pagination
            v-model:current-page="currentPage3"
            v-model:page-size="pageSize3"
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
    export default {
        name: "QuestTables",
        components:{
            // dayjs
        },
        data(){
            return{
                flag:false,
                currentPage3:5,
                pageSize3:100,
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
        handleSizeChange (val) {
            console.log(`${val} items per page`)
        },
        handleCurrentChange(val){
            console.log(`current page: ${val}`)
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