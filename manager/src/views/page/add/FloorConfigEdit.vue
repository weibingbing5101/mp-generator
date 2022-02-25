<template>
  <div class="floor-config-edit">
    <Modal title="楼层配置" @close="dialogCancel" v-model="isModalShow" @on-cancel="dialogCancel">
      <Form ref="form" :label-width="110" label-position="left">
        <Form-item label="楼层名称">
          <Input v-model="detalData.name" placeholder=""></Input>
        </Form-item>
        <Form-item label="楼层描述">
          <Input v-model="detalData.desc" placeholder=""></Input>
        </Form-item>
        <Form-item label="楼层配置接口">
          <Input v-model="detalData.getCfgUrl" placeholder=""></Input>
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
            <Input v-if="item.formTagType === 'Input'" v-model="item.value" @on-change="itemsChange"></Input>
            <!--  -->
            <Select v-if="item.formTagType === 'Select-S'" v-model="item.value" @on-change="itemsChange">
              <Option v-for="optItem in item.options" :value="optItem.value">{{ optItem.label }}</Option>
            </Select>
            <!--  -->
            <InputNumber v-if="item.formTagType === 'InputNumber'" v-model="item.value" @on-change="itemsChange"></InputNumber>
          </Form-item>
        </div>
      </Form>
      <span slot="footer" class="dialog-footer">
        <Button @click="dialogCancel">返回</Button>
        <Button type="primary" @click="dialogSubmit">确 定</Button>
        <!-- v-model="item.mpDataKey" -->
        <!-- <RadioGroup :value="item.value" v-if="item.formTagType === 'Radio'" @on-change="itemsChange(item.mpDataKey)">
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
    editCbFn: {
      type: Function,
      default: (floorData) => {
        console.log(floorData);
      }
    },
    propRow: {
      type: Object,
      required: true,
      default () {
        return {
          name: '',
          desc: '',
          getCfgUrl: '',
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
    itemsChange() {
      console.log('itemsChange', this.detalData)
    },
    // 配置数据
    configFormData() {
      console.log('楼层编辑---props', this.propRow);


      let row = JSON.parse(JSON.stringify(this.propRow));
      this.$set(this, 'detalData', row);
      console.log('楼层编辑--组件data数据', this.detalData);
    },
    // 
    dialogCancel() {
      this.$refs.form.resetFields();
      this.$emit('change', false)
    },
    // 提交修改数据 给父级组件
    dialogSubmit() {
      console.log('编辑以后的数据', this.detalData);
      console.log('props源数据', this.propRow);

      let resultData = JSON.parse(JSON.stringify(this.detalData))
      this.editCbFn && this.editCbFn(resultData);
      this.dialogCancel();
    },
  }
}
</script>
<style scoped lang="scss">
.config-floor {
  height: 100vh;


}
</style>