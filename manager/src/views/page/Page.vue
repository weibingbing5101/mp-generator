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
          <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑页面</el-button>
          <!-- <el-button @click="handleShowClick(scope.row)" type="text" size="small">查看详情</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from '@/api/api.js';
export default {
  name: 'Home',
  data() {
    return {
      // 表格
      tableData: [],
    }
  },
  components: {},
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

    // 新增  
    addPage() {
      this.$router.push({
        name: 'PageAdd'
      })
    },


    // 编辑  
    handleEditClick(row) {
      this.$router.push({
        name: 'PageAdd',
        query: {
          pageid: row.id
        }
      })
    },


    // 详情 
    handleShowClick(row) {
      console.log('详情', row);
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