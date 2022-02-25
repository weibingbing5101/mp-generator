<template>
  <div class="page-config">
    <el-row style="text-align: left;">
      <el-button type="primary" @click="addPage">添加页面</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%" header-cell-class-name="header-cell">
      <el-table-column prop="name" label="页面名称" align="center"></el-table-column>
      <el-table-column prop="desc" label="页面描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleEditClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleShowClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加 页面 -->
    <Modal title="新增页面" @close="addPageCancel" v-model="addPageVisible">
      <Form ref="form" :model="form" :rules="rules">
        <Form-item label="页面名称" prop="name">
          <Input v-model="form.name" placeholder="请输入页面名称，用于生成文件、className等"></Input>
        </Form-item>
        <Form-item label="页面描述" prop="desc">
          <Input v-model="form.desc" placeholder="请输入页面中文描述"></Input>
        </Form-item>
      </Form>
      <span slot="footer" class="dialog-footer">
        <Button @click="addPageCancel">取 消</Button>
        <Button type="primary" @click="addPageSubmit">确 定</Button>
      </span>
    </Modal>
    <!-- 编辑页面 -->
    <PageConfigEdit :propRow="editRowData" v-model="isPageConfigEditShow"></PageConfigEdit>
    <!--  -->
    <!--  -->
    <!--  -->
    <!-- 页面配置详情 -->
    <PageConfigDetail :propRow="detailRowData" v-model="isPageConfigDetailShow"></PageConfigDetail>
    <!--  -->
    <!--  -->
    <!--  -->
    <!-- <FloorConfigDetail :propRow="detailRowData" v-model="isFloorConfigDetailShow"></FloorConfigDetail> -->
    <!--  <Modal title="页面配置详情" @close="detailPageCancel" v-model="isFloorConfigDetailShow" center class="white-list-dialog-box" :close-on-click-modal="false" :close-on-press-escape="false">
      <Form ref="detailRowData" :model="detailRowData" :label-width="80">
        <Form-item label="页面名称">
          <Input v-model="detailRowData.name" readonly></Input>
        </Form-item>
        <Form-item label="页面描述">
          <Input v-model="detailRowData.desc" readonly></Input>
        </Form-item>
        楼层预览,可删除编辑 <br>
        展示所有楼层组件，添加组件，编辑要添加组件的cfg(如跳转，按钮文案，title等) <br>
      </Form>
      <span slot="footer" class="dialog-footer">
        <Button @click="detailPageCancel">返回</Button>
      </span>
    </Modal> -->
  </div>
</template>
<script>
import api from '@/api/api.js';
import PageConfigDetail from './ConfigDetail.vue';
import PageConfigEdit from './edit/ConfigEdit.vue';
export default {
  name: 'Home',
  data() {
    return {
      // 表格
      tableData: [],

      // 添加页面
      addPageVisible: false,
      form: {
        name: '',
        desc: '',
      },
      rules: {
        name: {
          validator: (rule, value, callback) => {
            if (value) {
              callback();
            } else {
              callback('请输入name');
            }
          },
          trigger: 'blur'
        },
        desc: {
          validator: (rule, value, callback) => {
            if (value) {
              callback();
            } else {
              callback('请输入中文描述');
            }
          },
          trigger: 'blur'
        },
      },



      // 详情 弹窗
      isPageConfigDetailShow: false,
      detailRowData: {
        name: ''
      },


      // 编辑
      isPageConfigEditShow: false,
      editRowData: {
        name: ''
      },

    }
  },
  components: { PageConfigDetail, PageConfigEdit },
  created() {
    this.getList();
  },
  methods: {
    // 获取页面 list
    getList() {
      let params = {}
      console.log(params);
      api.getPageList(params).then((res) => {
        if (res.code === '0000') {
          if (res.data && res.data) {
            this.tableData = res.data;
          }
        } else {
          this.$message.error(res.msg);
        }
      }, (res) => {
        this.$message.error(res.msg);
      })
    },

    // 新增  弹窗展示
    addPage() {
      this.addPageVisible = true;
    },
    // 新增 弹窗隐藏
    addPageCancel() {
      this.addPageVisible = false;
      this.$refs.form.resetFields();
    },
    // 新增 编辑 提交事件
    addPageSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(this.form)
        if (valid) {
          let form = this.form;
          let params = {
            name: form.name,
            desc: form.desc
          };

          api.addPage(params).then((res) => {
            if (res.code === '0000') {
              this.getList();
              this.$message.success(res.msg);
              this.addPageCancel();
            } else {
              this.$message.error(res.msg);
            }
          }, (res) => {
            this.$message.error(res.msg);
          });
          /*
          if (this.titleType === 'add') {
            api.addPage(params).then((res) => {
              if (res.code === '0000') {
                this.getList();
                this.$message.success(res.msg);
                this.addPageCancel();
              } else {
                this.$message.error(res.msg);
              }
            }, (res) => {
              this.$message.error(res.msg);
            });
          } else if (this.titleType === 'edit') {
            params.id = form.id;
            api.editPage(params).then((res) => {
              if (res.code === '0000') {
                this.getList();
                this.$message.success(res.msg);
                this.addPageCancel();
              } else {
                this.$message.error(res.msg);
              }
            }, (res) => {
              this.$message.error(res.msg);
            });
          }
          */
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },




    // 编辑  弹窗展示
    handleEditClick(row) {
      console.log('编辑', row);
      Object.assign(this.editRowData, row);
      this.isPageConfigEditShow = true;
    },


    // 详情 弹窗展示
    handleShowClick(row) {
      console.log('详情', row);
      Object.assign(this.detailRowData, row);
      this.isPageConfigDetailShow = true;
    }
  }
}
</script>
<style scoped lang="scss">
.config-page {
  height: 100vh;

  .qrcode {
    font-size: 40px;
    background: #ccc;
    width: 200px;
    height: 200px;
  }
}
</style>