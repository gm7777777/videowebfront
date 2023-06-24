<template>
  <div style="display:flex">
    <div class="left-intro">
      <label style="width:100%;padding-top:10px">书籍导航</label>
      <!--<el-input placeholder="查询" v-model="filterText"> </el-input>-->
      <!--<el-tree-->
              <!--:data="treedata"-->
              <!--:props="defaultProps"-->
              <!--default-expand-all-->
              <!--node-key="id"-->
              <!--ref="tree"-->
              <!--class="filter-tree"-->
              <!--:filter-node-method="filterNode"-->
              <!--@node-click="handleNodeClick"-->
              <!--style="background:transparent;"-->
      <!--&gt;</el-tree>-->
      <el-input placeholder="查询" v-model="filterText"> </el-input>

      <el-tree
              class="filter-tree"
              :data="data"
              :props="defaultProps"
              :filter-node-method="filterNode"
              ref="tree"
              node-key="id"
              @node-click="handleNodeClick"
              style="background:transparent;"
      >
      </el-tree>
    </div>
    <!--<PdfViewer :url="pdfUrl"></PdfViewer>-->
    <!--<pdf :url="pdfUrl" :type="'canvas'" :pdfjsDistPath="'/static'" />-->
    <!--<DocumentViewer :src="fileUrl" style="height:1000px"></DocumentViewer>-->
    <!--<pdf  style="width:75%"-->
            <!--ref="pdf"-->
            <!--:src="pdfurl"-->
    <!--&gt;-->
    <!--</pdf>-->
    <!--<PdfViewer-->
            <!--page-scale="page-fit"-->
            <!--:width="800"-->
            <!--:height="700"-->
            <!--theme="dark"-->
            <!--:src="pdfUrl"-->
            <!--@loaded="onLoaded" />-->
    <PdfViewer
            page-scale="page-fit"
            :width="1000"
            :height="800"
            theme="dark"
            :src="pdfUrl"/>
  </div>

</template>

<script>
    // import DocumentViewer from '../components/DocumentViewer.vue';
    import {docs} from '../apis/readerdoc';
    import { localGet } from '../utils';


    import PdfViewer from '../components/PdfViewer.vue'
    // import pdf from "../components/PDF/pdf";
    // import PDF from 'pdfjs-dist'
    // PDF.disableWorker = true
export default {
  name: 'OnlineBooks',
    components: {
        // DocumentViewer,pdf,
        // pdf
        PdfViewer

    },
    mounted(){
      this.loadData();
      // this.loadFile(this.pdfUrl);
        if(null==localGet("user")){
            this.pdfUrl='http://localhost:5007/docs/Login.pdf';
        }

    },
    methods: {
      async loadData(){
        docs({ctxBody:{
            user:localGet('user'),

            }}).then(
            (res) => {
            // console.log(res.data)
            if(res.code == 200){
            // this.sectors = res.data;
            this.data = res.data;
            // console.log(this.user)
        }else{
            ElMessage({
                message: res.message,
                type: 'warning',
            })
        }
    })
    },
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        handleNodeClick(data) {
            if(data['children'] == null){
                this.pdfUrl = data['data'];
            }

        }

    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        },
    },
    data(){
        return {
            pdfUrl:'http://localhost:5007/docs/Empty.pdf',
            filterText: '',
            data:[],
            datatemp: [
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
                                    data: "https://view.xdocin.com/demo/view.docx",
                                },
                                {
                                    id: 10,
                                    label: 'Linux内核设计与实现原书第三版',
                                    data:"src/assets/book/Linux内核设计与实现原书第三版.pdf",
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
                id:'id',
                data:'data',
                children: 'children',
                label: 'label',
            },
            // fileUrl: "https://view.xdocin.com/demo/view.docx",
        }
    }
}
</script>

<style scoped>

  .left-intro{
    position: relative;
    width:25%;
    border-right: 2px solid slategray;
    text-align:center;
  }

</style>
