<template>
    <el-row>
    <div style="border-left: 1px solid #ccc;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;width:50%">
        <el-descriptions title="案例内容" style="margin:10px;font-size:larger;" :column="1">
            <el-descriptions-item label="代码" >
                <el-input v-model="code" placeholder="请输入" style="width:80%"/>

            </el-descriptions-item>
            <el-descriptions-item label="标题" >
                <el-input v-model="title" placeholder="请输入" style="width:80%"/>
            </el-descriptions-item>

            <el-descriptions-item label="板块" >
                <el-select v-model="selectedVal" clearable placeholder="选择" style="width:80%">
                    <el-option
                            v-for="item in selectArea"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
            </el-descriptions-item>

            <el-descriptions-item label="内容" >
                <Editor :contentHtml="inputContent" v-on:getWangEditorValue="passContent" style="width:100%;padding:10px;"></Editor>
            </el-descriptions-item>

            <el-descriptions-item label="备注" >
                <el-input v-model="remark" placeholder="请输入" style="width:80%"/>
            </el-descriptions-item>

            <el-descriptions-item label="视频后缀" >
                <el-input v-model="videolink" placeholder="请输入" style="width:80%"/>
            </el-descriptions-item>

            <el-descriptions-item label="照片" >
                <el-upload
                        v-model:file-list="fileList"
                        action="http://192.168.0.131:5007/File/uploadImg"
                        header="headers"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="successUpload"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-descriptions-item>

            <el-descriptions-item label="日期" >
            <el-date-picker
                    v-model="pickdate"
                    type="date"
                    placeholder="Pick a day"
                    :size="default"
            />
            </el-descriptions-item>

        </el-descriptions>
    </div>

    </el-row>

    <el-row>

        <el-button type="primary" :icon="Edit" style="float:left;margin-left:20px;margin-bottom: 5px;" @click="submitCase">提交</el-button>
    </el-row>



</template>

<script>
    // import '../../wangeditor/editor/dist/css/style.css' // 引入 css
    // import dayjs from 'dayjs';
    // import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
    // import { Editor, Toolbar } from '../../wangeditor/editor-for-vue'
    // import type { UploadProps, UploadUserFile } from 'element-plus'
    import Editor from "../components/Editor.vue";
    // import { UploadFilled } from '@element-plus/icons-vue'
    // import tinymce from 'tinymce/tinymce';
    import RemarksTables from "../components/RemarksTable.vue";

    import {addQues} from '../apis/topics';
    import {getSectors} from "../apis/sector";
    import {files} from "../apis/files";
    import { localGet } from '../utils';
    import {add} from "../apis/cases";
    import { ElMessage } from 'element-plus'

    export default {
        name: "CaseEditor",
        components: {Editor, RemarksTables},
        props: {
        },
        mounted() {
            this.loadSector();
            if("119618949@qq.com"!=localGet("user")){
                window.location.href = '/'
            }
        },
        data() {
            return {
                headers:{"Content-Type":"multipart/form-data"},
                remark:"",
                videolink:"",
                pickdate:"",
                code:'',
                selectedVal: "",
                // selectArea:[
                //     {label:"大数据",value:"0"},
                //     {label:"云计算",value:"0"},
                //     {label:"其他",value:"0"},
                // ],
                selectArea: [],

                inputContent: '',

                title: '',
                fileList:[],
                fileListTemp: [
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
                dialogImageUrl: '',
                dialogVisible: false,
            };
        },
        methods: {
            async loadSector(){
        getSectors({}).then(
            (res) => {
            // console.log(res.data)
            if(res.code == 200){
            // this.sectors = res.data;
            for (var i = 0; i < res.data.length; i++) {
                this.selectArea.push({label: res.data[i].title, value: res.data[i].code});
            }
            // console.log(this.user)
            }else{
            ElMessage({
                message: res.message,
                type: 'warning',
            })
            }
        })
        },
    removeFile(fid){
        remove({
            ctxBody:{
                id:fid
            }
        }).then(
            (res) => {
            // console.log(res.data)
            if(res.code == 200){
            // this.sectors = res.data;
            // console.log(this.user)
        }else{
            ElMessage({
                message: res.message,
                type: 'warning',
            })
        }
    }
    )
    },
    handleRemove(uploadFile, uploadFiles){
        console.log(uploadFile, uploadFiles);
        for(let i=0;i<this.fileList.length;i++){
            if(this.fileList[i].name==uploadFile.name){
                let fid = this.fileList[i].id;
                this.fileList.splice(i,1);
                this.removeFile(fid);
            }
        }
    },
    handlePictureCardPreview(uploadFile){
        this.dialogImageUrl = uploadFile.url;
        this.dialogVisible = true;
    },
    successUpload(res,updfile){
        // console.log(res, updfile);
        this.fileList[this.fileList.length-1].id=res.data.id;
        this.fileList[this.fileList.length-1].url=res.data.url+updfile.name;
    },
    passContent(value){
        this.inputContent = value;
    },
    handleSizeChange(val){
        console.log(`${val} items per page`)
    },
    handleCurrentChange(val){
        console.log(`current page: ${val}`)
    },
    submitCase(val){
        add({
            ctxBody:{
                code:this.code,
                title:this.title,
                projectTime:this.pickdate,
            user:localGet('user'),
            content:this.inputContent,
            piclink:this.fileList[0].url,
                remark:this.remark,
                video:this.videolink,
                sector:this.selectedVal
        }}).then(
            (res) => {
            // console.log(res.data)
            if (res.code == 200&&res.status==0) {
            // this.sectors = res.data;
            // console.log(this.user)
            ElMessage({
                message: res.message,
                type: 'success',
            })
            } else {
            ElMessage({
                message: res.message,
                type: 'warning',
            })
            }
        }
        )
    },
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