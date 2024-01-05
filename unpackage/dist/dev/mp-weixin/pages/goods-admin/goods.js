"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
const _sfc_main = {
  __name: "goods",
  setup(__props) {
    const priceinv = common_vendor.reactive({ price: "", stock: "" });
    const { price, stock } = common_vendor.toRefs(priceinv);
    function juMp() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/specs/specs"
      });
    }
    const specs = common_vendor.reactive({ specs_data: [] });
    common_vendor.watch(AccConfig_answer.sku_val, (newVal, oldVal) => {
      specs.specs_data = newVal;
      let SORT = newVal;
      let min_price = SORT.sort((A, B) => {
        return A.price - B.price;
      });
      priceinv.price = min_price[0].price;
      let STOCK = 0;
      newVal.forEach((item) => STOCK += item.stock);
      priceinv.stock = STOCK;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: specs.specs_data.length > 0 ? true : false,
        b: common_vendor.unref(price),
        c: common_vendor.o(($event) => common_vendor.isRef(price) ? price.value = $event.detail.value : null),
        d: specs.specs_data.length > 0 ? true : false,
        e: common_vendor.unref(stock),
        f: common_vendor.o(($event) => common_vendor.isRef(stock) ? stock.value = $event.detail.value : null),
        g: specs.specs_data.length === 0
      }, specs.specs_data.length === 0 ? {} : {}, {
        h: specs.specs_data.length > 0
      }, specs.specs_data.length > 0 ? {
        i: common_vendor.f(specs.specs_data, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.f(item.att_data, (item_S, index_S, i1) => {
              return {
                a: common_vendor.t(item_S.att_val),
                b: index_S
              };
            }),
            c: common_vendor.t(item.stock),
            d: common_vendor.t(item.price),
            e: index
          };
        })
      } : {}, {
        j: common_vendor.o(juMp)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/pages/goods-admin/goods.vue"]]);
wx.createPage(MiniProgramPage);
