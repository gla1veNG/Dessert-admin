"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/goods-list/list.js";
  "./pages/banner-admin/banner.js";
  "./pages/commodity/commodity.js";
  "./pages/goods-admin/goods.js";
  "./pages/specs/specs.js";
  "./pages/sort-admin/sort.js";
  "./pages/index/index.js";
  "./pages/order/order.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
