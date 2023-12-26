"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "sort",
  setup(__props) {
    const show = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => show.value = false),
        b: show.value,
        c: common_vendor.o(($event) => show.value = true)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8b65ec7"], ["__file", "E:/Dessert/Dessert-admin/pages/sort-admin/sort.vue"]]);
wx.createPage(MiniProgramPage);
