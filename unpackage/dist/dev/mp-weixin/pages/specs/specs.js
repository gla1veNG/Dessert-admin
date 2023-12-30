"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "specs",
  setup(__props) {
    const show = common_vendor.ref(false);
    const sku_data = common_vendor.reactive({
      sku: [{ title: 1, att_data: [], price: "", stock: "", image: "" }]
    });
    const Sto_att = common_vendor.reactive({
      attobj: [{ att: "", title: 1 }, { att: "", title: 2 }, { att: "", title: 3 }]
    });
    const attribute = common_vendor.reactive({ selected: [] });
    function subMit() {
      const filter = Sto_att.attobj.filter((item) => item.att != "");
      const new_arr = [];
      filter.forEach((item) => {
        new_arr.push({ att: item.att, name: item.att, checked: true });
      });
      attribute.selected = new_arr;
      show.value = false;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => show.value = true),
        b: common_vendor.f(attribute.selected, (item, index, i0) => {
          return {
            a: item.att,
            b: item.checked,
            c: common_vendor.t(item.name),
            d: index
          };
        }),
        c: common_vendor.f(sku_data.sku, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title)
          }, sku_data.sku.length > 1 ? {} : {}, {
            b: item.att_data.length > 0
          }, item.att_data.length > 0 ? {
            c: common_vendor.f(item.att_data, (item_add, index_add, i1) => {
              return {
                a: common_vendor.t(item_add.att_name),
                b: item_add.add_val,
                c: common_vendor.o(($event) => item_add.add_val = $event.detail.value, index_add),
                d: index_add
              };
            }),
            d: "请输入" + item.item_add.att_name
          } : {}, {
            e: item.price,
            f: common_vendor.o(($event) => item.price = $event.detail.value, index),
            g: item.stock,
            h: common_vendor.o(($event) => item.stock = $event.detail.value, index),
            i: item.image === ""
          }, item.image === "" ? {} : {
            j: item.image
          }, {
            k: item.image != ""
          }, item.image != "" ? {} : {}, {
            l: index
          });
        }),
        d: sku_data.sku.length > 1,
        e: common_vendor.o(($event) => show.value = false),
        f: common_vendor.o(subMit),
        g: common_vendor.f(Sto_att.attobj, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.att,
            c: common_vendor.o(($event) => item.att = $event.detail.value, index),
            d: index
          };
        }),
        h: show.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/pages/specs/specs.vue"]]);
wx.createPage(MiniProgramPage);
