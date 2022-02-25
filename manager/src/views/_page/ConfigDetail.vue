<template>
  <div class="page-config-details">
    <Modal title="页面配置详情" @close="dialogCancel" v-model="isModalShow" width="800">
      <Form ref="form" :model="form" :label-width="80">
        <Form-item label="页面名称">
          <Input v-model="form.name" readonly></Input>
        </Form-item>
        <Form-item label="页面描述">
          <Input v-model="form.desc" readonly></Input>
        </Form-item>
        <el-table :data="form.floors" style="width: 100%" header-cell-class-name="header-cell">
          <el-table-column prop="name" label="楼层名称" align="center"></el-table-column>
          <el-table-column prop="desc" label="楼层描述" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="showFloorDetail(scope.row)" type="text" size="small">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </Form>
      <span slot="footer" class="dialog-footer">
        <Button @click="dialogCancel">返回</Button>
      </span>
    </Modal>
    <FloorConfigDetail :propRow="rowData" v-model="isFloorConfigDetailShow"></FloorConfigDetail>
  </div>
</template>
<script>
import api from '@/api/api.js';
import FloorConfigDetail from '../floor/ConfigDetail.vue';

export default {
  name: 'PageConfigDetail',
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
      isFloorConfigDetailShow: false,
    }
  },
  watch: {
    // propRow: {
    //   handler: function(val, oldval) {
    //     this.configFormData(val);
    //   },
    //   deep: true //对象内部的属性监听，也叫深度监听
    // },
    isShow: function(value) {
      this.isModalShow = value;
      if (value) {
        this.configFormData();
      }
    }
  },
  components: { FloorConfigDetail },
  created() {},
  methods: {
    // props 数据变化后 配置数据  用于page 详情展示
    configFormData() {
      let row = this.propRow;
      // console.log('页面详情--row', row);
      this.$set(this, 'form', row);
      // console.log('页面详情--form', this.form);
    },
    // 关闭 page 弹窗
    dialogCancel() {
      this.$emit('change', false)
    },

    // 展示楼层弹窗
    showFloorDetail(floorRow) {
      console.log('查看楼层组件详情', floorRow)
      Object.assign(this.rowData, floorRow);
      this.isFloorConfigDetailShow = true;
    },
  }
}
</script>
<style scoped lang="scss">
.config-floor {
  height: 100vh;


}
</style>