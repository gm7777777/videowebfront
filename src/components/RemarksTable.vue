<template>
    <el-table :data="dataList" style="width:100%;height: 100%;" :show-header="flag" row-style="width:100%">

        <!--<el-table-column prop="address"  fixed="left" min-width="300"/>-->
        <el-table-column prop="level" width="70" fixed="left">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    {{scope.row.index}}楼
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="name"  fixed="left" width="150" />
        <el-table-column prop="th" min-width="300">
            <template #default="scope">
                <el-row style="height:50%">
                    <div style="display: flex; align-items: left;width:50%">
                        IP:{{scope.row.sourceIp}}
                    </div>
                </el-row>
                <el-row>
                    <div style="width:100%;border-bottom:1px solid #ccc;border-top:1px solid #ccc;">
                        标题:{{scope.row.title}}
                    </div>
                </el-row>
                <el-row>
                    <div style="width:100%;height:100%">
                        内容:{{scope.row.address}}
                    </div>
                </el-row>
            </template>
        </el-table-column>

        <el-table-column prop="date"  width="180" fixed="right"/>
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
    }
</script>

<style scoped>

</style>