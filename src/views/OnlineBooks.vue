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
              default-expand-all
              :filter-node-method="filterNode"
              ref="tree"
              node-key="id"
              @node-click="handleNodeClick"
              style="background:transparent;"
      >
      </el-tree>
    </div>
    <DocumentViewer :src="fileUrl" style="height:1000px"></DocumentViewer>
    <!--<pdf  style="width:75%"-->
            <!--ref="pdf"-->
            <!--:src="pdfurl"-->
    <!--&gt;-->
    <!--</pdf>-->
  </div>

</template>

<script>
    import DocumentViewer from '../components/DocumentViewer.vue'
export default {
  name: 'OnlineBooks',
    components: {
        DocumentViewer,
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        handleNodeClick(data) {
            if(data['children'] == null){
                this.fileUrl = data['url'];
            }

        },
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        },
    },
    data() {
        return {
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
            fileUrl: "https://view.xdocin.com/demo/view.docx",
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
