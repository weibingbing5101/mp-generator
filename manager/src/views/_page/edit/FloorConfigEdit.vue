<template>
  <div class="floor-config-edit">
    <Modal title="查看楼层详情" @close="dialogCancel" v-model="isModalShow" @on-cancel="dialogCancel">
      <Form ref="form" :label-width="110" label-position="left">
        <Form-item label="楼层名称">
          <Input v-model="form.name" placeholder=""></Input>
        </Form-item>
        <Form-item label="楼层描述">
          <Input v-model="form.desc" placeholder=""></Input>
        </Form-item>
        <Form-item label="预览图片">
          <img :src="form.priviewImg" alt="">
        </Form-item>
        <!--  -->
        <!--  -->
        <!--  -->
        <div class="propCfg" v-if="detalData.propCfg && detalData.propCfg.length">
          <Row>
            入参配置
          </Row>
          <!--  <Form-item :label="item.label" v-for="item in detalData.propCfg">
            <Input v-model="item.name"></Input>
          </Form-item> -->
        </div>
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
            <!-- <Input v-if="item.formTagType === 'Input'" v-model="form[item.mpDataKey]" @on-change="itemsChange">form[item.mpDataKey]</Input> -->
            <!-- <Input v-if="item.formTagType === 'Input'" v-model="item.value" @on-change="itemsChange">form[item.mpDataKey]</Input> -->
            <Input v-if="item.formTagType === 'Input'" v-model="form[item.mpDataKey]" @on-change="itemsChange">form[item.mpDataKey]</Input>
            <!--  -->
            <!--  -->
            <!--  -->
            <!-- <Select v-if="item.formTagType === 'Select-S'" v-model="form[item.mpDataKey]" @on-change="itemsChange"> -->
            <!-- <Select v-if="item.formTagType === 'Select-S'" v-model="item.value" @on-change="itemsChange"> -->
            <Select v-if="item.formTagType === 'Select-S'" v-model="form[item.mpDataKey]" @on-change="itemsChange">
              <Option v-for="optItem in item.options" :value="optItem.value">{{ optItem.label }}</Option>
            </Select>
            <!--  -->
            <!--  -->
            <!--  -->
            <!-- <InputNumber v-if="item.formTagType === 'InputNumber'" v-model="form[item.mpDataKey]" @on-change="itemsChange">form[item.mpDataKey]</InputNumber> -->
            <!-- <InputNumber v-if="item.formTagType === 'InputNumber'" v-model="item.value" @on-change="itemsChange">form[item.mpDataKey]</InputNumber> -->
            <InputNumber v-if="item.formTagType === 'InputNumber'" v-model="form[item.mpDataKey]" @on-change="itemsChange"></InputNumber>
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

      // 用于编辑的form变量
      form: {
        name: ''
      }
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
  components: {},
  created() {},
  methods: {
    itemsChange() {
      console.log('itemsChange', this.detalData)
    },
    // 配置数据
    configFormData() {
      // console.log('楼层编辑源数据---', this.propRow);
      this.$set(this, 'detalData', this.propRow);

      let row = this.propRow;
      this.form = {
        desc: row.desc,
        id: row.id,
        name: row.name,
        priviewImg: row.priviewImg,
      }

      row.attrCfg.map((attritem) => {
        this.form[attritem.mpDataKey] = attritem.value;
      })

      console.log('楼层数据，配置后的 ---detalData', this.detalData);
      console.log('楼层数据，配置后的 ---form', this.form);
    },
    // 
    dialogCancel() {
      this.$refs.form.resetFields();
      this.$emit('change', false)
    },
    // 提交修改数据 给父级组件
    dialogSubmit() {
      console.log('编辑以后的数据', this.detalData);
    },
  }
}
</script>
<style scoped lang="scss">
.config-floor {
  height: 100vh;


}
</style>