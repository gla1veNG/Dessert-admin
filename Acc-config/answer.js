/* 一些公用的响应式传值*/
import {ref} from 'vue'
//创建规格后携带值返回上一页面
let sku_val = ref([]);
//选中关联的商品之后，携带值返回上一页面
let select_goods = ref({});

export {sku_val,select_goods}