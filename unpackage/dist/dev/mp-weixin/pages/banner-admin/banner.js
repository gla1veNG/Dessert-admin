"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "banner",
  setup(__props) {
    const show = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => show.value = true),
        b: common_vendor.o(($event) => show.value = false),
        c: show.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-beaa2a87"], ["__file", "E:/Dessert/Dessert-admin/pages/banner-admin/banner.vue"]]);
wx.createPage(MiniProgramPage);
