"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const search_data = common_vendor.reactive({
      S_height: 0,
      //胶囊按钮高度
      S_top: 0,
      //胶囊按钮距离顶部高度
      Custom_height: 0,
      //上两个的和
      Pro_height: 0
      //订单收益板块距离手机顶部的高度
    });
    const { S_height, S_top, Custom_height, Pro_height } = common_vendor.toRefs(search_data);
    common_vendor.onMounted(() => {
      capSule();
    });
    function capSule() {
      const but_data = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      search_data.S_top = but_data.top;
      search_data.S_height = but_data.height;
      search_data.Custom_height = but_data.height + but_data.top;
      search_data.Pro_height = but_data.height + but_data.top + 20;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s("height:" + common_vendor.unref(S_top) + "px;"),
        b: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        c: common_vendor.s("line-height:" + common_vendor.unref(S_height) + "px;"),
        d: common_vendor.s("padding-left:16px;"),
        e: common_vendor.s("height:" + common_vendor.unref(Custom_height) + "px;"),
        f: common_vendor.s("top:" + common_vendor.unref(Pro_height) + "px;")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
