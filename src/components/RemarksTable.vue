<template>
    <el-table :data="dataList" style="width:100%;height: 100%;border:1px solid #ccc;" :show-header="flag" row-style="width:100%">

        <!--<el-table-column prop="address"  fixed="left" min-width="300"/>-->
        <el-table-column type="index" width="30" fixed="left" />

        <el-table-column prop="level" width="40" fixed="left" >
            <template #default="scope">
                <div style="display: flex; align-items: center;border-bottom:1px solid black">
                    楼
                </div>
            </template>
        </el-table-column>
        <!--<el-table-column prop="name"  fixed="left" width="150" />-->
        <el-table-column prop="th" min-width="300">
            <template #default="scope">
                <el-row style="height:50%">
                    <div style="display: flex; align-items: left;width:50%">
                        IP:{{scope.row.sourceip}}
                    </div>
                </el-row>
                <el-row>
                    <div style="width:100%;border-bottom:1px solid #ccc;border-top:1px solid #ccc;">
                        标题:{{scope.row.title}}
                    </div>
                </el-row>
                <el-row>
                    <p style="display:inline-flex;align-items: left;">内容:</p>
                    <div style="display: inline-flex;align-items: left;width:90%;height:100%" v-html="scope.row.content">
                    </div>
                </el-row>
            </template>
        </el-table-column>

        <el-table-column prop="createdate" :formatter="dateFormat"  width="180" fixed="right" />
        <el-table-column prop="author"  fixed="right" width="180"/>
    </el-table>

</template>

<script>
    export default {
        name: "RemarksTable",
        props:{
            dataList:{
                type:Array,
                default:()=>{return []}
        }
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
    }
    }
</script>

<style scoped>

</style>