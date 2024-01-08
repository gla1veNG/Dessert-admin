"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "seckill",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => _ctx.addTo && _ctx.addTo(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3d30ce32"], ["__file", "E:/Dessert/Dessert-admin/pages/seckill-admin/seckill.vue"]]);
wx.createPage(MiniProgramPage);
