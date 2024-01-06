"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const _sfc_main = {
  __name: "commodity",
  setup(__props) {
    common_vendor.onShow(() => {
      gooDs();
    });
    const data = common_vendor.reactive({
      sort: [],
      //分类数据
      goods: []
      //商品数据
    });
    const { sort, goods } = common_vendor.toRefs(data);
    async function gooDs() {
      let DB = await AccConfig_init.inIt();
      const _ = DB.database().command;
      const res_sort = await DB.database().collection("goods_sort").where({ quantity: _.gt(0) }).field({ sort_name: true }).get();
      const field_obj = { goods_title: true, goods_cover: true, goods_price: true, stock: true, shelves: true };
      const res_goods = await DB.database().collection("goods").where({ category: res_sort.data[0].sort_name }).limit(10).field(field_obj).get();
      data.sort = res_sort.data;
      data.goods = res_goods.data;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(sort), (item, index, i0) => {
          return {
            a: common_vendor.t(item.sort_name),
            b: index
          };
        }),
        b: common_vendor.f(common_vendor.unref(goods), (item, index, i0) => {
          return common_vendor.e({
            a: item.goods_cover,
            b: common_vendor.t(item.goods_title),
            c: common_vendor.t(item.stock),
            d: common_vendor.t(item.goods_price),
            e: item.shelves
          }, item.shelves ? {} : {}, {
            f: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f133ce92"], ["__file", "E:/Dessert/Dessert-admin/pages/commodity/commodity.vue"]]);
wx.createPage(MiniProgramPage);
