"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
const _sfc_main = {
  __name: "goods",
  setup(__props) {
    function juMp() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/specs/specs"
      });
    }
    common_vendor.watch(AccConfig_answer.sku_val, (newVal, oldVal) => {
      console.log(newVal);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(juMp)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/pages/goods-admin/goods.vue"]]);
wx.createPage(MiniProgramPage);
