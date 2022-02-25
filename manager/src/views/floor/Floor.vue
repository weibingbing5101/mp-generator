<template>
  <div class="floor-config">
    <el-table :data="tableData" style="width: 100%" header-cell-class-name="header-cell">
      <el-table-column prop="desc" label="楼层名称" align="center"></el-table-column>
      <el-table-column prop="name" label="楼层描述" align="center"></el-table-column>
      <el-table-column prop="getCfgUrl" label="楼层配置接口" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="handleEditClick(scope.row)" type="text" size="small">修改</el-button> -->
          <el-button @click="handleShowClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <FloorConfigDetail :propRow="rowData" v-model="isFloorConfigDetailShow"></FloorConfigDetail>
  </div>
</template>
<script>
import api from '@/api/api.js';
import FloorConfigDetail from './ConfigDetail.vue';
export default {
  name: 'Floor',
  data() {
    return {
      tableData: [],

      // 查看的数据模板
      rowData: {
        name: ''
      },
      isFloorConfigDetailShow: false,
    }
  },
  components: { FloorConfigDetail },
  created() {
    this.getList();
  },
  methods: {
    // 获取页面 list
    getList() {
      let params = {}
      console.log(params);
      api.getFloorList(params).then((res) => {
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
    handleShowClick(row) {
      Object.assign(this.rowData, row);
      this.isFloorConfigDetailShow = true;
    }
  }
}
</script>
<style scoped lang="scss">
.config-floor {
  height: 100vh;


}
</style>