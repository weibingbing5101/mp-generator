<template>
  <div class="page-add-config">
    <Form ref="form" :model="form" :rules="rules" style="width: 700px;" :labelWidth="100">
      <Form-item label="页面名称" prop="name">
        <Input v-model="form.name" placeholder="请输入页面名称，用于生成文件、className等"></Input>
      </Form-item>
      <Form-item label="页面描述" prop="desc">
        <Input v-model="form.desc" placeholder="请输入页面中文描述"></Input>
      </Form-item>
      <Form-item label="添加楼层" prop="selFloorId">
        <Select v-model="form.selFloorId" style="width: 200px;">
          <Option v-for="item in floorsList" :value="item.id" :key="'seleFloor-'+item.id">{{ item.desc }}</Option>
        </Select>
        <Button @click="addCfgFloor">添加配置楼层</Button>
      </Form-item>
      <!-- 页面中所有的楼层list -->
      <Table :columns="columns" :data="form.floors"></Table>
      <br>
      <!-- 页面中所有的楼层list -->
      <!-- 页面中所有的楼层list -->
    </Form>
    <Button @click="addPageCancel" style="margin-right: 10px;">取 消</Button>
    <Button type="primary" @click="addPageSubmit">确 定</Button>
    <!--  -->
    <!--  -->
    <!--  -->
    <!--  -->
    <!-- 楼层配置弹窗 -->
    <FloorConfigEdit :propRow="curFloorObj" v-model="isFloorConfigEditShow" :editCbFn="editCbFn"></FloorConfigEdit>
  </div>
</template>
<script>
import api from '@/api/api.js';
import FloorConfigEdit from './FloorConfigEdit.vue';
export default {
  name: 'pageadd',
  data() {
    return {
      floorsList: [],
      // 添加页面
      form: {
        name: '',
        desc: '',
        floors: []
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

      columns: [{
        title: '楼层名称',
        key: 'name'
      }, {
        title: '楼层描述',
        key: 'desc'
      }, {
        title: '操作',
        width: 150,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.editFloor(params)
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.delFloor(params)
                }
              }
            }, '删除')
          ]);
        }
      }],

      // 配置楼层
      curFloorObj: {}, // 当前编辑的楼层
      isFloorConfigEditShow: false,

    }
  },
  components: { FloorConfigEdit },
  created() {
    this.getFloorList();
    if (this.$route.query.pageid) {
      this.getPageDetail();
    }
  },
  methods: {
    //                                            配置楼层相关
    // 添加   弹窗显示
    addCfgFloor() {
      if (!this.form.selFloorId) {
        this.$message.error('请先选择楼层');
        return false;
      }
      this.floorsList.map((flrItem) => {
        if (this.form.selFloorId === flrItem.id) {
          this.curFloorObj = JSON.parse(JSON.stringify(flrItem));
        }
      })
      delete this.curFloorObj.id
      this.floorType = 'add';
      console.log('将要配置的楼层为---', this.curFloorObj);
      this.isFloorConfigEditShow = true;
    },

    // 编辑                                          
    editFloor(floorRow) {
      console.log('编辑--楼层组件详情', floorRow);
      this.floorType = 'edit';
      this.curFloorObj = floorRow.row;
      this.curFloorObj.index = floorRow.index;
      this.isFloorConfigEditShow = true;
    },
    // 删除
    delFloor(floorRow) {
      console.log('删除--楼层组件详情', floorRow);
      this.form.floors = this.form.floors.filter((floorItem, index) => {
        return index !== floorRow.index;
      })
      this.$forceUpdate();
      console.log('删除后，楼层表单----', this.form);
    },

    // 编辑  添加  后的回调
    editCbFn(floorData) {
      if (this.floorType === 'add') {
        this.form.floors.push(floorData);

      } else if (this.floorType === 'edit') {
        this.$set(this.form.floors, this.curFloorObj.index, floorData)
      }
      // this.$forceUpdate();
      // console.log('-------', floorData);
    },







    // 获取楼层list
    getFloorList() {
      let params = {}
      api.getFloorList(params).then((res) => {
        if (res.code === '0000') {
          if (res.data && res.data) {
            this.floorsList = res.data;
          }
        } else {
          this.$message.error(res.msg);
        }
      }, (res) => {
        this.$message.error(res.msg);
      })
    },
    // 获取 页面数据详情
    getPageDetail() {
      let params = {
        id: this.$route.query.pageid
      }
      api.detailPage(params).then((res) => {
        if (res.code === '0000') {
          if (res.data && res.data) {
            this.$set(this, 'form', res.data);
          }
        } else {
          this.$message.error(res.msg);
        }
      }, (res) => {
        this.$message.error(res.msg);
      })
    },


    //                                          页面总提交
    addPageCancel() {
      this.$refs.form.resetFields();
    },
    // 新增 提交事件
    addPageSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(this.form)
        if (!valid) {
          console.log('error submit!!');
          return false;
        }

        let form = this.form;
        let params = {
          "name": form.name,
          "desc": form.desc,
          "floors": form.floors
        }

        if (this.$route.query.pageid) {
          params.id = this.$route.query.pageid;
          api.editPage(params).then((res) => {
            if (res.code === '0000') {
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          }, (res) => {
            this.$message.error(res.msg);
          });
        } else {
          api.addPage(params).then((res) => {
            if (res.code === '0000') {
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          }, (res) => {
            this.$message.error(res.msg);
          });
        }
        // 
      });
    }
  }
}
</script>
<style scoped lang="scss">
.page-add-config {
  padding: 24px;
  text-align: left;
  height: 100vh;
}
</style>