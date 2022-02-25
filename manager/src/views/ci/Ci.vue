<template>
  <div class="ci">
    <el-button @click="genMP()" type="text" size="small">生成小程序</el-button>
    <el-button @click="previewmp()" type="text" size="small">生成体验版小程序</el-button>
  </div>
</template>
<script>
import api from '@/api/api.js';
export default {
  name: 'Floor',
  data() {
    return {

    }
  },
  methods: {
    genMP() {
      api.genMP().then((res) => {
        if (res.code === '0000') {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      }, (res) => {
        this.$message.error(res.msg);
      })
    },
    previewmp() {
      api.previewmp().then((res) => {
        if (res.code === '0000') {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      }, (res) => {
        this.$message.error(res.msg);
      })
    },
  }
}
</script>