<template>
    <el-row>
    <div style="border-left: 1px solid #ccc;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;width:50%">
        <el-descriptions title="话题内容" style="margin:10px;font-size:larger;" :column="1">
            <el-descriptions-item label="标题" ><el-input v-model="title" placeholder="请输入" style="width:80%" v-if="status=='add'||status=='edit'"/>
                <el-text v-model="title"  style="width:80%" v-if="status=='read'"/>
            </el-descriptions-item>

            <el-descriptions-item label="时间" >
                <!--<el-col :span="8">-->
                <!--<el-countdown format="DD [days] HH:mm:ss" :value="value2">-->
                    <!--<template #title>-->
                        <!--<div style="display: inline-flex; align-items: center">-->
                            <!--<el-icon style="margin-right: 4px" :size="12">-->
                                <!--<Calendar />-->
                            <!--</el-icon>-->
                            <!--Still to go until next month-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</el-countdown>-->
                <el-tag class="countdown-footer" style="width:80%">{{ value2.format('YYYY-MM-DD') }}</el-tag>
            <!--</el-col>-->
            </el-descriptions-item>
            <el-descriptions-item label="板块" >
                <!--<el-col :span="8">-->
                <!--<el-countdown format="DD [days] HH:mm:ss" :value="value2">-->
                <!--<template #title>-->
                <!--<div style="display: inline-flex; align-items: center">-->
                <!--<el-icon style="margin-right: 4px" :size="12">-->
                <!--<Calendar />-->
                <!--</el-icon>-->
                <!--Still to go until next month-->
                <!--</div>-->
                <!--</template>-->
                <!--</el-countdown>-->
                <el-select v-model="selectval" clearable placeholder="选择" style="width:80%">
                    <el-option
                            v-for="item in selectArea"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
                <!--</el-col>-->
            </el-descriptions-item>
        </el-descriptions>
    </div>

    </el-row>
    <el-row>
        <div style="border-right: 1px solid #ccc;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;width:70%;padding:10px;">
            <el-upload
                    v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </div>
    </el-row>

    <el-row>
        <!--<Editor-->
            <!--v-model:isClear="isClear"-->
            <!--@passContent="passContent"-->
            <!--:detailContent="detailContent"-->
            <!--&gt;</Editor>-->
        <Editor :contentHtml="inputContent" v-on:getWangEditorValue="passContent" style="width:100%;padding:10px;"></Editor>
    <!--<Tinymce v-model="inputContent" @change="passContent" width="100%" style="height:300px"/>-->
    </el-row>
    <el-row>

        <el-button type="primary" :icon="Edit" style="float:left;margin-left:20px;margin-bottom: 5px;" @click="submitTopic">提交</el-button>
    </el-row>
    <div class="remarks" v-if="status=='read'||status=='edit'">
        <RemarksTables :dataList="tableData"  ></RemarksTables>
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

        <div style="border: 1px solid #ccc;width:50%;
        border-top-right-radius: 15px;border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;" v-if="status=='read'">
            <el-descriptions title="回答话题" style="margin:10px;font-size:larger;" :column="1" >
                <el-descriptions-item label="标题" ><el-input v-model="anstitle" placeholder="请输入" style="width:80%"/>
                </el-descriptions-item>

                <el-descriptions-item label="时间" >
                    <el-tag class="countdown-footer" style="width:80%">{{ value2.format('YYYY-MM-DD') }}</el-tag>
                    <!--</el-col>-->
                </el-descriptions-item>
            </el-descriptions>

            <Editor :contentHtml="anscontent" v-on:getWangEditorValue="ansPassContent" style="width:100%;padding:10px;"></Editor>
            <el-row>

                <el-button type="primary" :icon="Edit" style="float:left;margin-left:20px;margin-bottom: 5px;" @click="submitAnswer">提交</el-button>
            </el-row>
        </div>

    </div>

</template>

