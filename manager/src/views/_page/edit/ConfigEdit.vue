<template>
  <div class="page-config-edit">
    <Modal title="页面配置编辑" @close="dialogCancel" v-model="isModalShow" width="800">
      <Form ref="form" :model="form" :label-width="80">
        <Form-item label="页面名称">
          <Input v-model="form.name"></Input>
        </Form-item>
        <Form-item label="页面描述">
          <Input v-model="form.desc"></Input>
        </Form-item>
        <el-table :data="form.floors" style="width: 100%" header-cell-class-name="header-cell">
          <el-table-column prop="name" label="楼层名称" align="center"></el-table-column>
          <el-table-column prop="desc" label="楼层描述" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="showFloorEdit(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="showFloorDel(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </Form>
      <span slot="footer" class="dialog-footer">
        <Button @click="dialogCancel">返回</Button>
      </span>
    </Modal>
    <FloorConfigEdit :propRow="rowData" v-model="isFloorConfigEditShow"></FloorConfigEdit>
  </div>
</template>
<script>
import api from '@/api/api.js';
import FloorConfigEdit from './FloorConfigEdit.vue';

export default {
  name: 'PageConfigEdit',
  model: {
    prop: 'isShow',
    event: 'change'
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    propRow: {
      type: Object,
      required: true,
      default () {
        return {
          id: '',
          name: '',
          desc: '',
          priviewImg: '',
          floors: []
        }
      }
    }
  },
  data() {
    return {
      // 页面数据 展示
      form: {
        name: '',
        desc: '',
        priviewImg: '',
        floors: []
      },
      isModalShow: false,

      // 楼层数据详情
      rowData: {
        name: ''
      },
      isFloorConfigEditShow: false,
    }
  },
  watch: {
    isShow: function(value) {
      this.isModalShow = value;
      if (value) {
        this.configFormData();
      }
    }
  },
  components: { FloorConfigEdit },
  created() {},
  methods: {
    // props 数据变化后 配置数据  用于page 详情展示
    configFormData() {
      this.$set(this, 'form', this.propRow);
    },
    // 关闭 page 弹窗
    dialogCancel() {
      this.$emit('change', false)
    },

    // 编辑  楼层弹窗
    showFloorEdit(floorRow) {
      console.log('编辑--楼层组件详情', floorRow)
      Object.assign(this.rowData, floorRow);
      this.isFloorConfigEditShow = true;
    },

    // 删除
    showFloorDel(floorRow) {
      console.log('删除--楼层组件详情', floorRow);
      this.form.floors = this.form.floors.filter((floorItem) => {
        return floorItem.id !== floorRow.id;
      })
      this.$forceUpdate()
      console.log(this.form);

    },
  }
}
</script>
<style scoped lang="scss">
.config-floor {
  height: 100vh;


}
</style>