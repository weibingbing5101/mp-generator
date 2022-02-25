<template>
  <div class="floor-config-details">
    <Modal title="查看楼层详情" @close="dialogCancel" v-model="isModalShow" @on-cancel="dialogCancel">
      <Form ref="detalData" :label-width="110" label-position="left">
        <Form-item label="楼层名称">
          <Input v-model="detalData.name" placeholder="" readonly></Input>
        </Form-item>
        <Form-item label="楼层描述">
          <Input v-model="detalData.desc" placeholder="" readonly></Input>
        </Form-item>
        <Form-item label="楼层配置接口">
          <Input v-model="detalData.getCfgUrl" placeholder="" readonly></Input>
        </Form-item>
        <Form-item label="预览图片">
          <img :src="detalData.priviewImg" alt="">
        </Form-item>
        <!--  -->
        <!--  -->
        <!--  -->
        <Row>
          属性配置
        </Row>
        <div class="attrCfg" v-if="detalData.attrCfg && detalData.attrCfg.length">
          <Form-item :label="item.label" v-for="item in detalData.attrCfg">
            <!--  -->
            <!--  -->
            <!--  -->
            <Input v-if="item.formTagType === 'Input'" v-model="item.value" readonly></Input>
            <!--  -->
            <!--  -->
            <!--  -->
            <Select v-if="item.formTagType === 'Select-S'" v-model="item.value" disabled>
              <Option v-for="optItem in item.options" :value="optItem.value">{{ optItem.label }}</Option>
            </Select>
            <!--  -->
            <!--  -->
            <!--  -->
            <InputNumber v-if="item.formTagType === 'InputNumber'" v-model="item.value" readonly></InputNumber>
          </Form-item>
        </div>
      </Form>
      <span slot="footer" class="dialog-footer">
        <Button @click="dialogCancel">返回</Button>
        <!-- <Button type="primary" @click="dialogSubmit">确 定</Button> -->
        <!-- v-model="item.mpDataKey" -->
        <!-- <RadioGroup :value="item.value" v-if="item.formTagType === 'Radio'">
              <Radio :label="optItem.value" v-for="optItem in item.options" disabled>{{optItem.label}}</Radio>
            </RadioGroup> -->
      </span>
    </Modal>
  </div>
</template>
<script>
import api from '@/api/api.js';

export default {
  name: 'FloorConfigDetail',
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
          name: '',
          desc: '',
          priviewImg: '',
          propCfg: [],
          attrCfg: []
        }
      }
    }
  },
  data() {
    return {
      // 查看的数据模板
      detalData: {
        name: ''
      },
      isModalShow: false,
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
  components: {},
  created() {},
  methods: {
    configFormData() {
      let row = this.propRow;
      this.$set(this, 'detalData', row);
      console.log('楼层详情--detalData', this.detalData);
    },
    // 
    dialogCancel() {
      this.$emit('change', false)
    }
  }
}
</script>
<style scoped lang="scss">
.config-floor {
  height: 100vh;


}
</style>