<script>
    // import '../../wangeditor/editor/dist/css/style.css' // 引入 css
    import dayjs from 'dayjs';
    // import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
    // import { Editor, Toolbar } from '../../wangeditor/editor-for-vue'
    // import type { UploadProps, UploadUserFile } from 'element-plus'
    import Editor from "../components/Editor.vue";
    // import tinymce from 'tinymce/tinymce';
    import RemarksTables from "../components/RemarksTable.vue";
    export default {
        name: "TopicEditor",
        components: {Editor,RemarksTables},
        props: {
            status:{
                type:Boolean,
                default:false
            },
            // readStatus:{
            //     type:Boolean,
            //     default:false
            // },
        },
        data(){
            return {
                anstitle:"",
                anscontent:"",
                selectval:"",
                selectArea:[
                    {label:"大数据",value:"0"},
                    {label:"云计算",value:"0"},
                    {label:"其他",value:"0"},
                ],
                tableData:[
                    {
                        date: '2016-05-03',
                        name: 'Tom',
                        title:"12312312",
                        address: 'No. 189, Grove St, Los Angeles',
                        url:"src/assets/images/about/f02.jpg",
                        index:10,
                        sourceIp:"202.198.245,98"
                    },
                    {
                        date: '2016-05-02',
                        name: 'Tom',
                        title:"12312312",
                        address: 'No. 189, Grove St, Los Angeles',
                        url:"src/assets/images/about/f02.jpg",
                        index:10,
                        sourceIp:"202.198.245,98"
                    },
                    {
                        date: '2016-05-04',
                        name: 'Tom',
                        title:"12312312",
                        address: 'No. 189, Grove St, Los Angeles',
                        url:"src/assets/images/about/f02.jpg",
                        index:10,
                        sourceIp:"202.198.245,98"
                    },
                    {
                        date: '2016-05-01',
                        name: 'Tom',
                        title:"12312312",
                        address: 'No. 189, Grove St, Los Angeles',
                        url:"src/assets/images/about/f02.jpg",
                        index:10,
                        sourceIp:"202.198.245,98"
                    },],
                inputContent:'',
            isClear :false,
                title:'',

                currentPage3:5,
                pageSize3:100,
                samll:false,
                disabled:false,
                background:false,

                loading:false,
                // addStatus:false,
                // editStatus:false,
                // readStatus:false,
                // value1:Date.now(),
                value2:dayjs().add(0, 'month').startOf('month'),
                // value2:new Date().toDateString()
                fileList :[
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    },
                    {
                        name: 'plant-1.png',
                        url: 'src/assets/images/about/f02.jpg',
                    },
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    },
                    {
                        name: 'plant-2.png',
                        url: 'src/assets/images/about/f02.jpg',
                    },
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    },
                    {
                        name: 'figure-1.png',
                        url: 'src/assets/images/about/f02.jpg',
                    },
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    },
                    {
                        name: 'figure-2.png',
                        url: 'src/assets/images/about/f02.jpg',
                    },
                ],
                dialogImageUrl :'',
                dialogVisible :false,
            };
        },
        methods:{
            handleRemove(uploadFile, uploadFiles){
        console.log(uploadFile, uploadFiles);
    },

        handlePictureCardPreview(uploadFile){
        this.dialogImageUrl = uploadFile.url;
            this.dialogVisible = true;
        }
        },
        passContent(value){
        this.inputContent = value;
        },
        ansPassContent(value){
            this.anscontent = value;
        },
        handleSizeChange (val) {
            console.log(`${val} items per page`)
        },
        handleCurrentChange(val){
            console.log(`current page: ${val}`)
        },
        submitTopic(val){
            console.log(`current page: ${val}`)
        },
        submitAnswer(val){
            console.log(`current page: ${val}`)
        }
    }
</script>

<style scoped>
    .remarks{
        border-right: 1px solid #ccc;
        padding:10px;
        width:100%;
        height:100%;
    }
</style>