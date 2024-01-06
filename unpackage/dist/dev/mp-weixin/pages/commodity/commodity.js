"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const _sfc_main = {
  __name: "commodity",
  setup(__props) {
    common_vendor.onShow(() => {
      gooDs();
    });
    async function gooDs() {
      let DB = await AccConfig_init.inIt();
      const _ = DB.database().command;
      const res_sort = await DB.database().collection("goods_sort").where({ quantity: _.gt(0) }).field({ sort_name: true }).get();
      const field_obj = { goods_title: true, goods_cover: true, goods_price: true, stock: true, shelves: true };
      const res_goods = await DB.database().collection("goods").where({ category: res_sort.data[0].sort_name }).limit(10).field(field_obj).get();
      console.log(res_goods);
    }
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f133ce92"], ["__file", "E:/Dessert/Dessert-admin/pages/commodity/commodity.vue"]]);
wx.createPage(MiniProgramPage);
